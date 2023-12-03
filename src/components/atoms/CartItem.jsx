import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Card, Title, Paragraph, IconButton } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import { getProductos } from "../../context/services/useApi";
import LoadingScreen from "../layout/LoadingScreen";
import { useCartContext } from "../../context/CartContext";

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {

  console.log("Item: ", item);

  const { data: producto, isSuccess } = useQuery({
    queryKey: ["producto", item.id],
    queryFn: () => getProductos(item.producto),
  });

  console.log("Producto: ", producto);

  const handleIncrement = () => {
    onUpdateQuantity(item.id, item.cantidad + 1, (item.cantidad + 1) * producto.precio);
  };

  const handleDecrement = () => {
    if (item.cantidad > 1) {
      onUpdateQuantity(item.id, item.cantidad - 1, (item.cantidad - 1) * producto.precio);
    }
  };

  if (!isSuccess) return <LoadingScreen />;

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <Image source={{ uri: producto.image }} style={styles.image} />
        <View style={styles.details}>
          <Title style={styles.title}>{producto.nombre}</Title>
          <Paragraph style={styles.price}>
            MX ${(item.cantidad * producto.precio).toFixed(2)}
          </Paragraph>
          <View style={styles.quantityContainer}>
            <IconButton
              icon="minus"
              onPress={handleDecrement}
              size={20}
              style={styles.iconButton}
            />
            <Paragraph style={styles.quantityText}>{item.cantidad}</Paragraph>
            <IconButton
              icon="plus"
              onPress={handleIncrement}
              size={20}
              style={styles.iconButton}
            />
            <IconButton
              icon="delete"
              onPress={() => onRemove(item.id)}
              size={20}
              style={styles.iconButton}
            />
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 4,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  image: {
    width: "34%",
    height: "100%",
    marginRight: 8,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    gap: 2
  },
  price: {
    fontSize: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
  },
  quantityContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginHorizontal: 2,
  },
  quantityText: {
    marginHorizontal: 2,
  },
});

export default CartItem;
