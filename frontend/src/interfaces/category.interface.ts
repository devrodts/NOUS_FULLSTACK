import { ProductInterface } from "./product"

export interface CategoryInterface {
    _id: string
    name: string
    description: string
    createdAt: string
    updatedAt: string
    products: ProductInterface[]
}
