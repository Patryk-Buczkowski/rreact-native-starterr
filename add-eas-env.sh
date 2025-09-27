#!/bin/bash

# Lista środowisk
ENVIRONMENTS=("development" "preview" "production")

# Funkcja do tworzenia zmiennej
create_env() {
  local name=$1
  local value=$2
  local visibility=$3
  for env in "${ENVIRONMENTS[@]}"; do
    eas env:create --name "$name" --value "$value" --visibility "$visibility" --environment "$env"
  done
}

# Publiczne zmienne (frontend)
create_env "APPWRITE_PROJECT_ID" "68b5d078002dbb47cd23" "secret"
create_env "APPWRITE_PROJECT_NAME" "Patryk" "plaintext"
create_env "APPWRITE_ENDPOINT" "https://fra.cloud.appwrite.io/v1" "plaintext"
create_env "APPWRITE_PLATFORM" "com.ganja.zadania" "plaintext"

create_env "WEB_CLIENT_ID" "184807168382-lo2vtssr0sr3kl164021fqs4pkr62hmf.apps.googleusercontent.com" "plaintext"
create_env "WEB_AUTH_URI" "https://accounts.google.com/o/oauth2/auth" "plaintext"
create_env "WEB_PROJECT_ID" "aaaa-1735980748742" "plaintext"
create_env "WEB_TOKEN_URI" "https://oauth2.googleapis.com/token" "plaintext"
create_env "WEB_AUTH_PROVIDER_X509_CERT_URL" "https://www.googleapis.com/oauth2/v1/certs" "plaintext"
create_env "WEB_REDIRECT_URIS" "https://fra.cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/68b5d078002dbb47cd23" "plaintext"
create_env "DB_ID" "68d2cc1d00377902bf42" "plaintext"

# Sekretna zmienna (backend / poufna)
create_env "WEB_CLIENT_SECRET" "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" "secret"
