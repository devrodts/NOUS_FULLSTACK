import { useState, useEffect } from 'react';
import { OrderInterface } from '@/interfaces/order.interface';

const useGetOrders = () => {
    
  const [orders, setOrders] = useState<OrderInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
      
      if (!response.ok) {
        throw new Error(`Error fetching orders: ${response.statusText}`);
      }
      
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError(error instanceof Error ? error.message : 'Error fetching orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const refreshOrders = () => {
    fetchOrders();
  };
  
  return { orders, loading, error, refreshOrders };
};

export default useGetOrders;