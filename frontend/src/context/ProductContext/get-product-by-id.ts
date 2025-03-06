import { useProductContext } from "./ProductContext";

const { state, dispatch } = useProductContext();
const { products, loading, error } = state;

const getProductById = async (id: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
        if (!response.ok) {
            console.log("Erro ao buscar o produto", response);
            throw new Error("Erro ao buscar o produto");
        }

        const data = await response.json();
        dispatch({ type: 'GET_PRODUCT_BY_ID', payload: data });

    } catch (error) {
        console.error("Erro ao buscar o produto:", error);
        throw error;
    }
}

export default getProductById;
