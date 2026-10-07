// student number: 223011367
// one task card

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

export default function TaskCard({ task }) {
  async function toggleComplete() {
    try {
      await updateDoc(doc(db, 'tasks', task.id), {
        completed: !task.completed
      })
    } catch (err) {
      console.log('toggle failed', err)
    }
  }

  async function handleDelete() {
    try {
      await deleteDoc(doc(db, 'tasks', task.id))
    } catch (err) {
      console.log('delete failed', err)
    }
  }

  // colour by priority level
  function getPriorityColor() {
    if (task.priority === 'High') return '#e74c3c'
    if (task.priority === 'Medium') return '#f39c12'
    return '#3498db'
  }

  return (
    <View style={[styles.card, task.completed && styles.cardCompleted]}>
      <View style={styles.topRow}>
        <Text style={[styles.title, task.completed && styles.titleCompleted]}>
          {task.title}
        </Text>
        <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor() }]}>
          <Text style={styles.priorityText}>{task.priority}</Text>
        </View>
      </View>

      <Text style={styles.module}>{task.moduleCode}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.toggleBtn} onPress={toggleComplete}>
          <Text style={styles.toggleText}>
            {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#f37021'
  },
  cardCompleted: {
    backgroundColor: '#f0f0f0',
    borderLeftColor: '#4CAF50',
    opacity: 0.85
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a2e',
    flex: 1,
    marginRight: 8
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: '#888'
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12
  },
  priorityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  },
  module: {
    fontSize: 13,
    color: '#666',
    marginTop: 4
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12
  },
  toggleBtn: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center'
  },
  toggleText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold'
  },
  deleteBtn: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center'
  },
  deleteText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold'
  }
})