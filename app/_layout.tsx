import { Stack } from "expo-router";
import { SessionProvider } from "../ctx";

export default function RootLayout() {
    return (

        <SessionProvider>
            <Stack>
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen name="register" options={{ headerShown: false }} />
                <Stack.Screen name="(app)" options={{ headerShown: false }} />
            </Stack>
        </SessionProvider>
    );
}