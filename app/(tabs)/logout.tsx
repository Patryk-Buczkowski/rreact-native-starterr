import { useRouter } from "expo-router";
import { Button } from "react-native-paper";
import { account } from "@/lib/appwrite";
import useAuthStore from "@/zustand/useAuthStore";
import { View, StyleSheet } from "react-native";

export default function LogoutScreen() {
  const router = useRouter();
  const { setUser } = useAuthStore.getState();

  const handleLogout = async () => {
    try {
      await account.deleteSession({ sessionId: "current" });
      setUser(null);
      router.replace("/(auth)");
    } catch (error) {
      console.error("Błąd podczas wylogowywania:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        buttonColor="#4D5DFA"
        textColor="#E0E7FF"
        onPress={handleLogout}
        style={styles.button}
      >
        Wyloguj się
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000428",
    padding: 16,
  },
  button: {
    width: "100%",
    borderRadius: 8,
  },
});
