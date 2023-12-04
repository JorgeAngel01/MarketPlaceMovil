import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text, Button, Portal, Modal, useTheme, Surface } from "react-native-paper";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingScreen from "../LoadingScreen";
import { getItemsOrden, getProductos } from "../../../context/services/useApi";

const OrderItemsModal = ({
  visible,
  hideModal,
  itemModal,
}) => {
  const theme = useTheme();

  const queryClient = useQueryClient();

  const [hasRefetched, setHasRefetched] = useState(false);

  let productosModal = useQuery({
    queryKey: ["id", itemModal.id],
    queryFn: () => getItemsOrden(itemModal.id),
    enabled: !!itemModal.id && !hasRefetched, // Enable the query only if not already refetched
  });

  useEffect(() => {
    if (visible && !hasRefetched) {
      // Call refetch once when the modal becomes visible
      queryClient.invalidateQueries(["id", itemModal.id]);
      productosModal.refetch();
      setHasRefetched(true);
    }
  }, [visible, hasRefetched, productosModal.refetch]);

  console.log("itemModal", itemModal);
  console.log("productosModal", productosModal);

  const OrdenItems = () => {
    if (productosModal.isLoading) return <LoadingScreen />;
    if (productosModal.isSuccess) {
      return (
        <View style={styles.ordenItems}>
          {productosModal.data.map((item) => (
            <Surface key={item.id}
              style={{
                width: "100%",
                justifyContent: "center",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <ItemOrder id={item.producto} />
              <Text>Cantidad: {item.cantidad}</Text>
            </Surface>
          ))}
        </View>
      );
    }
  };

  const ItemOrder = ({id}) => {
    const { data: producto, isSuccess } = useQuery({
      queryKey: ["producto", id],
      queryFn: () => getProductos(id),
    });

    if (!isSuccess) return <LoadingScreen />;
    return (
      <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      >
        <Text>{producto.nombre}</Text>
        <Image source={{ uri: producto.image }} style={styles.image} />
      </View>
    );
  };


  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        dismissableBackButton={true}
        contentContainerStyle={[
          styles.modalStyle,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <View style={styles.modalContent}>
          <OrdenItems />
        </View>
        <Button mode="contained-tonal" onPress={hideModal}>
          Close
        </Button>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalContent: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  ordenItems: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  image: {
    borderRadius: 50,
    width: 30,
    height: 30,
  },
});

export default OrderItemsModal;
