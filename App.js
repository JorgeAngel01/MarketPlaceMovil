import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { AppProvider } from "./src/context/AppContext";
import NavigationHolder from "./src/layout/NavigationHolder";
import { StatusBar as ReacStatus } from "react-native";
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <View style={styles.container}>
          <StatusBar style="auto" hidden />
          <NavigationHolder />
        </View>
      </AuthProvider>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    //paddingTop: ReacStatus.currentHeight,
  },
});
