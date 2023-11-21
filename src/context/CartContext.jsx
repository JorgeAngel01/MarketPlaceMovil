import React from "react";
import { createContext } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {	

  const values = {};

  return (
    <CartContext.Provider value={values}>{children}</CartContext.Provider>
  );
};

export { CartContext, CartProvider };
