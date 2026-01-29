import { Button, Text, View } from "react-native";
import { useSession } from "../../../ctx";

export default function Nosotros() {
    const { signOut } = useSession();
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text>app de bodegas nosotros.</Text>
            <Button title="Sign Out" onPress={signOut} />
        </View>
    );
}