// student number: 223011367
// shared state for services and theme

import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SERVICES_KEY = '@uj/services/saved'
const THEME_KEY = '@uj/preferences/theme'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [savedServices, setSavedServices] = useState([])
  const [theme, setTheme] = useState('light')
  const [loaded, setLoaded] = useState(false)

  // load saved data when app opens
  useEffect(() => {
    async function load() {
      try {
        const savedJson = await AsyncStorage.getItem(SERVICES_KEY)
        if (savedJson !== null) {
          setSavedServices(JSON.parse(savedJson))
        }
        const savedTheme = await AsyncStorage.getItem(THEME_KEY)
        if (savedTheme !== null) {
          setTheme(savedTheme)
        }
      } catch (err) {
        console.log('load failed', err)
      }
      setLoaded(true)
    }
    load()
  }, [])

  // save when services change
  useEffect(() => {
    if (!loaded) return
    async function save() {
      try {
        await AsyncStorage.setItem(SERVICES_KEY, JSON.stringify(savedServices))
      } catch (err) {
        console.log('save services failed', err)
      }
    }
    save()
  }, [savedServices, loaded])

  // save theme
  useEffect(() => {
    if (!loaded) return
    async function saveTheme() {
      try {
        await AsyncStorage.setItem(THEME_KEY, theme)
      } catch (err) {
        console.log('save theme failed', err)
      }
    }
    saveTheme()
  }, [theme, loaded])

  function addSavedService(service) {
    // avoid duplicates
    if (savedServices.find(s => s.id === service.id)) return
    setSavedServices([...savedServices, service])
  }

  function removeSavedService(id) {
    setSavedServices(savedServices.filter(s => s.id !== id))
  }

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <AppContext.Provider value={{
      savedServices,
      addSavedService,
      removeSavedService,
      theme,
      toggleTheme
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}