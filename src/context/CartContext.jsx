import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createItemOrden,
  createOrden,
  deleteItemOrden,
  getUserOrdenes,
  updateItemOrdenQuantity,
  updateOrdenStatus,
} from "./services/useApi";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user, userId } = useAuthContext();
  const [ordenId, setOrdenId] = useState(null);
  const [cartBool, setCartBool] = useState(false);

  useEffect(() => {
    getUserOrdenes(user, true).then((data) => {
      console.log("Ordenes: ", data);
      if (data.message === "No orders found" || data.estado !== "0") {
        console.log("No hay ordenes");
        createOrden(userId).then((data) => {
          console.log("Orden creada: ", data);
        });
      } else {
        console.log("Si hay ordenes");
        setOrdenId(data.id);
        setCartBool(true);
        console.log("OrdenId: ", ordenId);
      }
    });
  }, [cartBool]);

  const addToCart = useMutation({
    mutationFn: (data) =>
      createItemOrden(data),
    onSuccess: (data, variables, context) => {
      console.log("data", data);
      console.log("variables", variables);
      console.log("context", context);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const updatedCartItem = useMutation({
    mutationFn: (data) =>
      updateItemOrdenQuantity(data),
    onSuccess: (data, variables, context) => {
      console.log("data", data);
      console.log("variables", variables);
      console.log("context", context);
    }
  })

  const updatedOrdenEstado = useMutation({
    mutationFn: (data) =>
      updateOrdenStatus(data),
    onSuccess: (data, variables, context) => {
      console.log("data", data);
      console.log("variables", variables);
      console.log("context", context);
    }
  })

  const deletedCartItem = useMutation({
    mutationFn: (data) =>
      deleteItemOrden(data),
    onSuccess: (data, variables, context) => {
      console.log("data", data);
      console.log("variables", variables);
      console.log("context", context);
    }
  })

  const handleAddItem = async (item, quantity) => {
    const data = {
      user: userId,
      orden: ordenId,
      producto: item.id,
      cantidad: quantity,
    }
    addToCart.mutate(data);
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    console.log("Item: ", itemId);
    console.log("Quantity: ", newQuantity);
    const data = {
      id: itemId,
      cantidad: newQuantity,
    }
    updatedCartItem.mutate(data);
  }

  const handleUpdateEstado = (estado) => {
    console.log("Estado: ", estado);
    const data = {
      id: ordenId,
      estado: estado,
    }
    console.log("Data: ", data);
    
    updatedOrdenEstado.mutate(data);
  }

  const handleRemoveCartItem = (id) => {
    console.log("Item: ", id);
    const data = {
      id: id,
    }
    deletedCartItem.mutate(data);
  };

  const values = {
    cartBool,
    setCartBool,
    ordenId,
    setOrdenId,
    handleAddItem,
    handleUpdateQuantity,
    handleUpdateEstado,
    handleRemoveCartItem,

  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };
