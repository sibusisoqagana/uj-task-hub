// student number: 223011367
// one alert card with fade animation

import React, { useRef, useEffect } from 'react'
import { View, Text, Pressable, Animated, StyleSheet, Easing } from 'react-native'

export default function AlertCard({ item, saved, onToggle }) {
  // keep the Animated value stable across renders
  const fade = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(20)).current

  useEffect(() => {
    // run the entrance animation once on mount
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true
      })
    ]).start()
  }, []) // empty deps so it doesn't restart

  return (
    <Animated.View
      style={[
        styles.card,
        saved && styles.cardSaved,
        { opacity: fade, transform: [{ translateY }] }
      ]}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.severity}>{item.severity} priority</Text>

      <Pressable
        style={[styles.btn, saved && styles.btnSaved]}
        onPress={onToggle}
      >
        <Text style={styles.btnText}>{saved ? 'Saved ✓' : 'Save'}</Text>
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#f37021'
  },
  cardSaved: {
    backgroundColor: '#e8f5e9',
    borderLeftColor: '#4CAF50'
  },
  title: { fontSize: 16, fontWeight: 'bold', color: '#1a1a2e' },
  message: { fontSize: 14, color: '#555', marginTop: 4 },
  severity: { fontSize: 12, color: '#888', marginTop: 4, textTransform: 'uppercase' },
  btn: {
    marginTop: 12,
    backgroundColor: '#1a1a2e',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center'
  },
  btnSaved: { backgroundColor: '#4CAF50' },
  btnText: { color: 'white', fontWeight: 'bold' }
})