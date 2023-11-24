import React from "react";
import { View } from "react-native";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

// Screens
import HomeScreen from "../screens/logedScreens/bottomTabs/HomeScreen";
import ProveedorScreen from "../screens/logedScreens/bottomTabs/ProveedorScreen";
import RestaurantsScreen from "../screens/logedScreens/bottomTabs/RestaurantsScreen";
import SearchScreen from "../screens/logedScreens/bottomTabs/SearchScreen";

// Theme
import { THEME } from "../theme/styles";

const Tab = createMaterialBottomTabNavigator();

const BottomTabsHome = () => {
  return (
      <Tab.Navigator
        initialRouteName="Home"
        backBehavior="initialRoute"
        labeled={false}
        activeColor={THEME.COLORS.YELLOW.JONQUIL}
        inactiveColor={THEME.COLORS.WHITE.WHITE}
        barStyle={{
          height: 70,
          backgroundColor: THEME.COLORS.BLACK.EERIE,
        }}
        theme={{ colors: { secondaryContainer: "transparent" } }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <FontAwesome5
                  name="home"
                  size={24}
                  color={
                    focused
                      ? THEME.COLORS.YELLOW.JONQUIL
                      : THEME.COLORS.WHITE.WHITE
                  }
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Grocery"
          component={ProveedorScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <FontAwesome5
                  name="shopping-basket"
                  size={24}
                  color={
                    focused
                      ? THEME.COLORS.YELLOW.JONQUIL
                      : THEME.COLORS.WHITE.WHITE
                  }
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Restaraunts"
          component={RestaurantsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Ionicons
                  name="restaurant"
                  size={24}
                  color={
                    focused
                      ? THEME.COLORS.YELLOW.JONQUIL
                      : THEME.COLORS.WHITE.WHITE
                  }
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={
            {
              tabBarIcon: ({ focused }) => (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <Ionicons
                    name="search"
                    size={24}
                    color={
                      focused
                        ? THEME.COLORS.YELLOW.JONQUIL
                        : THEME.COLORS.WHITE.WHITE
                    }
                  />
                </View>
              ), 
            }
          }
        />
      </Tab.Navigator>
  );
};

export default BottomTabsHome;
