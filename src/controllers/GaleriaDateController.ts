import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from "yup";

import GaleriaDateView from "../views/galeria_date_views";
import GaleriaDate from "../models/GaleriaDate";

export default {
  async create(request: Request, response: Response) {
    const { date } = request.body;

    const galeriaDateRepository = getRepository(GaleriaDate);

    const existingGaleriaDates = await galeriaDateRepository.find();

    const availableDates = existingGaleriaDates.map((date) => {
      return { id: date.id, date: date.date, selected: false };
    });

    await galeriaDateRepository.save(availableDates);

    let setGaleriaDate: GaleriaDate = await galeriaDateRepository
      .findOneOrFail({
        where: [{ date: date }],
      })
      .catch(async () => {
        const data = { date: date, selected: true };
        const dateInput = galeriaDateRepository.create(data);

        await galeriaDateRepository.save(dateInput);
        return dateInput;
      });

    setGaleriaDate.selected = true;

    await galeriaDateRepository.save(setGaleriaDate);

    return response.status(200).json(GaleriaDateView.render(setGaleriaDate));
  },
};
