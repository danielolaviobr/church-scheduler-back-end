import { Request, Response } from "express";
import { getRepository } from "typeorm";

import MaxCapacity from "../models/MaxCapacity";

export default {
  async create(request: Request, response: Response) {
    const { event } = request.params;
    const { capacity } = request.body;

    const maxCapacityRepository = getRepository(MaxCapacity);

    maxCapacityRepository.delete({ event: event });

    const data = {
      event: event,
      max_capacity: capacity,
    };

    const maxCapacity = maxCapacityRepository.create(data);

    maxCapacityRepository.save(maxCapacity);

    return response.status(201).json(data);
  },
  async show(request: Request, response: Response) {
    const { event } = request.params;

    const maxCapacityRepository = getRepository(MaxCapacity);

    const data = await maxCapacityRepository.findOneOrFail({
      where: [{ event: event }],
    });

    return response.status(200).json(data);
  },
};
