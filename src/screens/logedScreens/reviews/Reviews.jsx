import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Divider,
  Icon,
  IconButton,
  Surface,
  Text,
  TextInput,
  Title,
} from "react-native-paper";
import { useTheme } from "react-native-paper";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createReview, getReviewsBy } from "../../../context/services/useApi";
import LoadingScreen from "../../../components/layout/LoadingScreen";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { useAuthContext } from "../../../hooks/useAuthContext";
import ReviewModal from "../../../components/layout/orders/OrderItemsModal";
import ReviewCard from "../../../components/layout/reviews/ReviewCard";
import ReviewCardAutor from "../../../components/layout/reviews/ReviewCardAutor";
import InputSpinner from "react-native-input-spinner";

const Reviews = ({ route }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userId } = useAuthContext();
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const { item, tipo } = route.params;

  const data = {
    id: item.id,
    tipo: tipo,
  };

  const reviews = useQuery({
    queryKey: ["reviews", data],
    queryFn: () => getReviewsBy(data),
  });

  const sendReview = useMutation({
    mutationFn: (data) => createReview(data),
    onSuccess: (data, variables, context) => {
      console.log("dataasda", data);
      console.log("variables", variables);
      console.log("context", context);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handlePostReview = () => {
    const data1 = {
      autor: userId,
      contenido: reviewContent,
      calificacion: reviewRating,
    };
    if (tipo === "producto") {
      data1.producto = item.id;
      data1.restaurante = null;
      data1.proveedor = null;
    } else if (tipo === "restaurante") {
      data1.restaurante = item.id;
      data1.producto = null;
      data1.proveedor = null;
    } else if (tipo === "proveedor") {
      data1.proveedor = item.id;
      data1.producto = null;
      data1.restaurante = null;
    }

    console.log(data1);
    sendReview.mutate(data1);
    setReviewContent("");
    setReviewRating(0);
  };

  if (!reviews.isSuccess) return <LoadingScreen />;

  const Reviews = () => {
    if (reviews.isSuccess && reviews.data.error === "No reviews found") {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              textAlign: "center",
              marginTop: 20,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            There is no reviews yet
          </Text>
          <Icon source="magnify" size={100} style={{ marginTop: 20 }} />
        </View>
      );
    } else {
      return (
        <ScrollView>
          {reviews.data.map((review, index) => (
            <ReviewCardAutor key={index} review={review} index={index} />
          ))}
        </ScrollView>
      );
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={[styles.topBar]}>
        <IconButton
          mode="contained"
          icon="arrow-left"
          color={theme.colors.text}
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Title>{item.nombre}</Title>
        <View style={{ width: 30, marginLeft: 10 }} />
      </View>
      <Divider style={styles.divider} />
      <View style={[styles.reviewsContainer]}>
        <Reviews />
      </View>
      <View style={{ height: "50%", width: "100%", marginVertical: 10 }}>
        <Divider style={styles.divider} />
        <Surface
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
            gap: 10,
            padding: 10,
            borderRadius: 10,
            backgroundColor: theme.colors.tertiaryContainer,
          }}
        >
          <Icon
            source="pen"
            size={30}
            style={{ marginTop: 20, marginLeft: 10 }}
          />
          <Title>Leave a Review</Title>
        </Surface>
        <View styles={styles.leaveReview}>
          <TextInput
            label="Content:"
            placeholder="Write your review here"
            multiline={true}
            style={{
              width: "100%",
              height: 100,
              backgroundColor: theme.colors.background,
              color: theme.colors.text,
              marginBottom: 10,
            }}
            value={reviewContent}
            onChangeText={(text) => setReviewContent(text)}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ marginRight: 10 }}>Rating:</Text>
            <InputSpinner
              max={5}
              min={0}
              type="float"
              step={0.5}
              style={{ width: "50%", marginBottom: 10 }}
              background="transparent"
              textColor="white"
              skin="paper"
              value={reviewRating}
              onChange={(num) => {
                setReviewRating(num);
              }}
            />
          </View>
          <Button
            mode="contained"
            style={{ width: "auto" }}
            onPress={() => {
              handlePostReview();
            }}
          >
            Send
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
  },
  divider: {
    width: "100%",
    height: 1,
  },
  reviewsContainer: {
    flex: 1,
    width: "100%",
    marginVertical: 10,
  },
  leaveReview: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
  },
});

export default Reviews;
