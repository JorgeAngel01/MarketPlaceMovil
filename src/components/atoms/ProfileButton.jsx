import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

const ProfileButton = ({ onPress, imageUrl, size }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { width: size, height: size }]}
      onPress={onPress}
    >
      <Image
        source={{ uri: imageUrl }}
        style={[
          styles.profileImage,
          {
            width: size,
            height: size,
          },
        ]}
      />
    </TouchableOpacity>
  );
};

ProfileButton.defaultProps = {
  size: 30,
};

const styles = StyleSheet.create({
  button: {
    width: 30,
    height: 30,
    borderRadius: 40,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 35,
  },
});

export default ProfileButton;
