import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import { useAuthContext } from "../hooks/useAuthContext";

const Stack = createStackNavigator();

const NavigationHolder = () => {
  const [loading, setLoading] = useState(true); // Initialize loading state to true
  const { isAuthenticated } = useAuthContext();

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  useEffect(() => {
    delay(2000).then(() => setLoading(false)); // Set loading to false after 2000ms (2 seconds)
  }, []);

  const mainNavigation = () => {
    return isAuthenticated ? (
      <>
        <Stack.Screen name="Login" component={Login} />
        
      
      </>
    ) : (
      <Stack.Screen name="Login" component={Login} />
    );
  };

  return loading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  ) : (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {mainNavigation()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationHolder;
