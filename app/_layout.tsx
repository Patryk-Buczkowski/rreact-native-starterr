import { Stack, useRouter } from "expo-router";
import useAuthStore from "@/zustand/useAuthStore";
import { useEffect } from "react";
//odczyt env z typami
import Constants from "expo-constants";
import { AppConfigExtra } from "@/env";

const extra = Constants.expoConfig?.extra as AppConfigExtra

console.log('constans env: ', extra.APPWRITE_ENDPOINT);

export default function RootLayout() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/(tabs)");
    }
  }, [router, user]);

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
