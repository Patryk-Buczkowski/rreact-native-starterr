import { useRouter } from "expo-router";

import { Button } from "react-native-paper";
import { account } from "@/lib/appwrite";
import useAuthStore from "@/zustand/useAuthStore";

export default function LogoutScreen() {
  const router = useRouter();
  const { setUser } = useAuthStore.getState();

  const handleLogout = async () => {
    try {
      await account.deleteSession({sessionId: "current"});
      setUser(null);
      router.replace("/auth");
    } catch (error) {
      console.error("Błąd podczas wylogowywania:", error);
    }
  };

  return <Button mode="outlined" onPress={handleLogout}> Wyloguj się </Button>;
}
