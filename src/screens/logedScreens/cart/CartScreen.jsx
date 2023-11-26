import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import CartItem from "../../../components/atoms/CartItem";
import { Text, Button } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import {
  getUserOrdenes,
  getItemsOrden,
} from "../../../context/services/useApi";

const testUrl =
  "https://res.cloudinary.com/dtemu5zmg/image/upload/v1700683560/cld-sample-4.jpg";

const CartScreen = () => {
  const theme = useTheme();
  const { user } = useAuthContext();

  const { data: orden } = useQuery({
    queryKey: ["orden", user],
    queryFn: () => getUserOrdenes("claudia", true),
  });

  const ordenId = orden?.id;

  const { data: cartItems, isSuccess } = useQuery({
    queryKey: ["id", ordenId],
    queryFn: () => getItemsOrden(ordenId),
    enabled: !!ordenId,
  });

  const handleOnPress = () => {
    console.log("Orden: ", orden);
    console.log("Items: ", cartItems);
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    // setCartItems(
    //   cartItems.map((item) =>
    //     item.id === itemId ? { ...item, cantidad: newQuantity } : item
    //   )
    // );
  };

  const handleRemoveItem = (id) => {
    // setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text variant="headlineLarge" style={styles.title}>
        Carrito de Compras
      </Text>
      <ScrollView>
        {isSuccess && cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={handleRemoveItem}
            onUpdateQuantity={handleUpdateQuantity}
          />
        ))}
      </ScrollView>
      <Button
        icon="shopping"
        mode="contained"
        style={styles.button}
        onPress={handleOnPress}
      >
        Comprar ${orden?.precio_total}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    paddingVertical: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    marginVertical: 12,
    borderWidth: 1,
  },
});

export default CartScreen;
