import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme, ActivityIndicator } from "react-native-paper";

const LoadingScreen = () => {
    const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: "center",
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <ActivityIndicator size={"large"} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
    },
    }); 


export default LoadingScreen;
