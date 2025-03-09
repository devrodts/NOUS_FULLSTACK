
import { OrderInterface } from "@/interfaces/order.interface";

export type OrdersAction =
  | { type: 'SET_ORDERS'; payload: OrderInterface[] }
  | { type: 'ADD_ORDER'; payload: OrderInterface }
  | { type: 'UPDATE_ORDER'; payload: OrderInterface }
  | { type: 'DELETE_ORDER'; payload: OrderInterface }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'GET_ORDER_BY_ID'; payload: OrderInterface }

export type OrderStateInterface = {
    orders: OrderInterface[];
    order: OrderInterface | null;
    loading: boolean;
    error: string | null;
}

export const INITIAL_STATE: OrderStateInterface =  {
    orders: [],
    order: null,
    loading: false,
    error: null
}


export const orderReducer = (state: OrderStateInterface, action: OrdersAction) => {
    switch (action.type) {
        case 'SET_ORDERS':
          return {
            ...state,
            orders: action.payload,
          };

        case 'GET_ORDER_BY_ID':
          return {
            ...state,
            order: action.payload,
          };
    
        case 'ADD_ORDER':
          return {
            ...state,
            orders: [...state.orders, action.payload],
          };
    
        case 'UPDATE_ORDER':
          if (!action.payload || !action.payload.id) {
            return state;    
          }
          return {
            ...state,
            orders: state.orders.map((order: OrderInterface) =>
              order.id === action.payload.id ? action.payload : order
            ),
          };
    
        case 'DELETE_ORDER':
          return {
            ...state,
            orders: state.orders.filter((order: OrderInterface) => order.id !== action.payload.id),
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

