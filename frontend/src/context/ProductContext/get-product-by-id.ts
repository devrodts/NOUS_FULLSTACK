import { useProductContext } from "./ProductContext";

export const useGetProductById = () => {
  const { dispatch } = useProductContext();
  
  return async (id: string) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
      
      if (!response.ok) {
        console.log("Erro ao buscar o produto", response);
        throw new Error("Erro ao buscar o produto");
      }

      const data = await response.json();
      dispatch({ type: 'GET_PRODUCT_BY_ID', payload: data });
      dispatch({ type: "SET_LOADING", payload: false });
      return data;
    } catch (error) {
      console.error("Erro ao buscar o produto:", error);
      dispatch({ type: "SET_ERROR", payload: error instanceof Error ? error.message : "Erro desconhecido" });
      throw error;
    }
  };
};