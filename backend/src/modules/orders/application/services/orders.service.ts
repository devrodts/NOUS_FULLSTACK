import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { OrdersRepository } from '../../domain/infra/repositories/orders.repository';
import { Orders } from '../../domain/entities/orders.entity';
import { CreateOrderDto } from '../../domain/interface/dtos';
import { UpdateOrderByIdDto } from '../../domain/interface/dtos/update-order-by-id';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async createOrder(dto: CreateOrderDto): Promise<Orders> {
    try {
      const orderData = {
        ...dto,
        id: uuidv4(),
        date: new Date(),
        created_at: new Date(),
        productsIds: dto.productsIds || [],
        updated_at: new Date(),
      };
      const newOrder = await this.ordersRepository.createOrder(orderData);
      return newOrder;
    } catch (e) {
      throw new Error(e);
    }
  }

  async findAllOrders(): Promise<Orders[]> {
    try {
      return this.ordersRepository.findAllOrders();
    } catch (e) {
      Logger.error('Error on FindAllOrders: ', e);
      throw new Error(e);
    }
  }

  async findOrderById(id: string): Promise<Orders> {
    try {
      const order = await this.ordersRepository.findOrderById(id);
      if (!order) {
        throw new Error('Order not found');
      }
      return order;
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateOrderById(id: string, dto: UpdateOrderByIdDto): Promise<Orders> {
    try {
      const order = await this.ordersRepository.updateOrderById(id, {
        id: id,
        date: dto.date,
        productsIds: dto.productsIds || [],
        total: dto.total,
        created_at: dto.created_at,
        updated_at: dto.updated_at,
      });
      if (!order) {
        throw new Error('Order not found');
      }
      return order;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteOrderById(id: string): Promise<Orders | null> {
    try {
      return await this.ordersRepository.deleteOrderById(id);
    } catch (e) {
      throw new Error(e);
    }
  }
}
