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
  getUsuariosById,
} from "../../../context/services/useApi";
import LoadingScreen from "../LoadingScreen";
import { useQuery } from "@tanstack/react-query";

const ReviewCardAutor = ({ review, index }) => {
  const theme = useTheme();
  const [id, setId] = useState(null);
  let query;

  useEffect(() => {
    setId(review.autor);
  }, []);

  query = useQuery({
    queryKey: ["autor", id],
    queryFn: () => getUsuariosById(id),
  });

  if (query === null || !query.isSuccess) return <LoadingScreen />;

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
            {query.data.username}
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

export default ReviewCardAutor;
