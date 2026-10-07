// student number: 223011367
// home screen showing saved count

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useApp } from '../context/AppContext'

export default function HomeScreen({ navigation }) {
  const { savedServices, theme, toggleTheme } = useApp()

  const isDark = theme === 'dark'
  const bg = isDark ? '#1a1a2e' : '#f5f5f5'
  const cardBg = isDark ? '#2d2d4e' : 'white'
  const textColor = isDark ? 'white' : '#1a1a2e'

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <Text style={[styles.heading, { color: textColor }]}>UJ Campus Services</Text>
      <Text style={[styles.count, { color: textColor }]}>Saved Services: {savedServices.length}</Text>

      <TouchableOpacity style={[styles.btn, { backgroundColor: cardBg }]} onPress={() => navigation.navigate('Services')}>
        <Text style={[styles.btnText, { color: textColor }]}>Browse Services</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btn, { backgroundColor: cardBg }]} onPress={() => navigation.navigate('Saved')}>
        <Text style={[styles.btnText, { color: textColor }]}>View Saved Services</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.themeBtn} onPress={toggleTheme}>
        <Text style={styles.themeText}>Switch to {isDark ? 'Light' : 'Dark'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 80, paddingHorizontal: 20 },
  heading: { fontSize: 26, fontWeight: 'bold', marginBottom: 12 },
  count: { fontSize: 18, marginBottom: 24 },
  btn: { padding: 16, borderRadius: 10, marginBottom: 12, alignItems: 'center' },
  btnText: { fontSize: 16, fontWeight: 'bold' },
  themeBtn: {
    marginTop: 24,
    backgroundColor: '#f37021',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center'
  },
  themeText: { color: 'white', fontWeight: 'bold', fontSize: 15 }
})