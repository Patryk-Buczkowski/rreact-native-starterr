import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  Linking,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import useAuthStore from "@/zustand/useAuthStore";
import { account } from "@/lib/appwrite";
import { AppwriteException, ID } from "react-native-appwrite";
import { handleGoogleSignIn } from "@/lib/google";

export default function AuthScreen() {
  const { signData, handleInputs, error, setError } = useAuthStore();

  const theme = useTheme();
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  const handleSwitchMode = () => {
    setIsSignUp((prev) => !prev);
  };

  const handleAuth = async () => {
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
      const result = await account.create(
        ID.unique(),
        signData.email,
        signData.password
      );
      console.log("Utworzono uytkownika", result);
    } catch (error) {
      if (error instanceof AppwriteException && error.code === 409) {
        console.error("Błąd: Ten adres e-mail jest już w użyciu.");
        return { error: "E-mail jest już zajęty." };
      }
      setError("Something went wrong with authentication");
      console.error(error);
    }
    console.log("Auth data:", signData);
  };

  useEffect(() => {
  const handleDeepLink = async (event: any) => {
    const url = event?.url ?? event?.nativeEvent?.url;

    if (url && typeof url === "string" && url.startsWith("exp+myapp://success")) {
      try {
        // Tutaj pobierasz zalogowanego użytkownika
        const user = await account.get();
        console.log("✅ Zalogowany użytkownik:", user);
      } catch (err) {
        console.error("❌ Błąd pobierania usera:", err);
      }
    }
  };

  const subscription = Linking.addEventListener("url", handleDeepLink);
  return () => subscription.remove();
}, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={style.container}
      >
        <View style={style.item}>
          <Text variant="headlineMedium" style={style.title}>
            {isSignUp ? "Welcome back" : "Create account"}
          </Text>

          <TextInput
            label="Email"
            onChangeText={(value) => handleInputs(value, "email")}
            placeholderTextColor={"#666"}
            style={style.textInput}
            aria-label="email"
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="example@gmail.com"
            mode="outlined"
          />

          <TextInput
            onChangeText={(value) => handleInputs(value, "password")}
            label="Password"
            placeholder="Type Your password"
            placeholderTextColor={"#666"}
            style={style.textInput}
            aria-label="password"
            keyboardType="default"
            secureTextEntry={true}
            mode="outlined"
          />
          {error && (
            <View>
              <Text style={{ color: theme.colors.error, marginBottom: 16 }}>
                {error}
              </Text>
            </View>
          )}

          <Button
            onPress={handleAuth}
            style={style.buttonSubmit}
            mode="contained"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </Button>

          <Button
            onPress={handleSwitchMode}
            style={style.buttonText}
            mode="text"
          >
            {isSignUp
              ? "Do not have an account? Sign up 😁"
              : "Do You alredy have an account? Sign in 😎"}
          </Button>

          <TouchableOpacity
            onPress={handleGoogleSignIn}
            style={style.buttonGoogle}
          >
            <AntDesign name="google" size={24} color="black" />
            <Text style={style.buttonText}>Zaloguj przez Google</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  item: {
    padding: 10,
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  textInput: {
    width: "100%",
    marginBottom: 12,
    padding: 8,
    borderRadius: 8,
    color: "red",
  },
  buttonSubmit: {
    borderColor: "purple",
  },
  buttonText: {},
  buttonGoogle: {
    height: 50,
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    flexDirection: "row",
    marginTop: 10,
    padding: 5,
    backgroundColor: "#f5f5f5",
    borderRadius: 100,
    borderColor: "#666",
    borderWidth: 1,
  },
});

{
  /* Platform.OS === 'ios' ? 'padding' : 'height'

'padding': Na iOS klawiatura jest zintegrowana z systemem operacyjnym i jej wysokość jest stała. Właściwość padding dodaje dolny margines, aby przesunąć elementy w górę, co jest idealne dla tego systemu.

'height': Na Androidzie klawiatura może mieć zmienną wysokość, a system działa inaczej. Użycie 'height' pozwala na automatyczne dopasowanie wysokości widoku, co zapewnia lepsze działanie w różnych wersjach Androida. */
}
