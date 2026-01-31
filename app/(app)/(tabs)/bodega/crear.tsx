import { crear } from "@/api/producto";
import { router } from "expo-router";
import { useFormik } from "formik";
import { Button, StyleSheet, Text, TextInput, ToastAndroid, View } from "react-native";
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

export default function BodegaCrear() {

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchame(),
        validateOnChange: false,
        onSubmit: async (formValue: productoData) => {
            try {
                const { nombre, marca, cantidad } = formValue;
                const response = await crear(nombre, marca, cantidad);
                if (response.status == "error") {
                    ToastAndroid.show("Error = " + response.message, ToastAndroid.LONG);
                } else {
                    ToastAndroid.show("Producto creado exitosamente", ToastAndroid.LONG);
                    router.back();
                }
            } catch (error) {
                ToastAndroid.show("Error = " + error, ToastAndroid.LONG);
            }
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear Producto</Text>
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
            <Button title="Crear" onPress={() => formik.handleSubmit()} disabled={formik.isSubmitting} />
            <View style={{ height: 10 }} />
            <Button title="Cancelar" onPress={() => router.back()} />
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