import { createContext, useContext, useEffect, useState } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("crochetOasisOrders");

    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "crochetOasisOrders",
      JSON.stringify(orders)
    );
  }, [orders]);

  const createOrder = (orderData) => {
    const newOrder = {
      id: `CO-${Date.now()}`,
      date: new Date().toISOString(),
      status: "Pending",
      ...orderData,
    };

    setOrders((currentOrders) => [
      newOrder,
      ...currentOrders,
    ]);

    return newOrder;
  };

  const getOrdersByEmail = (email) => {
    return orders.filter(
      (order) => order.customer.email === email
    );
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        getOrdersByEmail,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}