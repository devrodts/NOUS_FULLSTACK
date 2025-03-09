import { Injectable } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';

@Injectable()
export class FindOrderByIdUseCase {
  constructor(private readonly ordersService: OrdersService) {}

  async execute(id: string) {
    return this.ordersService.findOrderById(id);
  }
}
