import useAuthStore from "@/zustand/useAuthStore";
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { OAuthProvider } from "react-native-appwrite";
import { account } from "./appwrite";

export const handleGoogleSignIn = async () => {
  const { setUser, user } = useAuthStore.getState();

  try {
    const deepLink = new URL(makeRedirectUri({ preferLocalhost: true }));
    const scheme = `${deepLink.protocol}//`;

    const loginUrl = await account.createOAuth2Token({
      provider: OAuthProvider.Google,
      success: `${deepLink}`,
      failure: `${deepLink}`,
    });

    const result = await WebBrowser.openAuthSessionAsync(`${loginUrl}`, scheme);

    if (result.type === "success" && "url" in result) {
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
    }


    console.log("Zalogowano pomyślnie!");
  } catch (error) {
    console.error("Błąd logowania Google:", error);
  }
};
