import { Orders } from "../../domain/entities/orders.entity";
import { OrdersService } from "../services/orders.service";

export class GetAllOrdersUsecase {
    constructor(private readonly ordersService: OrdersService) {}

    async execute(): Promise<Orders[]> {
        return this.ordersService.findAllOrders();
    }
}   
