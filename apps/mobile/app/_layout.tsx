import { Stack } from "expo-router"
import "../global.css"
import { AuthProvider } from "@/context/AuthContext"

const RootLayout = () => {
  return (
    <AuthProvider>
    <Stack screenOptions = {{headerShown : false}}/>
    </AuthProvider>
    

  )
}

export default RootLayout