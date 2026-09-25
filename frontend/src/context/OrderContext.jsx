import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const OrderContext = createContext();

const API_URL = `${import.meta.env.VITE_API_URL}/orders`;

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Convert backend order to frontend format
  const normalizeOrder = (order) => {
    return {
      ...order,

      id: order.id,

      date: order.created_at,

      customer: {
        name: order.customer_name,
        phone: order.customer_phone,
        email: order.customer_email || "",
      },

      items: (order.items || []).map((item) => ({
        id: item.id,
        product_id: item.product_id,
        name: item.name || item.product_name,
        image: item.image || "",
        price: Number(item.price),
        quantity: Number(item.quantity),
      })),

      total: Number(order.total),

      status: order.status,
    };
  };

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${API_URL}/`);

      const normalizedOrders = response.data.map(
        normalizeOrder
      );

      setOrders(normalizedOrders);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError("Unable to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Create order
  const createOrder = async (orderData) => {
    try {
      const backendOrder = {
        user_id: orderData.user_id || null,

        customer_name:
          orderData.customer?.name || "",

        customer_phone:
          orderData.customer?.phone || "",

        customer_email:
          orderData.customer?.email || "",

        special_requirements:
          orderData.notes ||
          orderData.special_requirements ||
          "",

        items: (orderData.items || []).map((item) => ({
          product_id: Number(item.id || item.product_id),
          quantity: Number(item.quantity),
        })),
      };

      const response = await axios.post(
        `${API_URL}/`,
        backendOrder
      );

      const newOrder = normalizeOrder(response.data);

      setOrders((currentOrders) => [
        newOrder,
        ...currentOrders,
      ]);

      return newOrder;
    } catch (err) {
      console.error("Failed to create order:", err);

      throw err;
    }
  };

  // Get orders for logged-in customer
  const getOrdersByEmail = (email) => {
    if (!email) {
      return [];
    }

    return orders.filter(
      (order) =>
        order.customer?.email?.toLowerCase() ===
        email.toLowerCase()
    );
  };

  // Update order status
  const updateOrderStatus = async (
    orderId,
    newStatus
  ) => {
    try {
      const response = await axios.put(
        `${API_URL}/${orderId}/status`,
        {
          status: newStatus,
        }
      );

      const updatedOrder = normalizeOrder(
        response.data
      );

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId
            ? updatedOrder
            : order
        )
      );

      return updatedOrder;
    } catch (err) {
      console.error(
        "Failed to update order status:",
        err
      );

      throw err;
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        error,
        fetchOrders,
        createOrder,
        getOrdersByEmail,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}