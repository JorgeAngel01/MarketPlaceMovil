import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { useAuthContext } from "../../../hooks/useAuthContext";
import {
  Button,
  Card,
  Divider,
  Icon,
  IconButton,
  Text,
} from "react-native-paper";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import ProfileButton from "../../../components/atoms/ProfileButton";
import { useQuery } from "@tanstack/react-query";
import { getProductosProveedor} from "../../../context/services/useApi";

const ProveedorScreen = ({ route }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { proveedor } = route.params;
  const id = proveedor.id;

  const productos = useQuery({
    queryKey: ['productos', id],
    queryFn: () => getProductosProveedor(id),
  })

  if (productos.status === 'pending') {
    return <Text style={{color:"black"}}>{proveedor.id}</Text>
  }

  if (productos.status === 'error') {
    return <Text style={{color:"black"}}>Error {productos.error.message}</Text>
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.topContainer}>
        <Card style={[styles.card]}>
          <Card.Cover style={styles.cardCover} source={{ uri: proveedor.uri }} />
          <Card.Content style={[styles.cardContent]}>
            <View style={styles.cardTop}>
              <IconButton
                mode="contained"
                icon="arrow-left"
                color={theme.colors.text}
                size={30}
                onPress={() => navigation.goBack()}
                style={{ left: -10 }}
              />
            </View>
            <View style={styles.cardBottom}></View>
          </Card.Content>
        </Card>
      </View>
      <View style={styles.bottomContainer}>
        <Text variant="headlineLarge">{proveedor.nombre}</Text>
        <View style={styles.products}>
          <Text variant="titleLarge">Productos</Text>
          <View style={styles.productsList}>
            {productos.data.map((producto) => (
                <Text variant="titleSmall">{producto.nombre}</Text>
            ))
            }
          </View>
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
  },
  topContainer: {
    width: "100%",
    height: "25%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  bottomContainer: {
    width: "100%",
    height: "70%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
  },
  card: {
    height: "100%",
    width: "100%",
  },
  cardCover: {
    objectFit: "scale-down",
    borderRadius: 10,
    height: "100%",
    width: "100%",
  },
  cardContent: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.5)",
    bottom: 0,
    left: 0,
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    paddingTop: 10,
  },
  cardBottom: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    width: "100%",
    padding: 10,
  },
  text: {
    color: "black",
  },
});

export default ProveedorScreen;

/*
{supplier.productos.map((producto) => (
              <View style={styles.producto}>
                <Image
                  style={styles.productoImage}
                  source={{ uri: producto.uri }}
                />
                <Text variant="titleSmall">{producto.nombre}</Text>
              </View>
            ))}
            */