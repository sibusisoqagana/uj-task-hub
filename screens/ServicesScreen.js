// student number: 223011367
// services list

import React from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { useApp } from '../context/AppContext'

const services = [
  { id: '1', name: 'Library Support' },
  { id: '2', name: 'ICT Helpdesk' },
  { id: '3', name: 'Academic Consultation' },
  { id: '4', name: 'Career Services' }
]

export default function ServicesScreen() {
  const { savedServices, addSavedService, removeSavedService, theme } = useApp()

  const isDark = theme === 'dark'
  const bg = isDark ? '#1a1a2e' : '#f5f5f5'
  const cardBg = isDark ? '#2d2d4e' : 'white'
  const textColor = isDark ? 'white' : '#1a1a2e'

  function isSaved(id) {
    return savedServices.some(s => s.id === id)
  }

  function renderItem({ item }) {
    const saved = isSaved(item.id)
    return (
      <View style={[styles.card, { backgroundColor: cardBg }]}>
        <Text style={[styles.name, { color: textColor }]}>{item.name}</Text>
        <TouchableOpacity
          style={[styles.btn, saved && styles.btnSaved]}
          onPress={() => saved ? removeSavedService(item.id) : addSavedService(item)}
        >
          <Text style={styles.btnText}>{saved ? 'Remove' : 'Save'}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <FlatList
        data={services}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 16 },
  card: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  name: { fontSize: 16, fontWeight: 'bold', flex: 1 },
  btn: {
    backgroundColor: '#f37021',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6
  },
  btnSaved: { backgroundColor: '#e74c3c' },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 13 }
})