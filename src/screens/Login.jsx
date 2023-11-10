import React from 'react'
import { StyleSheet, Text, View } from 'react-native' 

const Login = () => {
  return (
    <View style={styles.container}>
      <Text
      style={styles.text}
      >Login</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  text: {
    color: 'white'
  }
})

export default Login