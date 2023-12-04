import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import Login from "../screens/Login";
import Register from "../screens/Register";
import BottomTabsHome from "./BottomTabsHome";
import ProfileScreen from "../screens/logedScreens/profile/ProfileScreen";
import CartScreen from "../screens/logedScreens/cart/CartScreen";
import RestaurantDetails from "../screens/logedScreens/restaurant/RestaurantDetailsScreen";
import ProveedorDetails from "../screens/logedScreens/proveedor/ProveedorDetailsScreen";

// Hooks and Contexts
import { useAuthContext } from "../hooks/useAuthContext";
import { CartProvider } from "../context/CartContext";
import MyOrders from "../screens/logedScreens/orders/MyOrders";
import MyReviews from "../screens/logedScreens/reviews/MyReviews";
import Reviews from "../screens/logedScreens/reviews/Reviews";

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
            <Stack.Screen name="MyOrders" component={MyOrders} />
            <Stack.Screen name="MyReviews" component={MyReviews} />
            <Stack.Screen name="Reviews" component={Reviews} />
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
