// import { Action } from "@/interfaces";
// import { OrdersAction } from "./orderReducer";

// const deleteOrderById = async (id: string, dispatch: React.Dispatch<OrdersAction>) => {
//   if(!id) return;
//   try {
//     dispatch({
//       type: 'SET_LOADING',
//       payload: true,
//     });
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
//       method: 'DELETE', 
//     });

//     console.log("deleteProductById CONTEXT :::::", response)

//     if (!response.ok) {
//       throw new Error("Erro ao excluir o produto");
//     }
//     dispatch({
//       type: 'DELETE_ORDER',
//       payload: id,
//     });

//     dispatch({type: 'SET_LOADING', payload: false})
    
//   } catch (error) {
//     console.error("Erro ao excluir o produto:", error);
//     dispatch({
//       type: 'SET_ERROR',
//       payload: "Erro ao excluir o produto",
//     });
//   }
// };

// export default deleteProductById;
