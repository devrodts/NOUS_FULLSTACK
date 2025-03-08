import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersController } from './domain/interface/controllers/orders.controller';
import { OrdersService } from './application/services/orders.service';
import { OrdersRepository } from './domain/infra/repositories/orders.repository';
import {
  CreateOrderUsecase,
  GetAllOrdersUsecase,
  FindOrderByIdUseCase,
  UpdateOrderByIdUseCase,
  DeleteOrderByIdUseCase,
} from './application/usecases';
import { OrdersSchema } from './domain/entities/orders.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrdersSchema }]),
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrdersRepository,
    CreateOrderUsecase,
    GetAllOrdersUsecase,
    FindOrderByIdUseCase,
    UpdateOrderByIdUseCase,
    DeleteOrderByIdUseCase,
  ],
  exports: [OrdersRepository],
})
export class OrdersModule {}
