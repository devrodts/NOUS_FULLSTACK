const getProducts = async (dispatch: React.Dispatch<any>) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    if (!response.ok) {
      throw new Error("Erro ao buscar os produtos");
    }
    const data = await response.json();
    dispatch({ type: 'SET_PRODUCTS', payload: data }); 
  } catch (error) {
    console.error("Erro ao buscar os produtos:", error);
    dispatch({ type: 'SET_ERROR', payload: "Erro ao buscar os produtos" });
  }
};

export default getProducts;
