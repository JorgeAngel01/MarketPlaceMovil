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

const data = [
  {
    id: 1,
    uri: "https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00750100802351L.jpg",
  },
  {
    id: 2,
    uri: "https://picsum.photos/700",
  },
  {
    id: 3,
    uri: "https://i.pinimg.com/originals/4e/0c/45/4e0c45d1c83b248e597b71af0ecceaed.png",
  },
  {
    id: 4,
    uri: "https://randomwordgenerator.com/img/picture-generator/52e5d6444f5aa514f1dc8460962e33791c3ad6e04e5074417c2f73d49e4acd_640.jpg",
  },
  {
    id: 5,
    uri: "https://pixabay.com/get/g81073a31aff62555d6317e75340a1b9aab60f0adc1ca36e095684f849a17da2686f4aa62abf14aeacca689817fbd428b_1280.jpg",
  },
  {
    id: 6,
    uri: "https://pixabay.com/get/g2c77f006e51bcbadc0f68ddf8923c988ef9e7f913976a02f4124e8b24550f67b3723147fabe8ba4a750c01d5a8308d84_1280.jpg",
  },
  {
    id: 7,
    uri: "https://randomwordgenerator.com/img/picture-generator/57e2dd474e50ab14f1dc8460962e33791c3ad6e04e507441722a72dc9148c3_640.jpg",
  },
];

const ImageGallery = ({ height, onPress }) => {
  const renderItem = ({ item, index, data }) => {
    let imagewidth = "100%";

    if (index % 3 === 1) {
      imagewidth = "48%"; // Half of available width
    } else if (index % 3 === 2) {
      return null; // Skip rendering for index 2
    }

    let nextItemIndex = index + 1;
    if (nextItemIndex >= data.length) {
      return (
        <View style={[styles.imageContainer, { height: height }]} key={item.id}>
          <TouchableOpacity
            style={[styles.touchable, { width: imagewidth }]}
            onPress={() => onPress(item)}
          >
            <Image
              source={{ uri: item.uri }}
              style={[styles.image, { width: imagewidth }]}
            />
          </TouchableOpacity>
        </View>
      );
    }

    let nextItem = data[nextItemIndex];

    return (
      <View style={[styles.imageContainer, { height: height }]} key={item.id}>
        <View style={{ flexDirection: "row", gap: 15, height: "100%" }}>
          <TouchableOpacity
            style={[styles.touchable, { width: imagewidth }]}
            onPress={() => onPress(item)}
          >
            <Image
              source={{ uri: item.uri }}
              style={[styles.image]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.touchable, { width: imagewidth }]}
            onPress={() => onPress(nextItem)}
          >
            <Image
              source={{ uri: nextItem.uri }}
              style={[styles.image]}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={(props) => renderItem({ ...props, data })}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    marginBottom: 20,
  },
  image: {
    height: "100%",
    borderRadius: 10,
    padding: 10,
  },
  touchable: {
    height: "100%",
  },
  imageContainer: {
    width: "100%",
    marginTop: 10,
  },
});

export default ImageGallery;
