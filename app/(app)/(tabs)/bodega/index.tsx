import { router } from "expo-router";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BodegaIndex() {
    return (
        <View>
            <SafeAreaView>
                <Text>Bodega Index</Text>
                <View style={{ height: 10 }} />
                <Button title="lista" onPress={() => router.push("/(app)/(tabs)/bodega/lista")} />
                <View style={{ height: 10 }} />
                <Button title="producto" onPress={() => router.push("/(app)/(tabs)/bodega/producto")} />
            </SafeAreaView>
        </View>
    );
}