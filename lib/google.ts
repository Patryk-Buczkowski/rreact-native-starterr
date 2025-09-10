import { account } from "./appwrite";
import { OAuthProvider } from "react-native-appwrite";
import { Linking } from "react-native";

export const handleGoogleSignIn = async () => {
  try {
    const session =  await account.createOAuth2Session({
      provider: OAuthProvider.Google,
      success: "exp+myapp://success",
      failure: "exp+myapp://failure",
      scopes: ["profile", "email"],
    });
    Linking.openURL(`${session}`);

    console.log("Zalogowano pomyślnie!", session);
  } catch (error) {
    console.error("Błąd logowania Google:", error);
  }
};