// _layout.tsx
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

import * as Linking from "expo-linking";

function RouteGuard({ children }: { children: React.ReactNode }) {
    const isAuth = false;
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
  const subscription = Linking.addEventListener("url", (event) => {
    console.log("Redirect URL:", event.url);
    // Tu możesz obsłużyć dodatkowe akcje po redirect
  });

  return () => subscription.remove();
}, []);

    useEffect(() => {
        // sprawdź, czy segments są załadowane, zanim sprawdzisz pierwszy segment.
        if (segments.length > 0) {
            const inAuthGroup = segments[0] === 'auth';
            if (!isAuth && !inAuthGroup) {
                router.replace('/auth');
            }
        }
    }, [isAuth, segments]);

    return children;
}

export default function RootLayout() {
    return (
        <RouteGuard>
            <Stack screenOptions={{ title: 'Hejka and create acccount' }} />
        </RouteGuard>
    );
}

// RouteGuard używa useEffect, który jest wywoływany, gdy komponent się ładuje.

// Wewnątrz useEffect, sprawdza stan uwierzytelnienia użytkownika (isAuth).

// Jeśli użytkownik nie jest uwierzytelniony (!isAuth), komponent używa router.replace('./auth') do natychmiastowego przekierowania na ekran uwierzytelniania.

// router.replace jest używane, aby zastąpić bieżącą trasę na stosie nawigacji, co uniemożliwia użytkownikowi powrót do chronionej trasy za pomocą przycisku "Wstecz".

// Jeśli użytkownik jest uwierzytelniony, RouteGuard po prostu renderuje przekazane do niego komponenty (children), pozwalając na kontynuowanie nawigacji.
