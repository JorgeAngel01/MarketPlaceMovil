import React from 'react'
import { Text } from 'react-native-paper'
import { StyleSheet } from 'react-native'

const CartScreen = () => {

  return (
    <Text variant='headlineLarge' style={styles.text}>CartScreen</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    color: 'black'
  }
})

export default CartScreen