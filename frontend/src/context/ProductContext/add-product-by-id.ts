import { ProductInterface } from "@/interfaces/product";
import { useProductContext } from "./ProductContext";

const { state, dispatch } = useProductContext();
const { products, loading, error } = state;

const addProduct = async (newProduct: ProductInterface) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: { "Content-Type": "application/json" },
      });
      const addedProduct: ProductInterface = await response.json();
      dispatch({ type: "ADD_PRODUCT", payload: addedProduct });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: "Erro ao adicionar o produto" });
    }
  };

export default addProduct;
