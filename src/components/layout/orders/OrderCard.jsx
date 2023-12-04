import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Icon, Paragraph, Title } from "react-native-paper";

const OrderCard = ({ order, index, onPress }) => {
  const [estado, setEstado] = useState(order.estado);

  useEffect(() => {
    if (order.estado === "1") {
      setEstado("Pedido en proceso");
    } else if (order.estado === "2") {
      setEstado("Pedido enviado");
    } else if (order.estado === "3") {
      setEstado("Pedido en camino");
    } else if (order.estado === "4") {
      setEstado("Pedido entregado");
    }
  }, []);

  const time = new Date(order.fecha);
  const formattedDate = time.toLocaleString("en-US", {
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
          <Icon source="shopping" size={30} />
          <Title>Orden # {index + 1} </Title>
        </View>
        <View style={{ marginTop: 10 }}>
          <Paragraph>{formattedDate}</Paragraph>
          <Paragraph>{estado}</Paragraph>
          <Paragraph>Total: MX${order.precio_total}</Paragraph>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button onPress={
            () => {
                onPress(order);
            }
        }>View Order</Button>
      </Card.Actions>
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

export default OrderCard;
