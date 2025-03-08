import { Module } from "@nestjs/common";
import { OrdersModule } from "src/modules/orders/orders.module";
import { ProductModule } from "src/modules/products/products.module";
import { GetMetricsUseCase } from "../application/usecases/get-metrics.usecase";
import { GetSalesByPeriodUseCase } from "../application/usecases/get-sales-by-period.usecase";
import { DashboardService } from "../application/services/dashboard.service";
import { DashboardController } from "./interfaces/controllers/dashboard.controller";

@Module({
    imports:[OrdersModule, ProductModule],
    controllers:[DashboardController],
    providers:[DashboardService, GetMetricsUseCase, GetSalesByPeriodUseCase],
    
})
export class DashboardModule {}