import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = ({ text, bgColor = "#ffcb13", textColor = "black", shadowColor = "white", onPress, width = 200, height = 50 }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: bgColor, shadowColor: shadowColor, width: width, height: height }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginVertical: 10,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8, // for Android
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CustomButton;
