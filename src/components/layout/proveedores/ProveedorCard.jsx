import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import StarRating from "../../atoms/StarRating";

const ProveedorCard = ({ card, height }) => {
  const navigation = useNavigation();
  console.log(card)
  
  return (
    <TouchableOpacity key={card.id}
      onPress={() => navigation.navigate("ProveedorDetails", 
      { 
        proveedor: card
      })}
    >
      <Card
        style={[
          styles.card,
          {
            height: height,
            marginTop: card.index !== 1 ? 10 : 0,
          },
        ]}
      >
        <Card.Cover
          source={{ uri: card.banner }}
          style={{
            height: height,
          }}
        />
        <Card.Content style={[styles.cardContent]}>
          <View style={styles.cardTop}>
            <Avatar.Image
              size={30}
              source={{
                uri: card.icono,
              }}
            />
            <Text variant="headlineMedium" style={styles.title}>
              {card.nombre}
            </Text>
          </View>
          <View style={styles.cardBottom}>
            <StarRating score={card.promedio_calific} 
                halfStars={true}
                size={20}
            />
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 150,
    width: "100%",
    marginTop: 10,
  },
  cardContent: {
    borderRadius: 10,
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    height: "100%",
    width: "100%",
    padding: 10,
    justifyContent: "space-between",
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
  },
});

export default ProveedorCard;
