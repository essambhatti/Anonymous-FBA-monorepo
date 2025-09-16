import React, { useState } from "react"
import { View, TextInput, FlatList, Pressable } from "react-native"
import { Text } from "@/components/ui/text"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { RefreshCw, Copy } from "lucide-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import AsyncStorage from "@react-native-async-storage/async-storage"

// const username = await AsyncStorage.getItem("username")


export default function DashboardScreen() {
  const { top, bottom } = useSafeAreaInsets()

  // dummy state for now
  const [acceptMessages, setAcceptMessages] = useState(true)
  const [messages, setMessages] = useState([
    { _id: "1", title: "Feedback", content: "Loving the app!" },
    { _id: "2", title: "UI", content: "Dark mode looks awesome." },
  ])

  const profileUrl = `https://anonymous-fba-monorepo-web.vercel.app/u/`

  const copyToClipboard = () => {
    // implement Clipboard API
  }

  return (
    <View className="flex-1 bg-black" style={{ paddingTop: top }}>
      {/* Header */}
      <View className="px-6 pt-4">
        <Text className="text-3xl font-bold text-white drop-shadow-md">
          User Dashboard
        </Text>
        <View className="h-0.5 w-48 bg-gradient-to-r from-cyan-400 to-transparent mt-2" />
      </View>

      {/* Copy Link Card */}
      <Card className="mx-6 mt-6 p-4 bg-gray-900/70 border border-cyan-500/30 rounded-2xl">
        <Text className="mb-2 text-white font-semibold">Copy Your Unique Link</Text>
        <View className="flex-row items-center gap-2">
          <TextInput
            value={profileUrl}
            editable={false}
            className="flex-1 bg-gray-800 text-white rounded-md px-3 py-2 border border-cyan-500/50"
          />
          <Button
            className="bg-gradient-to-r from-cyan-500 to-purple-600 px-4 py-2 rounded-md"
            onPress={copyToClipboard}
          >
            <Text className="text-white"><Copy /> Copy</Text>
          </Button>
        </View>
      </Card>

      <Card className="mx-6 mt-6 p-4 bg-gray-900/70 border border-cyan-500/30 rounded-2xl flex-row items-center justify-between">
        <Text className="text-white">
          Accept Messages:{" "}
          <Text className="text-cyan-400 font-medium">
            {acceptMessages ? "On" : "Off"}
          </Text>
        </Text>
        <Switch
          checked={acceptMessages}
          onCheckedChange={() => setAcceptMessages(!acceptMessages)}
        />
      </Card>

=      <Button
        className="mx-6 mt-6 flex-row items-center justify-center rounded-md border border-cyan-500/50 bg-gray-800/80 py-2"
        onPress={() => console.log("Refresh messages")}
      >
        <RefreshCw size={18} color="#22d3ee" />
        <Text className="ml-2 text-cyan-400">Refresh Messages</Text>
      </Button>

      <FlatList
        className="mt-6 px-6"
        data={messages}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: bottom + 20 }}
        renderItem={({ item }) => (
          <Card className="mb-4 p-4 bg-gray-800 border border-cyan-500/30 rounded-2xl">
            <Text className="text-white font-semibold mb-2 border-b border-cyan-500/20 pb-1">
              {item.title}
            </Text>
            <Text className="text-gray-200">{item.content}</Text>
            <Pressable
              className="mt-3 rounded-md bg-red-500/20 p-2"
              onPress={() =>
                setMessages(messages.filter((m) => m._id !== item._id))
              }
            >
              <Text className="text-red-400 text-center">Delete</Text>
            </Pressable>
          </Card>
        )}
        ListEmptyComponent={
          <Card className="p-8 bg-gray-900/70 border border-cyan-500/30 rounded-2xl items-center">
            <Text className="text-lg text-white mb-2">
              No messages to display
            </Text>
            <Text className="text-gray-400">
              Your messages will appear here once you start receiving feedback.
            </Text>
          </Card>
        }
      />
    </View>
  )
}
