// student number: 223011367
// form to add a task

import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'

export default function TaskForm() {
  const [title, setTitle] = useState('')
  const [moduleCode, setModuleCode] = useState('')
  const [priority, setPriority] = useState('Low')
  const [saving, setSaving] = useState(false)

  async function handleAdd() {
    // check inputs before sending to firebase
    if (title.trim() === '') {
      Alert.alert('Error', 'Please enter a task title')
      return
    }
    if (moduleCode.trim() === '') {
      Alert.alert('Error', 'Please enter a module code')
      return
    }

    setSaving(true)
    try {
      await addDoc(collection(db, 'tasks'), {
        title: title.trim(),
        moduleCode: moduleCode.trim(),
        priority: priority,
        completed: false,
        createdAt: serverTimestamp()
      })
      // only clear once save worked
      setTitle('')
      setModuleCode('')
      setPriority('Low')
    } catch (err) {
      Alert.alert('Error', 'Could not save task')
    }
    setSaving(false)
  }

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Task Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="e.g. Finish assignment 2"
      />

      <Text style={styles.label}>Module Code</Text>
      <TextInput
        style={styles.input}
        value={moduleCode}
        onChangeText={setModuleCode}
        placeholder="e.g. DSW02B1"
        autoCapitalize="characters"
      />

      <Text style={styles.label}>Priority</Text>
      <View style={styles.priorityRow}>
        {['Low', 'Medium', 'High'].map(level => (
          <TouchableOpacity
            key={level}
            style={[styles.priorityBtn, priority === level && styles.priorityActive]}
            onPress={() => setPriority(level)}
          >
            <Text style={[styles.priorityText, priority === level && styles.priorityTextActive]}>
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.addBtn, saving && styles.addBtnDisabled]}
        onPress={handleAdd}
        disabled={saving}
      >
        <Text style={styles.addBtnText}>{saving ? 'Saving...' : 'Add Task'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    marginTop: 8
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 6,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  priorityRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4
  },
  priorityBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center'
  },
  priorityActive: {
    backgroundColor: '#f37021',
    borderColor: '#f37021'
  },
  priorityText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 13
  },
  priorityTextActive: {
    color: 'white'
  },
  addBtn: {
    backgroundColor: '#f37021',
    padding: 14,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center'
  },
  addBtnDisabled: {
    opacity: 0.6
  },
  addBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
})