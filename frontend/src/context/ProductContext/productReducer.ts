
import { ProductInterface } from "@/interfaces/product";
import { ProductStateInterface } from "@/interfaces/product-state.interface"

type Action =
  | { type: 'SET_PRODUCTS'; payload: ProductInterface[] }
  | { type: 'ADD_PRODUCT'; payload: ProductInterface }
  | { type: 'UPDATE_PRODUCT'; payload: ProductInterface }
  | { type: 'DELETE_PRODUCT'; payload: ProductInterface }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'GET_PRODUCT_BY_ID'; payload: ProductInterface }

  
export const INITIAL_STATE: ProductStateInterface =  {
    products: [],
    product: null,
    loading: false,
    error: null
}


export const productReducer = (state: ProductStateInterface, action: Action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
          return {
            ...state,
            products: action.payload,
          };

        case 'GET_PRODUCT_BY_ID':
          return {
            ...state,
            product: action.payload,
          };
    
        case 'ADD_PRODUCT':
          return {
            ...state,
            products: [...state.products, action.payload],
          };
    
        case 'UPDATE_PRODUCT':
          if (!action.payload || !action.payload.id) {
            return state;    
          }
          return {
            ...state,
            products: state.products.map((product) =>
              product.id === action.payload.id ? action.payload : product
            ),
          };
    
        case 'DELETE_PRODUCT':
          return {
            ...state,
            products: state.products.filter((product) => product.id !== action.payload.id),
          };
    
        case 'SET_LOADING':
          return {
            ...state,
            loading: action.payload,
          };
    
        case 'SET_ERROR':
          return {
            ...state,
            error: action.payload,
          };
    
        default:
          return state; 
      }
}

