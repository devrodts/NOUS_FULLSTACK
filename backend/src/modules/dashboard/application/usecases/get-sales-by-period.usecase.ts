import { Injectable } from '@nestjs/common';
import { DashboardService } from '../services/dashboard.service';

@Injectable()
export class GetSalesByPeriodUseCase {
  constructor(private readonly dashboardService: DashboardService) {}

  async execute(
    period: 'daily' | 'weekly' | 'monthly' | 'yearly',
    startDate: string,
    endDate: string
  ) {
    return this.dashboardService.getSalesByPeriod(period, startDate, endDate);
  }
}