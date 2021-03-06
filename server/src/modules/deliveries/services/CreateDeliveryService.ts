import { injectable, inject } from 'tsyringe';
import IDeliveriesRepository from '../repositories/IDeliveriesRepository';
import Delivery from '../infra/typeorm/entities/Delivery';
import ICreateDeliveryDTO from '../dtos/ICreateDeliveryDTO';

@injectable()
class CreateDeliveryService {
  constructor(
    @inject('DeliveriesRepository')
    private deliveriesRepository: IDeliveriesRepository,
  ) {}

  public async execute(data: ICreateDeliveryDTO): Promise<Delivery> {
    const newDelivery = await this.deliveriesRepository.create(data);

    return newDelivery;
  }
}

export default CreateDeliveryService;
