import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from "yup";

import CelulaView from "../views/celula_views";
import Celula from "../models/Celula";
import { equal } from "assert";

export default {
  async index(request: Request, response: Response) {
    const celulaRepository = getRepository(Celula);

    const celula = await celulaRepository.find();

    return response.json(CelulaView.renderMany(celula));
  },
  async show(request: Request, response: Response) {
    const celulaRepository = getRepository(Celula);

    const { date } = request.params;

    const re = /\-/gi;

    const celula = await celulaRepository.find({
      where: [{ scheduled_to: date.replace(re, "/") }],
    });

    console.log(celula);

    return response.json(CelulaView.renderMany(celula));
  },

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const celulaRepository = getRepository(Celula);

    await celulaRepository.delete(id);

    return response.status(202).json({ message: "User deleted" });
  },

  async create(request: Request, response: Response) {
    const { name } = request.body;

    const timestamp = Date.now();
    const selectedDate = new Date(timestamp);

    if (selectedDate.getDay() > 4) {
      selectedDate.setDate(
        selectedDate.getDate() + (7 - selectedDate.getDay())
      );
    } else if (selectedDate.getDay() < 4) {
      selectedDate.setDate(
        selectedDate.getDate() + (4 - selectedDate.getDay())
      );
    }
    const scheduled_to = `${selectedDate.getDate()}/${
      selectedDate.getMonth() + 1
    }/${selectedDate.getFullYear()}`;

    const celulaRepository = getRepository(Celula);

    const data = { name, scheduled_to };

    const schema = Yup.object().shape({
      name: Yup.string().required("Nome é um campo obrigatório").max(60),
      scheduled_to: Yup.string().required(),
    });

    await schema.validate(data, { abortEarly: false });

    const celula = celulaRepository.create(data);

    await celulaRepository.save(celula);

    return response.status(201).json(celula);
  },
};
