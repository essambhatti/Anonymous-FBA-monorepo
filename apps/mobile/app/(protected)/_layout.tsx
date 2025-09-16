import { Slot, useRouter } from "expo-router"
import { ActivityIndicator, View } from "react-native"
import { useAuth } from "../../context/AuthContext"

export default function ProtectedLayout() {
  const { authenticated, loading } = useAuth()
  const router = useRouter()

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    )
  }

  if (!authenticated) {
    router.replace("/signin")
    return null
  }

  return <Slot />
}
