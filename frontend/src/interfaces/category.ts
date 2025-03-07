import { ProductInterface } from "./product";

export interface Category {
    id: string;
    name: string;
    description?: string;
    products?: ProductInterface[]; // Relacionamento com produtos
    createdAt: Date;
    updatedAt: Date;
  }