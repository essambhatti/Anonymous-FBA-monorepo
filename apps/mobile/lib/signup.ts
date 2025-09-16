import AsyncStorage from "@react-native-async-storage/async-storage"

export async function Signup(username: string, email: string, password: string) {
  try {
    const response = await fetch("https://anonymous-fba-monorepo-web.vercel.app/api/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Signup failed")
    }

    await AsyncStorage.setItem("username", username)


    return data
  } catch (err: any) {
    throw new Error(err.message)
  }
}

