import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Divider, IconButton, Title } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import { getReviewsBy } from "../../../context/services/useApi";
import LoadingScreen from "../../../components/layout/LoadingScreen";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { useAuthContext } from "../../../hooks/useAuthContext";
import ReviewModal from "../../../components/layout/orders/OrderItemsModal";
import ReviewCard from "../../../components/layout/reviews/ReviewCard";

const MyReviews = ({ route }) => {
  const theme = useTheme();
  const { user } = useAuthContext();
  const navigation = useNavigation();

  const myReviews = useQuery({
    queryKey: [
      "myReviews",
      (data = {
        id: user,
        tipo: "username",
      }),
    ],
    queryFn: () =>
      getReviewsBy(
        (data = {
          id: user,
          tipo: "username",
        })
      ),
  });

  if (!myReviews.isSuccess) return <LoadingScreen />;

  console.log(myReviews);

  return (
    <>
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
          <Title>My Reviews</Title>
          <View style={{ width: 30, marginLeft: 15 }} />
        </View>
        <Divider style={styles.divider} />
        <View style={[styles.ordersContainer]}>
          <ScrollView>
            {myReviews.isSuccess &&
              myReviews.data.map((review, index) => (
                <ReviewCard key={review.id} review={review} index={index} />
              ))}
          </ScrollView>
        </View>
      </View>
    </>
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
  ordersContainer: {
    flex: 1,
    width: "100%",
    marginTop: 10,
  },
});

export default MyReviews;
