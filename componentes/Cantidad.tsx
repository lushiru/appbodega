import { cantidadActualizar } from "@/api/producto";
import { router } from "expo-router";
import { useFormik } from "formik";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, TextInput, ToastAndroid, View } from "react-native";
import * as Yup from "yup";

interface ProductoData {
    id: number;
    cantidad: number;
}
interface productoData {
    cantidad: number;
}

type MyComponentProps = {
    producto: ProductoData;
}

export function initialValues() {
    return {
        cantidad: 0,
    };
}

export function validationSchame() {
    return Yup.object({
        cantidad: Yup.number().required("cantidad es requerido").min(1, "cantidad debe ser mayor a 0"),
    });
}

export default function Cantidad(props: MyComponentProps) {

    const { producto } = props;

    useEffect(() => {
        formik.setFieldValue("cantidad", producto.cantidad);
    }, [producto]);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchame(),
        validateOnChange: false,
        onSubmit: async (formValue: productoData) => {
            try {
                const { cantidad } = formValue;
                const response = await cantidadActualizar(producto.id, cantidad);
                if (response.status == "error") {
                    ToastAndroid.show("Error = " + response.message, ToastAndroid.LONG);
                } else {
                    ToastAndroid.show("Producto actualizado exitosamente", ToastAndroid.LONG);
                    router.push('/(app)/(tabs)/bodega/lista')
                }
            } catch (error) {
                ToastAndroid.show("Error = " + error, ToastAndroid.LONG);
            }
        },
    });

    return (
        <View style={styles.Container}>
            <TextInput
                placeholder="Cantidad"
                value={formik.values.cantidad.toString()}
                onChangeText={(text) => formik.setFieldValue("cantidad", text)}
                style={styles.input}
                keyboardType="numeric"
            />
            <View style={{ width: 10 }} />
            <Pressable onPress={() => formik.handleSubmit()} style={styles.btn} disabled={formik.isSubmitting}>
                <Text style={styles.btnText}>Actualizar</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        // add a height or flex basis to the container for ScrollView to work
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: 100,
    },
    btn: {
        height: 25,
        backgroundColor: "#2196F3",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        margin: 2,
        paddingLeft: 5,
        paddingRight: 5,
    },
    btnText: {
        color: "white",
        fontWeight: "bold",
    },
});