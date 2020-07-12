import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCourierService from '@modules/couriers/services/CreateCourierService';
import UpdateCourierService from '@modules/couriers/services/UpdateCourierService';
import ListCouriersService from '@modules/couriers/services/ListCouriersService';

export default class CouriersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createCourier = container.resolve(CreateCourierService);

    const courier = await createCourier.execute({
      email,
      name,
    });

    return response.json(courier);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const { id } = request.params;

    const updateCourier = container.resolve(UpdateCourierService);

    const courier = await updateCourier.execute({
      id,
      email,
      name,
    });

    return response.json(courier);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listCouriersService = container.resolve(ListCouriersService);

    const listCouriers = await listCouriersService.execute();

    return response.json(listCouriers);
  }
}
