import { editarproducto, unproducto } from "@/api/producto";
import { router, useLocalSearchParams } from "expo-router";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, ToastAndroid, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";

export function initialValues() {
    return {
        nombre: "",
        marca: "",
        cantidad: 0
    };
}

export function validationSchame() {
    return Yup.object({
        nombre: Yup.string().required("nombre es requerido"),
        marca: Yup.string().required("marca es requerido"),
        cantidad: Yup.number().required("cantidad es requerido").min(1, "cantidad debe ser mayor a 0"),
    });
}

interface productoData {
    nombre: string;
    marca: string;
    cantidad: number;
}

export default function Editar() {

    const { editar } = useLocalSearchParams();

    const [listo, setListo] = useState(false);

    const encontrar = async () => {
        try {
            const response = await unproducto(Number(editar));
            if (response.status == "error") {
                ToastAndroid.show("Error = " + response.message, ToastAndroid.LONG);
            } else {
                formik.setFieldValue("nombre", response.nombre);
                formik.setFieldValue("marca", response.marca);
                formik.setFieldValue("cantidad", response.cantidad);
                setListo(true);
            }
        } catch (error) {
            ToastAndroid.show("Error = " + error, ToastAndroid.LONG);
        }
    }

    useEffect(() => {
        encontrar();
    }, [editar]);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchame(),
        validateOnChange: false,
        onSubmit: async (formValue: productoData) => {
            try {
                const { nombre, marca, cantidad } = formValue;
                const response = await editarproducto(Number(editar), nombre, marca, cantidad);
                if (response.status == "error") {
                    ToastAndroid.show("Error = " + response.message, ToastAndroid.LONG);
                } else {
                    ToastAndroid.show("Producto editado exitosamente", ToastAndroid.LONG);
                    router.back();
                }
            } catch (error) {
                ToastAndroid.show("Error = " + error, ToastAndroid.LONG);
            }
        },
    });

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <Text style={styles.title}>Editar {editar}</Text>
                {listo ? (
                    <>
                        <TextInput
                            placeholder="Nombre"
                            value={formik.values.nombre}
                            onChangeText={(text) => formik.setFieldValue("nombre", text)}
                            style={styles.input}
                        />
                        {formik.touched.nombre && formik.errors.nombre ? (
                            <Text>{formik.errors.nombre}</Text>
                        ) : null}
                        <TextInput
                            placeholder="Marca"
                            value={formik.values.marca}
                            onChangeText={(text) => formik.setFieldValue("marca", text)}
                            style={styles.input}
                        />
                        {formik.touched.marca && formik.errors.marca ? (
                            <Text>{formik.errors.marca}</Text>
                        ) : null}
                        <TextInput
                            placeholder="Cantidad"
                            value={formik.values.cantidad.toString()}
                            onChangeText={(text) => formik.setFieldValue("cantidad", text)}
                            style={styles.input}
                            keyboardType="numeric"
                        />
                        {formik.touched.cantidad && formik.errors.cantidad ? (
                            <Text>{formik.errors.cantidad}</Text>
                        ) : null}
                        <Button title="Actualizar" onPress={() => formik.handleSubmit()} disabled={formik.isSubmitting} />
                        <View style={{ height: 10 }} />
                        <Button title="Cancelar" onPress={() => router.back()} />
                    </>
                ) : (
                    <Text>Cargando...</Text>
                )}
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});