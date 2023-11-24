import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ScreenContainer = ({ children, colors, locations }) => {
  return (
    <LinearGradient
      colors={colors || ['#191919', '#000000']}
      locations={locations || [0.3, 0.9]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {children}
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default ScreenContainer;
