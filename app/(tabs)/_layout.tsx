import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import useTasksStore from "@/zustand/useTasksStore";

export default function RootLayout() {
  const tasks = useTasksStore((state) => state.tasks);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#E0E7FF",   // jasny kolor aktywnej zakładki
        tabBarInactiveTintColor: "#A5B4FC", // jaśniejszy niebieski dla nieaktywnej
        tabBarStyle: { backgroundColor: "#000428" }, // ciemne tło tabbaru
        headerShadowVisible: false,
        headerStyle: { backgroundColor: "#4D5DFA" },
        headerTintColor: "#E0E7FF",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: `Today tasks ${tasks.length} elem`,
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome size={24} color={color} name="home" />
          ),
        }}
      />

      <Tabs.Screen
        name="createTask"
        options={{
          title: "Create tasks",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign size={24} color={color} name="pluscircleo" />
          ),
        }}
      />

      <Tabs.Screen
        name="logout"
        options={{
          title: "Logout",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign size={24} color={color} name="logout" />
          ),
        }}
      />
    </Tabs>
  );
}
