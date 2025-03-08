import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Orders } from '../../entities/orders.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectModel('Order') private readonly ordersModel: Model<Orders>,
  ) {}

  async createOrder(order: Orders): Promise<Orders> {
    return this.ordersModel.create(order);
  }

  async findAllOrders(): Promise<Orders[]> {
    return this.ordersModel.find();
  }

  async findOrderById(id: string): Promise<Orders | null> {
    return this.ordersModel.findOne({ id: id });
  }

  async updateOrderById(id: string, order: Orders): Promise<Orders | null> {
    return this.ordersModel.findOneAndUpdate({ id: id }, order, { new: true });
  }

  async deleteOrderById(id: string): Promise<Orders | null> {
    return this.ordersModel.findOneAndDelete({ id: id });
  }

  async aggregateOrders(pipeline: any[]): Promise<any[]> {
    return this.ordersModel.aggregate(pipeline).exec();
  }
}
