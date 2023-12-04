import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text, Button, Portal, Modal, useTheme, FAB } from "react-native-paper";
import { useCartContext } from "../../hooks/useCartContext";
import { useNavigation } from "@react-navigation/native";
import MapComponent from "../maps/MapComponent";

const ModalMap = ({ visible, hideModal, itemModal }) => {
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
        <MapComponent
            mapLatitude={itemModal.latitude}
            mapLongitude={itemModal.longitude}
            markerLatitude={itemModal.latitude}
            markerLongitude={itemModal.longitude}
          />
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
    width: "100%",
    height: 250,
    marginBottom: 20,
  },
  fab: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default ModalMap;
