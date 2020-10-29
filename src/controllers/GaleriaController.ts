import { Request, Response } from "express";
import { getRepository } from "typeorm";

import * as Yup from "yup";

import GaleriaView from "../views/galeria_views";
import Galeria from "../models/Galeria";
import MaxCapacity from "../models/MaxCapacity";

export default {
  async show(request: Request, response: Response) {
    const galeriaRepository = getRepository(Galeria);

    const { date } = request.params;

    const re = /\-/gi;

    const galeria = await galeriaRepository.find({
      where: [{ scheduled_to: date.replace(re, "/") }],
    });

    return response.status(200).json(GaleriaView.renderMany(galeria));
  },
  async create(request: Request, response: Response) {
    const { name, date } = request.body;

    const galeriaRepository = getRepository(Galeria);

    const availability = await galeriaRepository.find({
      where: [{ scheduled_to: date }],
    });

    const maxCapacityRepository = getRepository(MaxCapacity);

    const { max_capacity } = await maxCapacityRepository.findOneOrFail({
      where: [{ event: "galeria" }],
    });

    if (availability.length >= max_capacity) {
      return response.status(406).json({ message: "Maximum capacity reached" });
    }

    const data = { name, scheduled_to: date };

    const schema = Yup.object().shape({
      name: Yup.string().required("Name is a mandatory field").max(60),
      scheduled_to: Yup.string().required(),
    });

    await schema.validate(data, { abortEarly: false });

    const galeria = galeriaRepository.create(data);

    await galeriaRepository.save(galeria);

    return response.status(201).json(GaleriaView.render(galeria));
  },
  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const galeriaRepository = getRepository(Galeria);

    await galeriaRepository.delete(id);

    return response.status(202).json({ message: "User deleted" });
  },
};
