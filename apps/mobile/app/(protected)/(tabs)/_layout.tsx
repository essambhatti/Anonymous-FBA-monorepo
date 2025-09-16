// app/(protected)/(tabs)/_layout.tsx

import { Text } from "@/components/ui/text"
import { Tabs } from "expo-router"
import { Home, User } from "lucide-react-native"
import { View, StyleSheet } from "react-native"

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, 
        tabBarStyle: [
          styles.tabBar,
          {
            position: "absolute",
            left: 40,
            right: 40,
            bottom: 10,
            borderRadius: 20,
            backgroundColor: "#111", 
            borderTopWidth: 0,
            shadowColor: "#06b6d4",
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 5,
          },
        ],
        tabBarActiveTintColor: "#06b6d4", // cyan active
        tabBarInactiveTintColor: "#9ca3af", // gray inactive
        tabBarIconStyle: { marginTop: 5 }, // push icon slightly down
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => <><Home size={20} color={color} /><Text className="text-[10px] ">Home</Text></>, // small icons
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <><User size={20} color={color} /><Text className="text-[10px] ">Profile</Text></>, // small icons,
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    height: 50,
    paddingHorizontal: 10,
  },
})
