import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Text,
  Surface,
  Divider,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import { useTheme } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import {
  getCategoriasProductos,
  getCategoriasProveedor,
  getProductosProveedor,
} from "../../../context/services/useApi";
import CategoriesChipScroll from "../../../components/layout/CategoriesChipScroll";
import Header from "../../../components/layout/Header";
import ProductGallery from "../../../components/layout/ProductGallery";
import OrderModal from "../../../components/layout/OrderModal";
import LoadingScreen from "../../../components/layout/LoadingScreen";

const ProveedorScreen = ({ route }) => {
  const theme = useTheme();
  const { proveedor } = route.params;
  const id = proveedor.id;
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const [itemModal, setItemModal] = useState({});
  const [visible, setVisible] = useState(false);

  const showModal = (item) => {
    setItemModal(item);
    setQuantity(1); // Initialize quantity when the modal is opened
    setVisible(true);
  };

  const hideModal = () => {
    setItemModal({});
    setVisible(false);
  };

  const productos = useQuery({
    queryKey: ["productosProveedor", id],
    queryFn: () => getProductosProveedor(id),
  });

  const categorias = useQuery({
    queryKey: ["categorias"],
    queryFn: getCategoriasProductos,
  });

  const handleCategoriaPress = (categoria) => {
    const filter = productos.data.filter(
      (producto) => producto.categoria === categoria
    );
    console.log(filter);
    console.log(categoria);
    setFilteredProductos(filter);
  };

  if (productos.status === "pending" || categorias.status === "pending") {
    return (
      <LoadingScreen/>
    );
  }

  if (productos.status === "error") {
    return (
      <Text style={{ color: "black" }}>Error {productos.error.message}</Text>
    );
  }

  return (
    <>
      <OrderModal
        visible={visible}
        hideModal={hideModal}
        itemModal={itemModal}
        quantity={quantity}
        setQuantity={setQuantity}
      />
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.topContainer}>
          <Header object={proveedor} />
        </View>
        <View style={styles.bottomContainer}>
          <Surface style={styles.surface} elevation={2}>
            <Text variant="headlineLarge">{proveedor.nombre}</Text>
          </Surface>
          <Divider style={{ width: "100%", marginVertical: 10 }} />
          <CategoriesChipScroll
            data={categorias.data}
            onPress={handleCategoriaPress}
          />
          <ProductGallery
            data={filteredProductos}
            height={100}
            width={100}
            onPress={showModal}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  topContainer: {
    height: "25%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  bottomContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "stretch",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  surface: {
    padding: 8,
    width: "100",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "black",
  },
});

export default ProveedorScreen;
