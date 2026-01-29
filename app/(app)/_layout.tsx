import { Redirect, Stack } from "expo-router";
import { useSession } from "../../ctx";

export const unstable_settings = {
    initialRouteName: "(tabs)", // anchor
};

export default function ProtectedLayout() {
    const { session } = useSession();

    if (!session) {
        return <Redirect href="/login" />;
    }

    return (
        <Stack>
            <Stack.Screen
                name="(tabs)"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}