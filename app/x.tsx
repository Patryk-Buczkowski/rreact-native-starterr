import { ID, Account } from "react-native-appwrite";
import { client } from "@/lib/appwrite";

const account = new Account(client);

export default async function testAuth() {
  try {
    // 1. Utwórz konto (Sign Up)
    const user = await account.create(
      ID.unique(),
      "patryk.buczkowski@outlook.com",
      "1234qwer"
    );
    console.log("User created:", user);

    // 2. Od razu spróbuj loginu (Sign In)
    const session = await account.createEmailPasswordSession(
      "patryk.buczkowski@outlook.com",
      "1234qwer"
    );
    console.log("Session:", session);
  } catch (err) {
    console.error("Auth error:", err);
  }
}
