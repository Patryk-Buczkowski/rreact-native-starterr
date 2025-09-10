import { Account, Client } from "react-native-appwrite";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!);

export const account = new Account(client);

GoogleSignin.configure({
  webClientId:
    "184807168382-lo2vtssr0sr3kl164021fqs4pkr62hmf.apps.googleusercontent.com",
  offlineAccess: true,
  scopes: ['https://www.googleapis.com/auth/drive'],
  forceCodeForRefreshToken: true,
  profileImageSize: 120
});
