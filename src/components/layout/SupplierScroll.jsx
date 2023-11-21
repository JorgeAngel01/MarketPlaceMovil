import React from "react";
import { ScrollView, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";

const SupplierScroll = () => {
  const cardsData = [
    {
      id: 1,
      uri: "https://guiadehorarios.com.mx/wp-content/uploads/2022/08/Horas-de-Bodega-Aurrera.jpg",
      height: 75,
      width: 150,
    },
    {
      id: 2,
      uri: "https://thelogisticsworld.com/wp-content/uploads/2023/04/walmart-mexico-2-828x548.jpg",
      height: 75,
      width: 150,
    },
    {
      id: 3,
      uri: "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F842e771c-00fe-44dc-a5e2-f379ced3dd25_750x350.jpeg",
      height: 75,
      width: 150,
    },
    { id: 4, uri: "https://picsum.photos/700", height: 75, width: 150 },
    { id: 5, uri: "https://picsum.photos/700", height: 75, width: 150 },
  ];

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{ marginTop: 10 }}
    >
      {cardsData.map((card) => (
        <TouchableOpacity key={card.id}>
          <Card
            style={{
              height: card.height,
              width: card.width,
              marginLeft: card.id !== 1 ? 10 : 0,
            }}
          >
            <Card.Cover
              source={{ uri: card.uri }}
              style={{
                height: card.height,
                width: card.width,
              }}
            />
          </Card>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default SupplierScroll;

