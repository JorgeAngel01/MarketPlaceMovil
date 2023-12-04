import React, { useState } from "react";
import { Searchbar, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import RestauranteMainPageScroll from "../../../components/layout/restaurantes/RestauranteMainPageScroll";
import LoadingScreen from "../../../components/layout/LoadingScreen";
import { useQuery } from "@tanstack/react-query";
import { getRestaurantes } from "../../../context/services/useApi";
import RestaurantScroll from "../../../components/layout/RestaurantScroll";

const RestaurantsScreen = () => {

  const restaurantes = useQuery({
    queryKey: ['restaurantes'],
    queryFn: getRestaurantes,
  })

  if ( restaurantes.isLoading) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text variant="headlineLarge">Restaurants</Text>
      </View>
      
      <View style={styles.containerSupplies}>
        {/* <Text variant="headlineSmall">Top 5</Text> */}
        <RestaurantScroll data={restaurantes.data} />
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

export default RestaurantsScreen;
