import React from "react";
import {
  FlatList,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Card, Divider, Text, Surface } from "react-native-paper";
import { useTheme } from "react-native-paper";

const ProductGallery = ({ data, onPress }) => {
  const renderItem = ({ item }) => {

    return(
        <TouchableOpacity
            style={[styles.touchable]}
            onPress={() => onPress(item)}
        >
            <Image
            source={{ uri: item.image }}
            style={[styles.image]}
            />
            <Surface style={styles.surface} elevation={5}>
            <Text variant="bodyMedium" style={{ color: "white" }}>
               MX${parseFloat(item.precio).toFixed(2)}
            </Text>
            </Surface>
        </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={(props) => renderItem({ ...props, data })}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
    },
    touchable:{
        width: "48%",
        height: 150,
        borderRadius: 10,
        overflow: "hidden",
        margin: "1%",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    image:{
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    surface: {
        borderRadius: 10,
        position: "absolute",
        bottom: 10,
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.7)",
    },
});
export default ProductGallery;
