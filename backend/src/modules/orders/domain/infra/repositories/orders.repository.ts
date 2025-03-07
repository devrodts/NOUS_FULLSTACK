import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Orders } from "../../entities/orders.entity";

@Injectable()
export class OrdersRepository {
    constructor(private readonly ordersModel: Model<Orders>) {

    }

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
}
