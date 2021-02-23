import { Request, Response } from "express";
import Celula from "../models/Celula";
import { getRepository } from "typeorm";
import Galeria from "../models/Galeria";

export default {
  async show(request: Request, response: Response) {
    const timestamp = Date.now();
    const selectedDate = new Date(timestamp);
    const { type } = request.params;
    if (type === "celula") {
      if (selectedDate.getDay() > 4) {
        selectedDate.setDate(
          selectedDate.getDate() + (7 - selectedDate.getDay())
        );
      } else if (selectedDate.getDay() < 4) {
        selectedDate.setDate(
          selectedDate.getDate() + (4 - selectedDate.getDay())
        );
      }
      const nextCelula = `${selectedDate.getDate()}/${
        selectedDate.getMonth() + 1
      }/${selectedDate.getFullYear()}`;

      return response.status(200).json({ date: nextCelula });
    } else if (type === "galeria") {
      const galeriaRepository = getRepository(Galeria);
      const galeria = await galeriaRepository.findOneOrFail({
        where: [{ selected: true }],
      });

      const { scheduled_to } = galeria;

      return response.status(200).json(scheduled_to);
    }
  },
};
