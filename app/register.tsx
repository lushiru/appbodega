import { router } from 'expo-router';
import { useFormik } from "formik";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, ToastAndroid, View } from "react-native";
import * as Yup from "yup";
import { crearcuenta } from "../api/auth";

export function initialValues() {
    return {
        nombre: "",
        email: "",
        password: "",
    };
}

export function validationSchame() {
    return Yup.object({
        nombre: Yup.string().required("nombre es requerido"),
        email: Yup.string().email("email es invalido").required("email es requerido"),
        password: Yup.string().required("password es requerido"),
    });
}

interface LoginData {
    nombre: string;
    email: string;
    password: string;
}

export default function Register() {

    const [activacion, setActivacion] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchame(),
        validateOnChange: false,
        onSubmit: async (formValue: LoginData) => {
            try {
                const { nombre, email, password } = formValue;
                const response = await crearcuenta(nombre, email, password);
                if (response.status == 200) {
                    ToastAndroid.show("Cuenta creada exitosamente", ToastAndroid.LONG);
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
                placeholder="Nombre"
                value={formik.values.nombre}
                onChangeText={(text) => formik.setFieldValue("nombre", text)}
                keyboardType="default"
                autoCapitalize="none"
            />
            {formik.touched.nombre && formik.errors.nombre ? (
                <Text>{formik.errors.nombre}</Text>
            ) : null}
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
            <Button title="Login" onPress={() => router.push('/login')} />
            <View style={{ height: 10 }} />
            {activacion ? (
                <Button title="Activar" onPress={() => router.push('/activar')} />
            ) : null}
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