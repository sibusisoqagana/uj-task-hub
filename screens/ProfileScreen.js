// student number: 223011367
// protected profile screen

import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { doc, getDoc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { auth, db } from '../firebase/config'

export default function ProfileScreen() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const uid = auth.currentUser.uid
        const snap = await getDoc(doc(db, 'users', uid))
        if (snap.exists()) {
          setProfile(snap.data())
        }
      } catch (err) {
        console.log('load profile failed', err)
      }
      setLoading(false)
    }
    load()
  }, [])

  async function handleLogout() {
    try {
      await signOut(auth)
    } catch (err) {
      console.log('logout failed', err)
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f37021" />
        <Text style={styles.loading}>Loading profile...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{profile?.studentName || 'Unknown'}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{profile?.email || 'Unknown'}</Text>

        <Text style={styles.label}>UID</Text>
        <Text style={styles.valueSmall}>{auth.currentUser.uid}</Text>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 60,
    paddingHorizontal: 16
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading: {
    marginTop: 10,
    color: '#555'
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 16
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10
  },
  label: {
    fontSize: 13,
    color: '#888',
    marginTop: 8
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginTop: 2
  },
  valueSmall: {
    fontSize: 12,
    color: '#666',
    marginTop: 2
  },
  logoutBtn: {
    backgroundColor: '#e74c3c',
    padding: 14,
    borderRadius: 8,
    marginTop: 24,
    alignItems: 'center'
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
})