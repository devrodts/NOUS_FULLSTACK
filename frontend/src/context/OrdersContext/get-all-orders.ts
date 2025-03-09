import { OrdersAction } from "./orderReducer";

const getAllOrders = async (dispatch: React.Dispatch<OrdersAction>) => {

  try {
    dispatch({ type: 'SET_LOADING', payload: true})
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
    if (!response.ok) {
      throw new Error("Erro ao buscar os pedidos");
    }
    const data = await response.json();
    dispatch({ type: 'SET_ORDERS', payload: data }); 
    dispatch({ type: 'SET_LOADING', payload: false});
  } catch (error) {
    console.error("Erro ao buscar os produtos:", error);
    dispatch({ type: 'SET_ERROR', payload: "Erro ao buscar os produtos" });
    dispatch({ type: 'SET_LOADING', payload: false});
  }
};

export default getAllOrders;
