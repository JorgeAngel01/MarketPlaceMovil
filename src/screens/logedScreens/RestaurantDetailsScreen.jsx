import React from 'react'

import { Text } from 'react-native-paper'
import { StyleSheet } from 'react-native'


const RestaurantDetails = ({ route }) => {

  const { restaurant } = route.params

  console.log(restaurant)

  return (
    <>
    <Text variant='headlineLarge' style={styles.text}>RestaurantDetails</Text>
    <Text variant='headlineLarge' style={styles.text}>{restaurant.name}</Text>
    <Text variant='headlineLarge' style={styles.text}>{restaurant.rating}</Text>
    </>
  )
}

const styles = StyleSheet.create({
  text: {
    color: 'black'
  }
})

export default RestaurantDetails