import { Logger } from '@nestjs/common';
import { Orders } from '../../domain/entities/orders.entity';
import { OrdersService } from '../services/orders.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAllOrdersUsecase {
  constructor(private readonly ordersService: OrdersService) {}

  async execute(): Promise<Orders[]> {
    try {
      return this.ordersService.findAllOrders();
    } catch (error) {
      Logger.error('Error on GetAllOrdersUsecase: ', error);
      throw new Error(error);
    }
  }
}
