// student number: 223011367
// navigation stack

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import ServicesScreen from '../screens/ServicesScreen'
import SavedServicesScreen from '../screens/SavedServicesScreen'

const Stack = createNativeStackNavigator()

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="Services" component={ServicesScreen} options={{ title: 'Services' }} />
        <Stack.Screen name="Saved" component={SavedServicesScreen} options={{ title: 'Saved Services' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}