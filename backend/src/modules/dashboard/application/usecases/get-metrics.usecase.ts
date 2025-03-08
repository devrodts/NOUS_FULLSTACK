import { Injectable } from '@nestjs/common';
import { DashboardService } from '../services/dashboard.service';

@Injectable()
export class GetMetricsUseCase {
  constructor(private readonly dashboardService: DashboardService) {}

  async execute(
    startDate: string,
    endDate: string,
    categoryId?: string,
    productId?: string
  ) {
    return this.dashboardService.getMetrics(startDate, endDate, categoryId, productId);
  }
}