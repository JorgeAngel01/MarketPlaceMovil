import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Text } from 'react-native-paper'

const ProfileScreen = () => {
    const { handleLogout } = useAuthContext()

    return (
      <>
      <Text variant='headlineLarge' style={styles.text}>ProfilePicture</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text variant='headlineLarge' style={styles.text}>Logout</Text>
      </TouchableOpacity>
      </>
    )
  }
  
  const styles = StyleSheet.create({
    text: {
      color: 'black'
    }
  })
  
export default ProfileScreen