import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AppProvider } from './src/context/AppContext';
import NavigationHolder from './src/layout/NavigationHolder';
import { StatusBar as ReacStatus } from 'react-native';


export default function App() {
  return (
    <AppProvider>
      <View style={styles.container}>
        <StatusBar style="auto" hidden />
        <NavigationHolder />
      </View>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: ReacStatus.currentHeight,
  },
});
