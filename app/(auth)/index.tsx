import { account } from "@/lib/appwrite";
import { handleGoogleSignIn } from "@/lib/google";
import useAuthStore from "@/zustand/useAuthStore";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AppwriteException, ID } from "react-native-appwrite";
import { Button, Text, TextInput, useTheme, Surface } from "react-native-paper";

export default function AuthScreen() {
  const { signData, handleInputs, error, setError, setUser } = useAuthStore();
  const theme = useTheme();
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  const handleSwitchMode = () => setIsSignUp((prev) => !prev);

  const handleSingUp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!signData.email || !signData.password) {
      setError("Fill both inputs 😅");
      return;
    } else if (signData.password.length < 8) {
      setError("Password must have 8 digits length");
      return;
    } else if (!emailRegex.test(signData.email)) {
      setError("Wrong email format ❕❗❕❗");
      return;
    }
    setError("");

    try {
      await account.create(ID.unique(), signData.email, signData.password);
    } catch (error) {
      if (error instanceof AppwriteException && error.code === 409) {
        console.error("Błąd: Ten adres e-mail jest już w użyciu.");
        return setError("E-mail jest już zajęty.");
      }
      setError("Something went wrong with authentication");
      console.error(error);
    }
  };

  const handleSingIn = async () => {
    try {
      const promise = await account.createEmailPasswordSession({
        email: signData.email,
        password: signData.password,
      });

      setUser({ $id: promise.userId, email: promise.providerUid });
      const currentUser = await account.get();
      setUser(currentUser);
    } catch (error) {
      console.error("Error signIn", error);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await account.getSession({ sessionId: "current" });
        if (session) {
          const user = await account.get();
          setUser(user);
        }
      } catch (error) {
        console.log("No active session", error);
      }
    };
    checkSession();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Surface style={styles.card} elevation={4}>
          <Text variant="headlineMedium" style={styles.title}>
            {isSignUp ? "Welcome back" : "Create account"}
          </Text>

          <TextInput
            label="Email"
            onChangeText={(value) => handleInputs(value, "email")}
            placeholder="example@gmail.com"
            placeholderTextColor="#A5B4FC"
            style={styles.textInput}
            autoCapitalize="none"
            keyboardType="email-address"
            mode="outlined"
            textColor="#E0E7FF"
            activeOutlineColor="#4D5DFA"
            outlineColor="#1E40AF"
          />

          <TextInput
            label="Password"
            onChangeText={(value) => handleInputs(value, "password")}
            placeholder="Type Your password"
            placeholderTextColor="#A5B4FC"
            style={styles.textInput}
            secureTextEntry
            mode="outlined"
            textColor="#E0E7FF"
            activeOutlineColor="#4D5DFA"
            outlineColor="#1E40AF"
          />

          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}

          <Button
            onPress={isSignUp ? handleSingIn : handleSingUp}
            textColor="#000428"
            buttonColor="#4D5DFA"
            style={styles.buttonSubmit}
            mode="contained"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </Button>

          <Button
            onPress={handleSwitchMode}
            mode="text"
            textColor="#E0E7FF"
          >
            {isSignUp
              ? "Do not have an account? Sign up 😁"
              : "Do You already have an account? Sign in 😎"}
          </Button>

          <TouchableOpacity
            onPress={handleGoogleSignIn}
            style={styles.buttonGoogle}
          >
            <AntDesign name="google" size={24} color="#000428" />
            <Text style={{ color: "#000428" }}>Zaloguj przez Google</Text>
          </TouchableOpacity>
        </Surface>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "#000428",
  },
  card: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#000BB0",
    borderWidth: 1,
    borderColor: "#4D5DFA",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
    color: "#E0E7FF",
  },
  textInput: {
    marginBottom: 12,
    borderRadius: 8,
  },
  errorText: {
    color: "#F87171",
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  buttonSubmit: {
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  buttonGoogle: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    flexDirection: "row",
    marginTop: 10,
    padding: 5,
    backgroundColor: "#C7D2FE",
    borderRadius: 100,
    borderColor: "#4D5DFA",
    borderWidth: 1,
  },
});
