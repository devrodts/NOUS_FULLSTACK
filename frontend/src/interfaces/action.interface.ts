
  import { ProductInterface } from '@/interfaces/product';  
  export type Action =
    | { type: 'SET_PRODUCTS'; payload: ProductInterface[] }
    | { type: 'ADD_PRODUCT'; payload: ProductInterface }
    | { type: 'UPDATE_PRODUCT'; payload: ProductInterface }
    | { type: 'DELETE_PRODUCT'; payload: { id: string } }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'GET_PRODUCT_BY_ID'; payload: ProductInterface };