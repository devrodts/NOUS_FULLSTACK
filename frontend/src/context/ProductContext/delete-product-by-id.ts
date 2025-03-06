const deleteProductById = async (id: string, dispatch: React.Dispatch<any>) => {
  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
      method: 'DELETE', 
    });

    if (!response.ok) {
      throw new Error("Erro ao excluir o produto");
    }
    dispatch({
      type: 'DELETE_PRODUCT',
      payload: { id },
    });

  } catch (error) {
    console.error("Erro ao excluir o produto:", error);
    dispatch({
      type: 'SET_ERROR',
      payload: "Erro ao excluir o produto",
    });
  }
};

export default deleteProductById;
