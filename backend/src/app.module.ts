import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/products/products.module';
import { DatabaseModule } from './shared/database/mongo.module';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './modules/categories/categories.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Carrega variáveis de ambiente
    ProductModule,
    CategoriesModule,
     DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
