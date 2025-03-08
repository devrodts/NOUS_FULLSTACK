import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDTO {
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
