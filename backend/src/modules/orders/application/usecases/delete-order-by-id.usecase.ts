import { Injectable } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';

@Injectable()
export class DeleteOrderByIdUseCase {
  constructor(private readonly ordersService: OrdersService) {}

  async execute(id: string) {
    return this.ordersService.deleteOrderById(id);
  }
}
