import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import CartItem from "../../../components/atoms/CartItem";
import { Text, Button, Icon, IconButton } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import {
  getUserOrdenes,
  getItemsOrden,
} from "../../../context/services/useApi";
import { useNavigation } from "@react-navigation/native";
import LoadingScreen from "../../../components/layout/LoadingScreen";
import { useCartContext } from "../../../hooks/useCartContext";

const CartScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { user } = useAuthContext();
  const { handleUpdateQuantity, handleUpdateEstado, handleRemoveCartItem } = useCartContext();
  const [cartArray, setCartArray] = useState([]);
  const [total , setTotal] = useState(0);

  const orden = useQuery({
    queryKey: ["orden", user],
    queryFn: () => getUserOrdenes(user, true),
  });

  const ordenId = orden.data?.id;

  const { data: cartItems, isSuccess, refetch } = useQuery({
    queryKey: ["id", ordenId],
    queryFn: () => getItemsOrden(ordenId),
    enabled: !!ordenId,
  });

  useEffect(() => {
    if (isSuccess) {
      setCartArray(cartItems);
      refetch();
    }
  }, [isSuccess]);

  useEffect(() => {
    if(orden.isSuccess) {
      setTotal(orden.data.precio_total);
    }
  }, [orden.isSuccess])

  const handleOnBuy = (estado) => {
    handleUpdateEstado(estado);
  };

  const handleUpdateCartItem = (itemId, newQuantity, price) => {
    handleUpdateQuantity(itemId, newQuantity);
    setCartArray(
      cartArray.map((item) =>
        item.id === itemId ? { ...item, cantidad: newQuantity } : item
      )
    );
    tot = parseFloat(total) + parseFloat(price);
    setTotal(tot.toFixed(2));
  };

  const handleRemoveItem = (id) => {
    setCartArray(cartArray.filter((item) => item.id !== id));
    handleRemoveCartItem(id);
    // setCartArray(cartItems.filter((item) => item.id !== id));
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.topBar}>
        <IconButton
          mode="contained"
          icon="arrow-left"
          color={theme.colors.text}
          size={30}
          onPress={() => navigation.goBack()}
          style={{ left: -10 }}
        />
        <Text variant="headlineLarge" style={styles.title}>
          Cart
        </Text>
        <View style={{ width: 30 }} />
      </View>
      <ScrollView>
        {isSuccess &&
          cartArray.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={handleRemoveItem}
              onUpdateQuantity={handleUpdateCartItem}
            />
          ))}
      </ScrollView>
      <Button
        icon="shopping"
        mode="contained"
        style={styles.button}
        onPress={() => {
          handleOnBuy("1");
          navigation.navigate("Home");
        }}
      >
        Comprar ${total}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
    marginHorizontal: 10,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    marginVertical: 12,
    borderWidth: 1,
  },
});

export default CartScreen;

  /* const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartArray(
    cartItems.map((item) =>
    .id === itemId ? { ...item, cantidad: newQuantity } : item
    )
    );
  }; */