import { Injectable } from '@nestjs/common';
import { OrdersRepository } from 'src/modules/orders/domain/infra/repositories/orders.repository';
import { ProductsRepository } from 'src/modules/products/domain/infra/repositories/products/products.repository';

@Injectable()
export class DashboardService {
  constructor(
    private readonly orderRepository: OrdersRepository,
    private readonly productRepository: ProductsRepository,
  ) {}

  async getMetrics(
    startDate: string,
    endDate: string,
    categoryId?: string,
    productId?: string,
  ) {
    const matchStage: any = {
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    };

    if (productId) {
      matchStage.productIds = { $in: [productId] };
    }

    // Pipeline para métricas gerais
    const pipeline = [
      { $match: matchStage },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$total' },
          averageOrderValue: { $avg: '$total' },
          minOrderValue: { $min: '$total' },
          maxOrderValue: { $max: '$total' },
        },
      },
    ];

    if (categoryId) {
      // Buscar produtos da categoria usando o repository
      const productsInCategory =
        await this.productRepository.findProductsByCategoryId(categoryId);

      const productIds = productsInCategory.map((p) => p.id.toString());

      matchStage.productIds = {
        $elemMatch: { $in: productIds },
      };
    }

    const metrics = await this.orderRepository.aggregateOrders(pipeline);
    return (
      metrics[0] || {
        totalOrders: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
        minOrderValue: 0,
        maxOrderValue: 0,
      }
    );
  }

  async getSalesByPeriod(
    period: 'daily' | 'weekly' | 'monthly' | 'yearly',
    startDate: string,
    endDate: string,
  ) {
    const dateFormat = {
      daily: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
      weekly: {
        $concat: [
          { $toString: { $isoWeekYear: '$date' } },
          '-W',
          { $toString: { $isoWeek: '$date' } },
        ],
      },
      monthly: { $dateToString: { format: '%Y-%m', date: '$date' } },
      yearly: { $dateToString: { format: '%Y', date: '$date' } },
    };

    const pipeline = [
      {
        $match: {
          date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: dateFormat[period],
          orderCount: { $sum: 1 },
          revenue: { $sum: '$total' },
        },
      },
      { $sort: { _id: 1 } },
    ];

    return this.orderRepository.aggregateOrders(pipeline);
  }
}
