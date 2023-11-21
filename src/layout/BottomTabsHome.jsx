import React from "react";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import HomeScreen from "../screens/logedScreens/HomeScreen";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

import { View } from "react-native";
import { THEME } from "../theme/styles";
import ProfileScreen from "../screens/logedScreens/ProfileScreen";


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
          name="Home2"
          component={ProfileScreen}
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
          name="Home3"
          component={ProfileScreen}
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
      </Tab.Navigator>
  );
};

export default BottomTabsHome;
