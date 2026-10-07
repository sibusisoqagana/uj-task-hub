// student number: 223011367
// uj campus alert centre - repaired

import React, { useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import AlertList from '../components/AlertList'

const alerts = [
  { id: 'A1', title: 'Load shedding on APK campus', message: 'Stage 4 from 18:00 to 22:00', severity: 'High' },
  { id: 'A2', title: 'Library closing early', message: 'APB library closes at 16:00 today', severity: 'Medium' },
  { id: 'A3', title: 'WiFi maintenance', message: 'SWC WiFi will be down from 14:00 to 15:00', severity: 'Low' },
  { id: 'A4', title: 'Career fair postponed', message: 'The career fair has been moved to next week', severity: 'Medium' }
]

export default function AlertCentreScreen() {
  const [saved, setSaved] = useState([])

  function toggleSaved(id) {
    setSaved(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>UJ Campus Alert Centre</Text>
      <Text style={styles.count}>Saved alerts: {saved.length}</Text>
      <AlertList alerts={alerts} saved={saved} onToggle={toggleSaved} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#1a1a2e', paddingHorizontal: 16, marginBottom: 6 },
  count: { fontSize: 15, color: '#f37021', paddingHorizontal: 16, marginBottom: 12, fontWeight: 'bold' }
})