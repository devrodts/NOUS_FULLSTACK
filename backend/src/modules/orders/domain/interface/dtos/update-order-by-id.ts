import { IsArray, IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateOrderByIdDto {
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsArray()
  @IsNotEmpty()
  productsIds?: string[];

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsDate()
  @IsNotEmpty()
  created_at: Date;

  @IsDate()
  @IsNotEmpty()
  updated_at: Date;
}
