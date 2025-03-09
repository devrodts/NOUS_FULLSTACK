"use client"

import React, { createContext, useReducer, useContext, Dispatch } from "react";
import { ProductStateInterface } from "@/interfaces/product-state.interface";
import { productReducer, INITIAL_STATE, } from "./productReducer";
import { Action } from "@/interfaces/action.interface";
interface ProductContextProps {
  state: ProductStateInterface;
  dispatch: React.Dispatch<Action>;
}


const ProductContext = createContext<ProductContextProps | undefined>(undefined);


export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, INITIAL_STATE);

  return (
    <ProductContext.Provider value={{ state, dispatch: dispatch as Dispatch<Action> }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = (): ProductContextProps => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
