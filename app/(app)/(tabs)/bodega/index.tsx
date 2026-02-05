import { router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BodegaIndex() {
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <Text style={styles.title}>Bodega</Text>
                <View style={{ height: 10 }} />
                <Button title="lista" onPress={() => router.push("/(app)/(tabs)/bodega/lista")} />
                <View style={{ height: 10 }} />
                <Button title="producto" onPress={() => router.push("/(app)/(tabs)/bodega/producto")} />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
});