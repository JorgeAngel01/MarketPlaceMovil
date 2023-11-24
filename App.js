import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { AppProvider } from "./src/context/AppContext";
import NavigationHolder from "./src/layout/NavigationHolder";
import { StatusBar as ReacStatus } from "react-native";
import { AuthProvider } from "./src/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <View style={styles.container}>
            <StatusBar style="auto" hidden />
            <NavigationHolder />
          </View>
        </AuthProvider>
      </QueryClientProvider>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    //paddingTop: ReacStatus.currentHeight,
  },
});
