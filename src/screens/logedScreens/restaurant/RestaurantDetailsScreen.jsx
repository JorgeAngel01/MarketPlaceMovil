import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Surface, Divider } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import {
  getCategoriasProductos,
  getProductosRestaurante,
} from "../../../context/services/useApi";
import CategoriesChipScroll from "../../../components/layout/CategoriesChipScroll";
import Header from "../../../components/layout/Header";
import ProductGallery from "../../../components/layout/ProductGallery";
import OrderModal from "../../../components/layout/OrderModal";
import LoadingScreen from "../../../components/layout/LoadingScreen";
import ModalMap from "../../../components/layout/ModalMap";

const RestaurantDetails = ({ route }) => {
  const theme = useTheme();
  const { restaurant } = route.params;
  const id = restaurant.id;
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const [itemModal, setItemModal] = useState({});
  const [visible, setVisible] = useState(false);

  const [itemModalMap, setItemModalMap] = useState({});
  const [visibleMap, setVisibleMap] = useState(false);

  const showModal = (item) => {
    setItemModal(item);
    setQuantity(1); // Initialize quantity when the modal is opened
    setVisible(true);
  };

  const hideModal = () => {
    setItemModal({});
    setVisible(false);
  };
  
  const showModalMap = (item) => {
    setItemModalMap(item);
    setVisibleMap(true);
  };

  const hideModalMap = () => {
    setItemModalMap({});
    setVisibleMap(false);
  };

  useEffect(() => {
    console.log(restaurant);
  }, []);

  const productos = useQuery({
    queryKey: ["productosRestaurante", id],
    queryFn: () => getProductosRestaurante(id),
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

  const handleMapPress = () => {
    showModalMap(restaurant);
  };

  if (productos.status === "pending" || categorias.status === "pending") {
    return <LoadingScreen />;
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
      <ModalMap
        visible={visibleMap}
        hideModal={hideModalMap}
        itemModal={itemModalMap}
      />
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.topContainer}>
          <Header object={restaurant} tipo="restaurante" onPress={handleMapPress} />
        </View>
        <View style={styles.bottomContainer}>
          <Surface style={styles.surface} elevation={2}>
            <Text variant="headlineLarge">{restaurant.nombre}</Text>
          </Surface>
          <Divider style={{ width: "100%", marginVertical: 10 }} />
          <CategoriesChipScroll
            data={categorias.data}
            onPress={handleCategoriaPress}
          />
          <ProductGallery data={filteredProductos} onPress={showModal} />
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

export default RestaurantDetails;
