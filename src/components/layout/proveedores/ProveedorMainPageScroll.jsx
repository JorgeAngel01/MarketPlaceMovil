import React from "react";
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Card, Text } from "react-native-paper";
import ProveedorCard from "../proveedores/ProveedorCard";

const ProveedorMainPageScroll = ({data}) => {
  console.log("pito")
  console.log(data)
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ marginTop: 10, flex: 1, width: "100%" }}
    >
      {data.map((item, index) => (
        <ProveedorCard key={item.id} card={item} height={175} />
      ))}
    </ScrollView>
  );
};

export default ProveedorMainPageScroll;

/*
 */
/*
 */