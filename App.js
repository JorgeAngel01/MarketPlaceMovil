import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { AppProvider } from "./src/context/AppContext";
import NavigationHolder from "./src/layout/NavigationHolder";
import { StatusBar as ReacStatus } from "react-native";
import { AuthProvider } from "./src/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { paperTheme } from "./src/theme/styles";
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { Theme } from "./src/theme/lightTheme";
import * as Location from "expo-location";
import { useState, useEffect } from "react";


const queryClient = new QueryClient();

export const theme = {
  ...DefaultTheme,
  colors: Theme.colors,
};

export default function App() {
  Location.setGoogleApiKey("AIzaSyBTGC06eNFYSdCSrrg7xwNMG0IkBiNmG7c");

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      // setLocation(currentLocation);
      console.log("Location:");
      console.log(currentLocation);
    };
    getPermissions();
  }, []);

  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <PaperProvider theme={theme}>
            <View style={styles.container}>
              <StatusBar style="auto" hidden />
              <NavigationHolder />
            </View>
          </PaperProvider>
        </AuthProvider>
      </QueryClientProvider>
    </AppProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    
    //paddingTop: ReacStatus.currentHeight,
  },
});
