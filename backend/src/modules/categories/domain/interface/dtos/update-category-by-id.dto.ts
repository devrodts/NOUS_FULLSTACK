import { CreateCategoryDTO } from "./create-category.dto";

export class UpdateCategoryByIdDTO{
    id: string;
    dto: Partial<CreateCategoryDTO>;
}
