// student number: 223011367
// main app

import React from 'react'
import { AppProvider } from './context/AppContext'
import AppNavigator from './navigation/AppNavigator'

export default function App() {
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  )
}