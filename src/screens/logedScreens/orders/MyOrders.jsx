import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Divider, IconButton, Title } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import { getUserOrdenes } from "../../../context/services/useApi";
import LoadingScreen from "../../../components/layout/LoadingScreen";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import OrderCard from "../../../components/layout/orders/OrderCard";
import { useAuthContext } from "../../../hooks/useAuthContext";
import OrderItemsModal from "../../../components/layout/orders/OrderItemsModal";

const MyOrders = ({ route }) => {
  const theme = useTheme();
  const { user } = useAuthContext();
  const navigation = useNavigation();

  const [itemModal, setItemModal] = useState({});
  const [visible, setVisible] = useState(false);

  const showModal = (item) => {
    setItemModal(item);
    setVisible(true);
  };

  const hideModal = () => {
    setItemModal({});
    setVisible(false);
  };

  const myOrders = useQuery({
    queryKey: ["myOrders", user],
    queryFn: () => getUserOrdenes(user, false),
  });

  if (!myOrders.isSuccess) return <LoadingScreen />;

  return (
    <>
      {visible && (
        <OrderItemsModal
          visible={visible}
          hideModal={hideModal}
          itemModal={itemModal}
        />
      )}

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
          <Title>My Orders</Title>
          <View style={{ width: 30, marginLeft: 15 }} />
        </View>
        <Divider style={styles.divider} />
        <View style={[styles.ordersContainer]}>
          <ScrollView>
            {myOrders.isSuccess &&
              myOrders.data
                .filter((order) => order.estado !== "0")
                .map((order, index) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    index={index}
                    onPress={showModal}
                  />
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

export default MyOrders;
