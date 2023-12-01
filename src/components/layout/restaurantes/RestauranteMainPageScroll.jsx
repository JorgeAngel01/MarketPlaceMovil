import React from "react";
import { StyleSheet, View, ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { cardsData } from "../../../constants/testdata";
import RestaurantCard from "../../atoms/RestaurantCard";

const RestauranteMainPageScroll = ({restaurantes}) => {
  
  return(
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ marginTop: 10, flex: 1, width: "100%" }}
    >
      {cardsData.map((card) => (
        <RestaurantCard key={card.id} card={card} height={175} />
      ))}
    </ScrollView>
  )
}

export default RestauranteMainPageScroll