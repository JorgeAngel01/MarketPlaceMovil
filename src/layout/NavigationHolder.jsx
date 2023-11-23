import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import { useAuthContext } from "../hooks/useAuthContext";
import Register from "../screens/Register";
import BottomTabsHome from "./BottomTabsHome";
import ProfileScreen from "../screens/logedScreens/ProfileScreen";
import { CartProvider } from "../context/CartContext";
import CartScreen from "../screens/logedScreens/CartScreen";
import RestaurantDetails from "../screens/logedScreens/RestaurantDetailsScreen";
import ProveedorDetails from "../screens/logedScreens/ProveedorDetailsScreen";

const Stack = createStackNavigator();

const NavigationHolder = () => {
  const [loading, setLoading] = useState(true); // Initialize loading state to true
  const { isAuthenticated } = useAuthContext();

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  useEffect(() => {
    delay(1000).then(() => setLoading(false)); // Set loading to false after 2000ms (2 seconds)
  }, []);

  const mainNavigation = () => {
    return isAuthenticated ? (
      <>
        <CartProvider>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="BottomTabs" component={BottomTabsHome} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
            <Stack.Screen name="ProveedorDetails" component={ProveedorDetails} />
          </Stack.Navigator>
        </CartProvider>
      </>
    ) : (
      <>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </>
    );
  };

  return loading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  ) : (
    <NavigationContainer>{mainNavigation()}</NavigationContainer>
  );
};

export default NavigationHolder;

/*
<Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        
        {mainNavigation()}
       
      </Stack.Navigator>
      
      */
