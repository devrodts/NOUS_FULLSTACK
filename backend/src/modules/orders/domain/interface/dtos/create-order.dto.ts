import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsMongoId,
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
