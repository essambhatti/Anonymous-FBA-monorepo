import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

const Layout = () => {
  const isAuth = false
  if (!isAuth) {
    return <Redirect href="/(auth)/signin"/>
  }
  return (
    <View>
      <Text>Layout</Text>
    </View>
  )
}

export default Layout