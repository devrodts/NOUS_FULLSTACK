import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/products/products.module';
import { DatabaseModule } from './shared/database/mongo.module';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './modules/categories/categories.module';
import { OrdersModule } from './modules/orders/orders.module';
import { DashboardModule } from './modules/dashboard/domain/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Carrega variáveis de ambiente
    ProductModule,
    CategoriesModule,
    OrdersModule,
    DashboardModule,
    DatabaseModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
