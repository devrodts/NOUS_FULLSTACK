import {
  IsArray,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @IsNotEmpty()
  productsIds?: string[];

  @IsNumber()
  @IsNotEmpty()
  total: number;
}
