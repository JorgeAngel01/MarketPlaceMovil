import React, { useState } from "react";
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ScreenContainer from "../components/layout/ScreenContainer";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../hooks/useAuthContext";
import SvgComponent from "../../assets/images/SvgComponent";
import CustomInput from "../components/forms/CustomInput";
import CustomButton from "../components/forms/CustomButton";

const Login = () => {
  const { handleLogin } = useAuthContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <SvgComponent color="white" width={100} height={100} />
          <View style={styles.form}>
            <CustomInput
              icon="user"
              text="Username"
              color="white"
              borderColor="white"
              onChangeText={(text) => setUsername(text)}
              value={username}
            />
            <CustomInput
              icon="lock"
              text="Password"
              color="white"
              borderColor="white"
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry
            />
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton text="Login" onPress={() => handleLogin(username, password)} />
            <TouchableOpacity onPress={() => navigation.navigate("")}>
              <Text style={styles.link}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomLinkContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("")}>
            <Text style={styles.link}>
              <Text>Don't have an account? </Text>
              <Text style={{ color: "#ffcb13", fontWeight: "bold" }}>
                Create One
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerTop: {
    height: "80%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "80%",
    marginTop: 70,
    marginBottom: 30,
  },
  buttonContainer: {
    alignItems: "center",
  },
  bottomLinkContainer: {
    marginBottom: 20,
  },
  link: {
    color: "white",
    textAlign: "center",
  },
});

export default Login;
