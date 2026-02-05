import { eliminarProducto, listarProductos } from "@/api/producto";
import { useIsFocused } from '@react-navigation/native';
import { router } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useState } from "react";
import { Alert, Button, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';


interface ProductosData {
    id: number;
    nombre: string;
    marca: string;
    cantidad: number;
}
interface LinksData {
    first?: string;
    previous?: string;
    current?: string;
    next?: string;
    last?: string;
}

export default function BodegaProducto() {

    const [productos, setProductos] = useState<ProductosData[]>([]);

    const [paginaver, setPaginaver] = useState(`limit=5&page=1&sortBy=nombre:ASC`);

    const [currentPage, setCurrentPage] = useState(1);
    const [links, setLinks] = useState<LinksData>();

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            ver(paginaver);
        }
    }, [paginaver, isFocused]);

    useEffect(() => {
        const unlockScreenOerientation = async () => {
            await ScreenOrientation.unlockAsync()
        }
        unlockScreenOerientation()
    }, [])

    async function ver(ir: string) {


        if (ir.includes("?")) {
            const palabras: string[] = ir.split("?");
            ir = palabras[1];
        }
        try {
            const prod = await listarProductos(ir);
            setProductos(prod?.data);
            setCurrentPage(prod?.meta.currentPage);
            setLinks(prod?.links);
        } catch (error) {
            console.log(error);
        }
    }

    const eliminar = async (id: number) => {


        return Alert.alert(
            "Are your sure?",
            "Estas seguro de eliminar este producto?",
            [
                // The "Yes" button
                {
                    text: "Si",
                    onPress: async () => {
                        try {
                            const prod = await eliminarProducto(id);
                            ver(paginaver);
                        } catch (error) {
                            console.log(error);
                        }
                    },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "No",
                },
            ]
        );


    }

    return (
        <View>
            <SafeAreaView>
                <Text>Producto</Text>
                <Button title="Crear" onPress={() => router.push("/(app)/(tabs)/bodega/crear")} />
                <View style={{ height: 10 }} />
                <View style={styles.tableContainer}>
                    <ScrollView horizontal={true}>
                        <View>
                            <View style={styles.headerRow}>
                                <Text style={styles.headerCell1}>id</Text>
                                <Text style={styles.headerCell2}>nombre</Text>
                                <Text style={styles.headerCell3}>marca</Text>
                                <Text style={styles.headerCell4}>cantidad</Text>
                                <Text style={styles.headerCell5}>Editar</Text>
                                <Text style={styles.headerCell6}>Eliminar</Text>
                            </View>
                            {productos && productos.map((producto, index) => (
                                <View style={styles.dataRow} key={index}>
                                    <Text style={styles.dataCell1}>{producto.id}</Text>
                                    <Text style={styles.dataCell2}>{producto.nombre}</Text>
                                    <Text style={styles.dataCell3}>{producto.marca}</Text>
                                    <Text style={styles.dataCell4}>{producto.cantidad}</Text>
                                    <View style={styles.dataCell5}><Pressable style={styles.btn} onPress={() => router.push({ pathname: '/(app)/(tabs)/bodega/[editar]', params: { editar: producto.id } })} ><Text>Editar</Text></Pressable></View>
                                    <View style={styles.dataCell6}><Pressable style={styles.btn} onPress={() => eliminar(producto.id)} ><Text>Eliminar</Text></Pressable></View>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
                <View style={{ height: 10 }} />
                <View style={styles.viewpagination}>
                    {links ?
                        <>
                            {links?.first ? <View style={styles.pagination}><Pressable onPress={() => setPaginaver(`${links.first}`)} ><Text style={styles.btnpag}>{`<<`}</Text></Pressable></View> : <View style={styles.pagination}><Text style={styles.btnpag}>{`<<`}</Text></View>}
                            {links?.previous ? <View style={styles.pagination}><Pressable onPress={() => setPaginaver(`${links.previous}`)} ><Text style={styles.btnpag}>{`<`}</Text></Pressable></View> : <View style={styles.pagination}><Text style={styles.btnpag}>{`<`}</Text></View>}
                            <View style={styles.pagination}><Text style={styles.btnpag}>{currentPage}</Text></View>
                            {links?.next ? <View style={styles.pagination}><Pressable onPress={() => setPaginaver(`${links.next}`)} ><Text style={styles.btnpag}>{`>`}</Text></Pressable></View> : <View style={styles.pagination}><Text style={styles.btnpag}>{`>`}</Text></View>}
                            {links?.last ? <View style={styles.pagination}><Pressable onPress={() => setPaginaver(`${links.last}`)} ><Text style={styles.btnpag}>{`>>`}</Text></Pressable></View> : <View style={styles.pagination}><Text style={styles.btnpag}>{`>>`}</Text></View>}
                        </> : <Text>No hay datos</Text>}
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({

    viewpagination: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    pagination: {
        width: 30,
        borderWidth: 1,
        borderColor: '#1a1818ff',
        paddingLeft: 5,
        paddingRight: 5,
        fontWeight: "bold",
    },

    btnpag: {
        width: 25,
        height: 25,
        backgroundColor: "#c0d392ff",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        textAlign: "center",
        margin: 2,
    },

    btn: {
        width: 80,
        height: 25,
        backgroundColor: "#76ddf1ff",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        margin: 2,
    },
    tableContainer: {
        flexDirection: 'row',
        // add a height or flex basis to the container for ScrollView to work
    },
    headerRow: {
        flexDirection: 'row',
    },
    dataRow: {
        flexDirection: 'row',
    },
    headerCell1: {
        width: 30,
        borderWidth: 1,
        borderColor: '#1a1818ff',
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: "#76ddf1ff",
        fontWeight: "bold",
        // cell styling
    },
    headerCell2: {
        width: 250,
        borderWidth: 1,
        borderColor: '#1a1818ff',
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: "#76ddf1ff",
        fontWeight: "bold",
        // cell styling
    },
    headerCell3: {
        width: 250,
        borderWidth: 1,
        borderColor: '#1a1818ff',
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: "#76ddf1ff",
        fontWeight: "bold",
        // cell styling
    },
    headerCell4: {
        width: 100,
        borderWidth: 1,
        borderColor: '#1a1818ff',
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: "#76ddf1ff",
        fontWeight: "bold",
        // cell styling
    },
    headerCell5: {
        width: 100,
        borderWidth: 1,
        borderColor: '#1a1818ff',
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: "#76ddf1ff",
        fontWeight: "bold",
        // cell styling
    },
    headerCell6: {
        width: 100,
        borderWidth: 1,
        borderColor: '#1a1818ff',
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: "#76ddf1ff",
        fontWeight: "bold",
        // cell styling
    },
    dataCell1: {
        width: 30,
        borderWidth: 1,
        borderColor: '#1a1818ff',
        paddingLeft: 5,
        paddingRight: 5,
        textAlign: "center",
        // cell styling
    },
    dataCell2: {
        width: 250,
        borderWidth: 1,
        borderColor: '#1a1818ff',
        paddingLeft: 5,
        paddingRight: 5,
        // cell styling
    },
    dataCell3: {
        width: 250,
        borderWidth: 1,
        borderColor: '#1a1818ff',
        paddingLeft: 5,
        paddingRight: 5,
        // cell styling
    },
    dataCell4: {
        width: 100,
        borderWidth: 1,
        borderColor: '#1a1818ff',
        paddingLeft: 5,
        paddingRight: 5,
        // cell styling
    },
    dataCell5: {
        width: 100,
        borderWidth: 1,
        borderColor: '#1a1818ff',
        paddingLeft: 5,
        paddingRight: 5,
        // cell styling
    },
    dataCell6: {
        width: 100,
        borderWidth: 1,
        borderColor: '#1a1818ff',
        paddingLeft: 5,
        paddingRight: 5,
        // cell styling
    },
});