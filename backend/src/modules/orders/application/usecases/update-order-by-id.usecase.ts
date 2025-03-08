import { Injectable } from "@nestjs/common";
import { OrdersService } from "../services/orders.service";
import { UpdateOrderByIdDto } from "../../domain/interface/dtos/update-order-by-id";

@Injectable()
export class UpdateOrderByIdUseCase {
    constructor(private readonly ordersService: OrdersService) {}

    async execute(id: string, dto: UpdateOrderByIdDto) {
        return this.ordersService.updateOrderById(id, dto);
    }
}