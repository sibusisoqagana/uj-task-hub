// student number: 223011367
// uj student task hub

import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from './firebase/config'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    // real time listener for tasks collection
    const q = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(
      q,
      snapshot => {
        const list = []
        snapshot.forEach(doc => {
          list.push({ id: doc.id, ...doc.data() })
        })
        setTasks(list)
        setLoading(false)
      },
      err => {
        console.log('listener error', err)
        setError(true)
        setLoading(false)
      }
    )

    // cleanup when component unmounts
    return () => unsubscribe()
  }, [])

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>UJ Student Task Hub</Text>
      <TaskForm />
      <TaskList tasks={tasks} loading={loading} error={error} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  content: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 40
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 16
  }
})