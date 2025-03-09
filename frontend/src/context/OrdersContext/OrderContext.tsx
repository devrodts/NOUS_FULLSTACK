"use client"

import React, { createContext, useReducer, useContext, Dispatch } from "react";
import { OrderStateInterface } from "./orderReducer";
import { orderReducer, INITIAL_STATE, } from "./orderReducer";
import { Action } from "@/interfaces/action.interface";


interface OrderContextProps {
  state: OrderStateInterface;
  dispatch: React.Dispatch<Action>;
}


const OrderContext = createContext<OrderContextProps | undefined>(undefined);


export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, INITIAL_STATE);

  return (
    <OrderContext.Provider value={{ state, dispatch: dispatch as Dispatch<Action> }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = (): OrderContextProps => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrderContext must be used within a OrderProvider");
  }
  return context;
};
