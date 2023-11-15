import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useAuthContext } from "../../hooks/useAuthContext";

const Home = () => {
  const { handleLogout } = useAuthContext();

  return (
    <TouchableOpacity onPress={() => handleLogout()}>
      <Text>Logout</Text>
    </TouchableOpacity>
  );
};

export default Home;
