import { Injectable } from "@nestjs/common";
import { OrdersService } from "../services/orders.service";
import { CreateOrderDto } from "../../domain/interface/dtos";
import { Orders } from "../../domain/entities/orders.entity";
@Injectable()
export class CreateOrderUsecase {   
    constructor(private readonly ordersService: OrdersService) {}

    async execute(dto: CreateOrderDto): Promise<Orders> {
        return this.ordersService.createOrder(dto);
    }
}

