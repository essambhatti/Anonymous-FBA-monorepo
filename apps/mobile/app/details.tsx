import { View, Text } from 'react-native'
import React from 'react'
import {Link} from "expo-router"


const Details= () => {
  return (
    <View>
      <Text>Details Page</Text>
      <Link href="/">Go to Home page</Link>
    </View>
  )
}

export default Details