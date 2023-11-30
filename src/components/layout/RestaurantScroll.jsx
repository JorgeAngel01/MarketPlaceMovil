import React from "react";
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Card, Text } from "react-native-paper";
import RestaurantCard from "../atoms/RestaurantCard";

import { cardsData } from "../../constants/testdata";

const RestaurantScroll = ({data}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ marginTop: 10, flex: 1, width: "100%" }}
    >
      {data.map((item) => (
        <RestaurantCard key={item.id} card={item} height={175} />
      ))}
    </ScrollView>
  );
};

export default RestaurantScroll;
