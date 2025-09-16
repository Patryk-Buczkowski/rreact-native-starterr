import { Stack, useRouter } from "expo-router";
import useAuthStore from "@/zustand/useAuthStore";
import { useEffect } from "react";

export default function RootLayout() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/tabs");
    }
  }, [router, user]);

  return (
    <Stack>
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="tabs" options={{ headerShown: false }} />
    </Stack>
  );
}
