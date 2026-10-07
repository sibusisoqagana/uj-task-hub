// student number: 223011367
// shows all tasks from firestore

import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import TaskCard from './TaskCard'

export default function TaskList({ tasks, loading, error }) {
  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>Loading tasks...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Could not load tasks. Check your connection.</Text>
      </View>
    )
  }

  if (tasks.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No tasks yet</Text>
        <Text style={styles.emptySubtext}>Add your first task above</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <TaskCard task={item} />}
      contentContainerStyle={styles.list}
    />
  )
}

const styles = StyleSheet.create({
  center: {
    padding: 40,
    alignItems: 'center'
  },
  list: {
    paddingBottom: 40
  },
  loadingText: {
    fontSize: 16,
    color: '#555'
  },
  errorText: {
    fontSize: 15,
    color: '#e74c3c',
    textAlign: 'center'
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888'
  },
  emptySubtext: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 4
  }
})