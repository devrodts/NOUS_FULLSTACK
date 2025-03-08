import { OrdersService } from "src/modules/orders/application/services/orders.service";

import { Orders } from "../../entities/orders.entity";

import { CreateOrderUsecase } from "src/modules/orders/application/usecases/create-order.usecase";
import { MongooseModule } from "@nestjs/mongoose";
import { OrdersController } from "../../interface/controllers/orders.controller";
import { OrdersRepository } from "./orders.repository";
import { GetAllOrdersUsecase } from "src/modules/orders/application/usecases/get-all-orders.usecase";
import { FindOrderByIdUseCase } from "src/modules/orders/application/usecases/find-order-by-id.usecase";
import { UpdateOrderByIdUseCase } from "src/modules/orders/application/usecases/update-order-by-id.usecase";
import { DeleteOrderByIdUseCase } from "src/modules/orders/application/usecases/delete-order-by-id.usecase";
import { Module } from "@nestjs/common";


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Order', schema: Orders }
        ])
    ],
    controllers: [OrdersController],
    providers: [
        OrdersService,
        OrdersRepository,
        CreateOrderUsecase,
        GetAllOrdersUsecase,
        FindOrderByIdUseCase,
        UpdateOrderByIdUseCase,
        DeleteOrderByIdUseCase
    ]   
})
export class OrdersModuleSchema {}