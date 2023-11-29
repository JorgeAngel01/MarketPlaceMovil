import React from "react";
import { FlatList} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProveedorCard from "./ProveedorCard";
import { supplierData } from "../../../constants/testdata";

const ProveedorMainPageScroll = ({proveedores}) => {
  const renderItem = ({ item }) => (
    <ProveedorCard key={item.id} card={item} height={175} />
  );

  return(
    <FlatList
    data={supplierData}
    renderItem={renderItem}
    keyExtractor={(item) => item.id.toString()}
    showsVerticalScrollIndicator={false}
    style={{ marginTop: 10, flex: 1, width: "100%" }}
  />
  )
}

export default ProveedorMainPageScroll