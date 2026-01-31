import { Stack } from "expo-router";

export default function BodegaLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="lista" options={{ headerShown: false }} />
            <Stack.Screen name="producto" options={{ headerShown: false }} />
            <Stack.Screen name="crear" options={{ headerShown: false }} />
            <Stack.Screen name="[editar]" options={{ headerShown: false }} />
        </Stack>
    );
}