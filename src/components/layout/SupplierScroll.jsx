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

const SupplierScroll = ({data}) => {
  const navigation = useNavigation();

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{ marginTop: 10 }}
    >
      {data.map((proveedor, index) => (
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
                marginLeft: proveedor.index !== 0 ? 10 : 0,
              },
            ]}
          >
            <Card.Cover source={{ uri: proveedor.banner }} style={[styles.card]} />
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
