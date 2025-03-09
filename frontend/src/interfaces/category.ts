import { ProductInterface } from "./product";

export interface Category {
    id: string;
    name: string;
    description?: string;
    products?: ProductInterface[]; 
    createdAt: Date;
    updatedAt: Date;
  }