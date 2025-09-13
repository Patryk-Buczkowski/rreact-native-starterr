import useAuthStore from "@/zustand/useAuthStore";
import { account } from "./appwrite";
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { OAuthProvider } from "react-native-appwrite";

export const handleGoogleSignIn = async () => {
  const { setUser, user } = useAuthStore.getState();
  // await account.deleteSessions(); // usuwa wszystkie sesje

  try {
    // Create deep link that works across Expo environments
    // Ensure localhost is used for the hostname to validation error for success/failure URLs
    const deepLink = new URL(makeRedirectUri({ preferLocalhost: true }));
    const scheme = `${deepLink.protocol}//`; // e.g. 'exp://' or 'appwrite-callback-<PROJECT_ID>://'

    // Start OAuth flow
    const loginUrl = await account.createOAuth2Token({
      provider: OAuthProvider.Google,
      success: `${deepLink}`,
      failure: `${deepLink}`,
    });

    // Open loginUrl and listen for the scheme redirect
    const result = await WebBrowser.openAuthSessionAsync(`${loginUrl}`, scheme);

    if (result.type === "success" && "url" in result) {
      // Extract credentials from OAuth redirect URL
      const url = new URL(result.url);
      const secret = url.searchParams.get("secret");
      const userId = url.searchParams.get("userId");

      if (!secret || !userId) {
        throw new Error("Brak danych sesji w odpowiedzi OAuth");
      }

      await account.createSession({
        userId,
        secret,
      });

      const loggedUser = await account.get();

      setUser({
        $id: loggedUser.$id,
        name: loggedUser.name ?? undefined,
        email: loggedUser.email ?? undefined,
      });

      console.log('user', user)
      console.log("url", url);
      console.log("result", result);
    }

    // Redirect as needed

    console.log("Zalogowano pomyślnie!");
  } catch (error) {
    console.error("Błąd logowania Google:", error);
  }
};
