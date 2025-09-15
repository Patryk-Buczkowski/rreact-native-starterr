// import useAuthStore from "@/zustand/useAuthStore";
// import { Stack, useRouter, useSegments } from "expo-router";
// import { useEffect } from "react";

// function RouteGuard({ children }: { children: React.ReactNode }) {
//   const segments = useSegments();
//   const router = useRouter();
//   const { user } = useAuthStore();
//   const isAuth = !!user;

//   useEffect(() => {
//     if (!segments) return;

//     const inAuthGroup = segments[0] === "auth";

//     if (!user && !inAuthGroup) {
//       router.replace("/auth");
//     } else if (user && inAuthGroup) {
//       router.replace("/");
//     }
//   }, [isAuth, router, segments, user]);
//   return children;
// }

// export default function RootLayout() {
//   return (
//     <RouteGuard>
//       <Stack />
//     </RouteGuard>
//   );
// }

import { Slot } from "expo-router";

export default function RootLayout() {
  return <Slot />;
}


// RouteGuard używa useEffect, który jest wywoływany, gdy komponent się ładuje.

// Wewnątrz useEffect, sprawdza stan uwierzytelnienia użytkownika (isAuth).

// Jeśli użytkownik nie jest uwierzytelniony (!isAuth), komponent używa router.replace('./auth') do natychmiastowego przekierowania na ekran uwierzytelniania.

// router.replace jest używane, aby zastąpić bieżącą trasę na stosie nawigacji, co uniemożliwia użytkownikowi powrót do chronionej trasy za pomocą przycisku "Wstecz".

// Jeśli użytkownik jest uwierzytelniony, RouteGuard po prostu renderuje przekazane do niego komponenty (children), pozwalając na kontynuowanie nawigacji.
