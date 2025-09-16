import AsyncStorage from "@react-native-async-storage/async-storage"

export async function logout() {
  try {
    await AsyncStorage.removeItem("token")   // clear JWT
    await AsyncStorage.removeItem("username") // optional if stored
  } catch (err) {
    console.error("Error during logout", err)
  }
}
