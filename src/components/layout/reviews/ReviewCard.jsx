import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Icon,
  Paragraph,
  Surface,
  Title,
  useTheme,
} from "react-native-paper";
import StarRating from "../../atoms/StarRating";
import {
  getProductos,
  getProveedor,
  getRestaurante,
} from "../../../context/services/useApi";
import LoadingScreen from "../LoadingScreen";
import { useQuery } from "@tanstack/react-query";

const ReviewCard = ({ review, index }) => {
  const theme = useTheme();
  const [id, setId] = useState(null);
  let query;

  useEffect(() => {
    if (review.producto !== null) {
      setId(review.producto);
    } else if (review.restaurante !== null) {
      setId(review.restaurante);
    } else if (review.proveedor !== null) {
      setId(review.proveedor);
    }
  }, []);

  if (review.producto !== null) {
    query = useQuery({
      queryKey: ["producto", id],
      queryFn: () => getProductos(id),
    });
  } else if (review.restaurante !== null) {
    query = useQuery({
      queryKey: ["restaurante", id],
      queryFn: () => getRestaurante(id),
    });
  } else if (review.proveedor !== null) {
    query = useQuery({
      queryKey: ["proveedor", id],
      queryFn: () => getProveedor(id),
    });
  }

  if (query === null || !query.isSuccess) return <LoadingScreen />;

  console.log("sfassdfd", query.data);

  var date = new Date(review.fecha);
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card
      style={{
        marginTop: index === 0 ? 0 : 10,
      }}
    >
      <Card.Content>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Icon source="message-draw" size={30} />
          <Title>Review # {index + 1}</Title>
        </View>
        <View style={{ marginTop: 10, gap: 10 }}>
          <Title
            style={{
              fontWeight: "bold",
            }}
          >
            {query.data.nombre}
          </Title>
          <Paragraph>{formattedDate}</Paragraph>
          <Surface
            style={{
              padding: 10,
              borderRadius: 10,
              backgroundColor: theme.colors.background,
              gap: 10,
            }}
          >
            <Paragraph>{review.contenido}</Paragraph>
            <StarRating
              score={review.calificacion}
              size={20}
              halfStars
              color={theme.colors.primary}
            />
          </Surface>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginTop: 10,
  },
});

export default ReviewCard;
