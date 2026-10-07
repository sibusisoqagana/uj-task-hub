// student number: 223011367
// decides which screen to show based on auth state

import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/config'
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen'

export default function AuthGate() {
  const [user, setUser] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // listen for auth changes
    const unsub = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setChecking(false)
    })

    return () => unsub()
  }, [])

  if (checking) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f37021" />
        <Text style={styles.text}>Checking session...</Text>
      </View>
    )
  }

  return user ? <ProfileScreen /> : <LoginScreen />
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  text: {
    marginTop: 10,
    color: '#555'
  }
})