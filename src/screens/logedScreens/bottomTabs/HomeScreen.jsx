import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Card,
  Chip,
  IconButton,
  MD3Colors,
  Searchbar,
  Text,
  useTheme,
} from "react-native-paper";
import { getProveedores, getRestaurantes } from "../../../context/services/useApi";
import { THEME } from "../../../theme/styles";
import ProfileButton from "../../../components/atoms/ProfileButton";
import RestaurantScroll from "../../../components/layout/RestaurantScroll";
import SupplierScroll from "../../../components/layout/SupplierScroll";


const Home = () => {

  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  const restaurantes = useQuery({
    queryKey: ['restaurantes'],
    queryFn: getRestaurantes,
  })

  useEffect(() => {
    
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <ProfileButton
          imageUrl="https://xsgames.co/randomusers/avatar.php?g=female"
          size={40}
          onPress={() => navigation.navigate("Profile")}
        />
        <IconButton
          icon="cart"
          mode="contained"
          iconColor={"white"}
          size={25}
          onPress={() => navigation.navigate("Cart")}
        />
      </View>
      <View style={styles.containerTop}>
        <Searchbar
          placeholder="Search"
          onChangeText={(query) => onChangeSearch(query)}
          value={searchQuery}
          
          style={{
            height: 40,
            width: "100%",
            marginBottom: 10,
          }}
          elevation={5}
        />
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Chip
            icon="information"
            onPress={() => console.log("Pressed")}
            style={{ marginLeft: 10 }}
          >
            Grocery
          </Chip>
          <Chip
            icon="information"
            onPress={() => console.log("Pressed")}
            style={{ marginLeft: 10 }}
          >
            Restaurants
          </Chip>
          <Chip
            icon="information"
            onPress={() => console.log("Pressed")}
            style={{ marginLeft: 10 }}
          >
            Convenience
          </Chip>
        </ScrollView>
      </View>
      <View style={styles.containerSupplies}>
        <Text variant="headlineSmall">Suppliers</Text>
        <SupplierScroll />
      </View>
      <View style={styles.containerRestaurants}>
        <Text variant="headlineSmall">Restaurants</Text>
        <RestaurantScroll data={restaurantes.data} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  topBar: {
    height: "12%",
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerTop: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerSupplies: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  containerRestaurants: {
    flex: 1,
    width: "100%",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "flex-start",
  },
});

export default Home;

/*
<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Chip
            icon="information"
            onPress={() => console.log("Pressed")}
            style={{ marginLeft: 10 }}
          >
            Grocery
          </Chip>
          <Chip
            icon="information"
            onPress={() => console.log("Pressed")}
            style={{ marginLeft: 10 }}
          >
            Restaurants
          </Chip>
          <Chip
            icon="information"
            onPress={() => console.log("Pressed")}
            style={{ marginLeft: 10 }}
          >
            Convenience
          </Chip>
        </ScrollView>
        */