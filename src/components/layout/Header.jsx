import React from "react";
import { StyleSheet, View} from "react-native";
import {
  Card,
  IconButton,
  useTheme,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Header = ({object}) => {
    const navigation = useNavigation();
    const theme = useTheme();

  return (
    <Card style={[styles.card]}>
      <Card.Cover style={styles.cardCover} source={{ uri: object.banner }} />
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
  );
};

const styles = StyleSheet.create({
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
  });

export default Header;
