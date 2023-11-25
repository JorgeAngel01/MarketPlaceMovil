import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Card, Title, Paragraph, IconButton } from "react-native-paper";

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const totalPrice = item.precio * item.cantidad;

  const handleIncrement = () => {
    onUpdateQuantity(item.id, item.cantidad + 1);
  };

  const handleDecrement = () => {
    if (item.cantidad > 1) {
      onUpdateQuantity(item.id, item.cantidad - 1);
    }
  };

  return (
    <Card mode="outlined" style={styles.card}>
      <Card.Content style={styles.content}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.details}>
          <Title>{item.nombre}</Title>
          <Paragraph style={styles.price}>$ {totalPrice.toFixed(2)}</Paragraph>
          <View style={styles.quantityContainer}>
            <Paragraph style={styles.text}>Cantidad:</Paragraph>
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
  },
  price: {
    fontSize: 20,
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
