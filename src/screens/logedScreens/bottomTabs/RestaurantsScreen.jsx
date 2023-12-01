import React, { useState } from "react";
import { Searchbar, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import RestauranteMainPageScroll from "../../../components/layout/restaurantes/RestauranteMainPageScroll";

const RestaurantsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text variant="headlineLarge">Restaurants</Text>
        <Searchbar
          placeholder="Search"
          onChangeText={(query) => onChangeSearch(query)}
          value={searchQuery}
          style={{
            height: 40,
            width: "100%",
            marginVertical: 10,
          }}
          elevation={5}
        />
      </View>
      
      <View style={styles.containerSupplies}>
        {/* <Text variant="headlineSmall">Top 5</Text> */}
        <RestauranteMainPageScroll />
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
