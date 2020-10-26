import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from "yup";

import GaleriaDateView from "../views/galeria_date_views";
import GaleriaDate from "../models/GaleriaDate";

export default {
  async create(request: Request, response: Response) {
    const { date } = request.body;

    const { action } = request.params;

    const galeriaDateRepository = getRepository(GaleriaDate);

    if (action === "create") {
      // Create a new date entry in the database

      const data = { date: date, selected: false };

      const schema = Yup.object().shape({
        date: Yup.string().required(),
        selected: Yup.boolean().required(),
      });

      await schema.validate(data, { abortEarly: false });

      const galeriaDate = galeriaDateRepository.create(data);

      await galeriaDateRepository.save(galeriaDate);

      return response.status(201).json(GaleriaDateView.render(galeriaDate));
    } else if (action === "set") {
      // Set a new data as the selected date in the database

      const existingGaleriaDates = await galeriaDateRepository.find();

      const availableDates = existingGaleriaDates.map((date) => {
        return { id: date.id, date: date.date, selected: false };
      });

      await galeriaDateRepository.save(availableDates);

      let setGaleriaDate = await galeriaDateRepository.findOneOrFail({
        where: [{ date: date }],
      });

      setGaleriaDate.selected = true;

      await galeriaDateRepository.save(setGaleriaDate);

      return response.status(200).json(GaleriaDateView.render(setGaleriaDate));
    }
  },
};
