import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import CartItem from "../../../components/atoms/CartItem";

const testUrl =
  "https://res.cloudinary.com/dtemu5zmg/image/upload/v1700683560/cld-sample-4.jpg";

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([
    {
      "id": 1,
      "nombre": "Cesta de Frutas Frescas",
      "descripcion": "Variedad de frutas frescas de la temporada",
      "precio": "25.99",
      "image": testUrl,
      "categoria": "0",
      "estado": "1",
      "promedio_calific": null,
      "cantidad": 2,
      "restaurantes": [],
      "proveedores": [
        1
      ]
    },
    {
      "id": 2,
      "nombre": "Paquete de Carnes Asadas",
      "descripcion": "Selección especial de cortes para asar",
      "precio": "45.50",
      "image": testUrl,
      "categoria": "0",
      "estado": "1",
      "promedio_calific": null,
      "cantidad": 3,
      "restaurantes": [],
      "proveedores": [
        1
      ]
    },
    {
      "id": 3,
      "nombre": "Caja de Postres Artesanales",
      "descripcion": "Delicias dulces caseras, variadas y exquisitas",
      "precio": "35.75",
      "image": testUrl,
      "categoria": "0",
      "estado": "1",
      "promedio_calific": null,
      "cantidad": 5,
      "restaurantes": [],
      "proveedores": [
        1
      ]
    },
    {
      "id": 4,
      "nombre": "Canasta de Productos Orgánicos",
      "descripcion": "Productos orgánicos cuidadosamente seleccionados",
      "precio": "50.25",
      "image": testUrl,
      "categoria": "0",
      "estado": "1",
      "promedio_calific": null,
      "cantidad": 7,
      "restaurantes": [],
      "proveedores": [
        1
      ]
    }
  ]);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId ? { ...item, cantidad: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={handleRemoveItem}
            onUpdateQuantity={handleUpdateQuantity}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "black",
  },
});

export default CartScreen;
