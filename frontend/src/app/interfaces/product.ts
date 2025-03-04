export interface ProductInterface{
    _id: string
    name: string
    description: string
    categoryIDs: string[]
    price: number;
    colors: string[];
    imageUrl: string;
    quantity: number;
    createdAt: string;
    updatedAt: string;
}