// student number: 223011367
// list of alerts

import React from 'react'
import { FlatList } from 'react-native'
import AlertCard from './AlertCard'

export default function AlertList({ alerts, saved, onToggle }) {
  return (
    <FlatList
      data={alerts}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <AlertCard
          item={item}
          saved={saved.includes(item.id)}
          onToggle={() => onToggle(item.id)}
        />
      )}
      contentContainerStyle={{ padding: 16 }}
    />
  )
}