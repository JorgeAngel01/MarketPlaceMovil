import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"; 

const CustomInput = ({ icon, text, color, borderColor, onChangeText, value, ...props }) => {
  return (
    <View style={[styles.inputContainer, { borderBottomColor: borderColor }]}>
      {icon && <FontAwesome5 name={icon} size={20} color={color} style={styles.icon} />}
      <TextInput
        placeholder={text}
        placeholderTextColor={color}
        style={[styles.input, { color: color }]}
        onChangeText={onChangeText}
        value={value}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingVertical: 5,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 5,
  },
});

export default CustomInput;
