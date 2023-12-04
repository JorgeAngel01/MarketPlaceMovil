import React, { useState } from "react";
import { Searchbar, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import SupplierScroll from "../../../components/layout/SupplierScroll";
import ProveedorMainPageScroll from "../../../components/layout/proveedores/ProveedorMainPageScroll";
import { getProveedores } from "../../../context/services/useApi";
import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "../../../components/layout/LoadingScreen";

const ProveedorScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  const proveedores = useQuery({
    queryKey: ['proveedores'],
    queryFn: getProveedores,
  })
  console.log(proveedores.data)

  if ( proveedores.isLoading) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text variant="headlineLarge">Grocery</Text>
      </View>
      
      <View style={styles.containerSupplies}>
        {/* <Text variant="headlineSmall">Suppliers</Text> */}
        <ProveedorMainPageScroll data={proveedores.data}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  text: {
    color: "black",
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  containerSupplies:{
    flex: 1,
    width: "100%",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "flex-start",
  }
});

export default ProveedorScreen;
