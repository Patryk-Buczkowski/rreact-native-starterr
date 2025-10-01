import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
          title: "Log in",
          headerStyle: { backgroundColor: "#4D5DFA" },
          headerTintColor: "#E0E7FF",
        }} />
    </Stack>
  );
}
