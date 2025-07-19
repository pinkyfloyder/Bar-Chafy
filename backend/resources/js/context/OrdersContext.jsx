import React, { createContext, useContext, useState, useEffect } from 'react';

const OrdersContext = createContext();
export const useOrders = () => useContext(OrdersContext);

const getInitialOrders = () => {
  const stored = localStorage.getItem('orders');
  return stored ? JSON.parse(stored) : [];
};

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(getInitialOrders());

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  // Añadir un pedido
  const addOrder = (order) => {
    setOrders(prev => [
      { ...order, id: Date.now() },
      ...prev
    ]);
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};
