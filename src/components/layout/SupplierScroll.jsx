import React from "react";
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-paper";
import { supplierData } from "../../constants/testdata";
import { useNavigation } from "@react-navigation/native";

const SupplierScroll = () => {
  const navigation = useNavigation();

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{ marginTop: 10 }}
    >
      {supplierData.map((proveedor) => (
        <TouchableOpacity
          key={proveedor.id}
          onPress={() =>
            navigation.navigate("ProveedorDetails", {
              proveedor: proveedor,
            })
          }
        >
          <Card
            style={[
              [styles.card],
              {
                marginLeft: proveedor.id !== 1 ? 10 : 0,
              },
            ]}
          >
            <Card.Cover source={{ uri: proveedor.uri }} style={[styles.card]} />
          </Card>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 75,
    width: 150,
  },
});

export default SupplierScroll;
