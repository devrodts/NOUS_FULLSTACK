export interface ProductInterface{
    id: string
    name: string
    description: string
    categoryIDs: string[]
    price: number;
    colors?:string[];
    imageUrl: string;
    stock: number;
    createdAt: string;
    updatedAt: string;
}