import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ScreenContainer from "../components/layout/ScreenContainer";
import CustomInput from "../components/forms/CustomInput";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/forms/CustomButton";
import { useAuthContext } from "../hooks/useAuthContext";

const Register = () => {
  const navigation = useNavigation();
  const { handleRegister } = useAuthContext();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  useEffect(() => {
    setIsConfirmPasswordVisible(!!password);
  }, [password]);

  const handleSignUpPress = async () => {
    setIsLoading(true);
    try {
      await handleRegister(username, email, name, lastname, password, confirmPassword);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <FontAwesome5 name="angle-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.text}>It's free and only takes a minute</Text>
        </View>
        <View style={styles.containerBottom}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <CustomInput
              icon="user"
              text="Username"
              color="white"
              borderColor="white"
              onChangeText={(text) => setUsername(text)}
              value={username}
            />
            <CustomInput
              icon="mail-bulk"
              text="Email"
              color="white"
              borderColor="white"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <CustomInput
              icon="user"
              text="Name"
              color="white"
              borderColor="white"
              onChangeText={(text) => setName(text)}
              value={name}
            />
            <CustomInput
              icon="user"
              text="Lastname"
              color="white"
              borderColor="white"
              onChangeText={(text) => setLastname(text)}
              value={lastname}
            />
            <CustomInput
              icon="lock"
              text="Password"
              color="white"
              borderColor="white"
              onChangeText={(text) => {
                setPassword(text);
                setIsConfirmPasswordVisible(!!text);
              }}
              value={password}
              secureTextEntry
            />
            {isConfirmPasswordVisible && (
              <CustomInput
                icon="lock"
                text="Confirm Password"
                color="red"
                borderColor="white"
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
                secureTextEntry
              />
            )}
          </ScrollView>
          <View style={styles.buttonContainer}>
            <CustomButton
              text={isLoading ? "Signing Up..." : "Sign up"}
              onPress={handleSignUpPress}
            />
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.link}>
                <Text>Already have an account? </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerTop: {
    height: "30%",
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 10,
  },
  containerBottom: {
    height: "70%",
    width: "100%",
    paddingHorizontal: 30,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  text: {
    fontSize: 16,
    color: "white",
  },
  link: {
    fontSize: 12,
    color: "#ffcb13",
  },
  scrollContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Register;

/*

<Image
    source={{ uri: 'https://picsum.photos/500/600' }} // Replace with the path to your image
    style={styles.image} // Apply image styles
    resizeMode="cover" // Adjust as needed
/>
<View style={[styles.overlay, styles.containerTop]}>
  <Text style={styles.title}>Register</Text>
</View>

containerTop: {
    height: '30%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%', 
    height: '30%',  
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },


        */
