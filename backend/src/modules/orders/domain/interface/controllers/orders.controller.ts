import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import {
  CreateOrderUsecase,
  GetAllOrdersUsecase,
  FindOrderByIdUseCase,
  UpdateOrderByIdUseCase,
  DeleteOrderByIdUseCase,
} from 'src/modules/orders/application/usecases';
import { CreateOrderDto } from 'src/modules/orders/domain/interface/dtos/create-order.dto';
import { UpdateOrderByIdDto } from 'src/modules/orders/domain/interface/dtos/update-order-by-id';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly createOrderUsecase: CreateOrderUsecase,
    private readonly getAllOrdersUsecase: GetAllOrdersUsecase,
    private readonly findOrderByIdUseCase: FindOrderByIdUseCase,
    private readonly updateOrderByIdUseCase: UpdateOrderByIdUseCase,
    private readonly deleteOrderByIdUseCase: DeleteOrderByIdUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateOrderDto) {
    return this.createOrderUsecase.execute(dto);
  }

  @Get()
  async findAll() {
    try {
      return this.getAllOrdersUsecase.execute();
    } catch (error) {
      Logger.error('Error on FindAllOrders: Controller ', error);
      throw new Error(error);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.findOrderByIdUseCase.execute(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateOrderByIdDto) {
    return this.updateOrderByIdUseCase.execute(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deleteOrderByIdUseCase.execute(id);
  }
}
