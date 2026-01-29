import { router } from 'expo-router';
import { Button, Text, View } from "react-native";

export default function Register() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text>register.</Text>
            <Button title="Sign In" onPress={() => router.push('/login')} />
        </View>
    );
}