// student number: 223011367
// shows only saved services

import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useApp } from '../context/AppContext'

export default function SavedServicesScreen() {
  const { savedServices, theme } = useApp()

  const isDark = theme === 'dark'
  const bg = isDark ? '#1a1a2e' : '#f5f5f5'
  const cardBg = isDark ? '#2d2d4e' : 'white'
  const textColor = isDark ? 'white' : '#1a1a2e'

  if (savedServices.length === 0) {
    return (
      <View style={[styles.center, { backgroundColor: bg }]}>
        <Text style={[styles.empty, { color: textColor }]}>No saved services yet</Text>
      </View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <FlatList
        data={savedServices}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: cardBg }]}>
            <Text style={[styles.name, { color: textColor }]}>{item.name}</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: 16 },
  card: { padding: 16, borderRadius: 10, marginBottom: 12 },
  name: { fontSize: 16, fontWeight: 'bold' },
  empty: { fontSize: 18, fontWeight: 'bold' }
})