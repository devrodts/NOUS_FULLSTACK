import { ProductInterface } from "@/interfaces/product";
import { useProductContext } from "./ProductContext";

export const useAddProduct = () => {
  const { dispatch } = useProductContext();
  
  return async (newProduct: ProductInterface) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        console.log("Erro ao adicionar o produto.", response);
        throw new Error("Erro ao adicionar o produto");
      }

      const product = await response.json();
      dispatch({ type: "ADD_PRODUCT", payload: product });
      return product;
    } catch (error) { // Changed from 'err' to 'error'
      dispatch({ type: "SET_ERROR", payload: error instanceof Error ? error.message : "Erro desconhecido" });
      throw error;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
};