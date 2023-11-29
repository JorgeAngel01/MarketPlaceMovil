import React from "react";
import { StyleSheet, View, ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProveedorCard from "./ProveedorCard";
import { supplierData } from "../../../constants/testdata";

const ProveedorMainPageScroll = ({proveedores}) => {
  
  return(
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ marginTop: 10, flex: 1, width: "100%" }}
    >
      {supplierData.map((card) => {
        return <ProveedorCard key={card.id} card={card} height={175} />
      })}
    </ScrollView>
  )
}

export default ProveedorMainPageScroll