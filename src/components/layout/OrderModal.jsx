import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text, Button, Portal, Modal, useTheme } from "react-native-paper";

const OrderModal = ({
  visible,
  hideModal,
  itemModal,
  quantity,
  setQuantity,
}) => {
  const theme = useTheme();

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
          <Image source={{ uri: itemModal.image }} style={styles.imageModal} />
          <Text variant="headlineLarge">{itemModal.nombre}</Text>
          <Text variant="bodyMedium">{itemModal.descripcion}</Text>
          <Text variant="bodyMedium">
            MX${parseFloat(itemModal.precio).toFixed(2)}
          </Text>
          <View style={styles.quantityContainer}>
            <Button
              icon="minus-thick"
              onPress={() => quantity > 0 && setQuantity(quantity - 1)}
            ></Button>
            <Text> {quantity} </Text>
            <Button
              icon="plus-thick"
              mode="text"
              onPress={() => setQuantity(quantity + 1)}
            ></Button>
            <Button icon="cart" mode="outlined" onPress={() => console.log("")}>
              Add to cart
            </Button>
          </View>
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
  imageModal: {
    borderRadius: 10,
    width: "100%",
    height: 250,
  },
  quantityContainer: {
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default OrderModal;
