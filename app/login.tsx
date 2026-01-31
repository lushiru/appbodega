// app/sign-in.tsx
import { router } from 'expo-router';
import { useFormik } from 'formik';
import React from 'react';
import { Button, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import * as Yup from 'yup';
import { login } from '../api/auth';
import { useSession } from '../ctx'; // We will create this context later

export function initialValues() {
    return {
        email: "",
        password: "",
    };
}

export function validationSchame() {
    return Yup.object({
        email: Yup.string().email("email es invalido").required("email es requerido"),
        password: Yup.string().required("password es requerido"),
    });
}

interface LoginData {
    email: string;
    password: string;
}

export default function Login() {

    const { signIn } = useSession();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchame(),
        validateOnChange: false,
        onSubmit: async (formValue: LoginData) => {
            try {
                const { email, password } = formValue;
                const response = await login(email, password);
                if (response.access_token) {
                    signIn(response.access_token);
                } else {
                    ToastAndroid.show("Error = " + response.message, ToastAndroid.LONG);
                }
            } catch (error) {
                ToastAndroid.show("Error = " + error, ToastAndroid.LONG);
            }
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={formik.values.email}
                onChangeText={(text) => formik.setFieldValue("email", text)}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            {formik.touched.email && formik.errors.email ? (
                <Text>{formik.errors.email}</Text>
            ) : null}
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={formik.values.password}
                onChangeText={(text) => formik.setFieldValue("password", text)}
                secureTextEntry
            />
            {formik.touched.password && formik.errors.password ? (
                <Text>{formik.errors.password}</Text>
            ) : null}
            <Button title="Sign In" disabled={formik.isSubmitting} onPress={() => formik.handleSubmit()} />
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
