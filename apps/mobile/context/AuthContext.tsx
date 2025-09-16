// app/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

type AuthContextType = {
  authenticated: boolean
  loading: boolean
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  loading: true,
  logout: async () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("token")
        setAuthenticated(!!token)
      } finally {
        setLoading(false)
      }
    }
    loadAuth()
  }, [])

  const logout = async () => {
    await AsyncStorage.removeItem("token")
    setAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ authenticated, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
