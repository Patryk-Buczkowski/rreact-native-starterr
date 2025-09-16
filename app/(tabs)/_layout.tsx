import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function RootLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "purple",
          headerShadowVisible: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Begining",
            tabBarIcon: ({ color, focused }) => {
              return focused ? (
                <FontAwesome size={24} color={color} name="home" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              );
            },
          }}
        />

        <Tabs.Screen
          name="logout"
          options={{
            title: "Logout",
            tabBarIcon: ({ color, focused }) => {
              return focused ? (
                <FontAwesome size={24} color={color} name="sign-out" />
              ) : (
                <AntDesign name="logout" size={24} color={color} />
              );
            },
          }}
        />
      </Tabs>
    </>
  );
}
