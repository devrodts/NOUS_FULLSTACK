import { Controller, Get, Query } from '@nestjs/common';
import { GetMetricsUseCase } from '../../../application/usecases/get-metrics.usecase';
import { GetSalesByPeriodUseCase } from '../../../application/usecases/get-sales-by-period.usecase';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly getMetricsUseCase: GetMetricsUseCase,
    private readonly getSalesByPeriodUseCase: GetSalesByPeriodUseCase,
  ) {}

  @Get('metrics')
  async getMetrics(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('categoryId') categoryId?: string,
    @Query('productId') productId?: string,
  ) {
    return this.getMetricsUseCase.execute(
      startDate,
      endDate,
      categoryId,
      productId,
    );
  }

  @Get('sales-by-period')
  async getSalesByPeriod(
    @Query('period') period: 'daily' | 'weekly' | 'monthly' | 'yearly',
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.getSalesByPeriodUseCase.execute(period, startDate, endDate);
  }
}
