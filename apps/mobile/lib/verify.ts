import AsyncStorage from "@react-native-async-storage/async-storage"

export async function verify(code: string) {
    const username = await  AsyncStorage.getItem("username")

  try {
    const response = await fetch("https://anonymous-fba-monorepo-web.vercel.app/api/verify-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, code }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Login failed")
    }

    // 💾 Save token to AsyncStorage
    return data
  } catch (err: any) {
    console.error(err.message)
    throw new Error(err.message)
  }
}
