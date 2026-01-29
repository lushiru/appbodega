// app/sign-in.tsx
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { login } from '../api/auth';
import { useSession } from '../ctx'; // We will create this context later

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useSession();

    const handleSignIn = async () => {
        // Implement your authentication logic here
        const resultado = await login(email, password);
        if (resultado.status == "error") {
            alert("error=" + resultado.message);
        } else {
            signIn(resultado.access_token);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Ins</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Sign In" onPress={handleSignIn} />
            <View style={{ height: 10 }} />
            <Button title="Registrarse" onPress={() => router.push('/register')} />
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});
