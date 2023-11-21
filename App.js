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
import { lightTheme } from "./src/theme/lightTheme";


const queryClient = new QueryClient();

export const theme = {
  ...DefaultTheme,
  colors: lightTheme.colors,
};

export default function App() {
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
