import AsyncStorage from "@react-native-async-storage/async-storage"

export async function login(identifier: string, password: string) {
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Login failed")
    }

    // 💾 Save token to AsyncStorage
    await AsyncStorage.setItem("token", data.token)

    return data
  } catch (err: any) {
    throw new Error(err.message)
  }
}
