// types/env.d.ts
export interface AppConfigExtra {
  DB_ID: string,
  APPWRITE_PROJECT_ID: string;
  APPWRITE_PROJECT_NAME: string;
  APPWRITE_ENDPOINT: string;
  APPWRITE_PLATFORM: string;
  WEB_CLIENT_ID: string;
  WEB_AUTH_URI: string;
  WEB_PROJECT_ID: string;
  WEB_TOKEN_URI: string;
  WEB_AUTH_PROVIDER_X509_CERT_URL: string;
  WEB_CLIENT_SECRET: string;
  WEB_REDIRECT_URIS: string;
  [key: string]: any;
}
