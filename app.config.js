export default {
  expo: {
    name: "com.ganja.zadania",
    slug: "starter",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "appwrite-callback-68b5d078002dbb47cd23",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: { supportsTablet: true },
    android: {
      package: "com.ganja.zadania",
      versionCode: 2,
      permissions: [
        "INTERNET",
        "ACCESS_NETWORK_STATE",
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
      ],
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      config: {
        googleSignIn: {
          clientId: process.env.WEB_CLIENT_ID,
        },
      },
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: { typedRoutes: true },
    extra: {
  eas: {
    projectId: "600d821a-d2f8-4eb0-adf8-28542f6290e9", 
  },
  APPWRITE_PROJECT_ID: process.env.APPWRITE_PROJECT_ID,
  APPWRITE_PROJECT_NAME: process.env.APPWRITE_PROJECT_NAME,
  APPWRITE_ENDPOINT: process.env.APPWRITE_ENDPOINT,
  APPWRITE_PLATFORM: process.env.APPWRITE_PLATFORM,
  WEB_CLIENT_ID: process.env.WEB_CLIENT_ID,
  WEB_AUTH_URI: process.env.WEB_AUTH_URI,
  WEB_PROJECT_ID: process.env.WEB_PROJECT_ID,
  WEB_TOKEN_URI: process.env.WEB_TOKEN_URI,
  WEB_AUTH_PROVIDER_X509_CERT_URL: process.env.WEB_AUTH_PROVIDER_X509_CERT_URL,
  WEB_CLIENT_SECRET: process.env.WEB_CLIENT_SECRET,
  WEB_REDIRECT_URIS: process.env.WEB_REDIRECT_URIS,
  DB_ID: process.env.DB_ID
}
  },
};
