import axios from "axios";
import * as SecureStore from 'expo-secure-store';


export async function crear(nombre: string, marca: string, cantidad: number) {
    const url = `${process.env.EXPO_PUBLIC_API_URL}producto`;

    const token = await SecureStore.getItemAsync('session')

    try {

        const resultado = await axios.post(url, {
            nombre,
            marca,
            cantidad,
        }, {
            headers: {
                //"Content-Type": "application/json",   
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })
        return resultado.data

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("error = " + error)
            if (error.message == "Request failed with status code 429") { return { message: "ha enviado demasiadas solicitudes", status: "error" } }
            return { message: error.message, status: "error" }
        } else {
            return error;
        }
    }
}

export async function listarProductos(query: string) {

    const url = `${process.env.EXPO_PUBLIC_API_URL}producto?${query}`;

    const token = await SecureStore.getItemAsync('session')

    try {

        const resultado = await axios.get(url, {
            headers: {
                //"Content-Type": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })
        return resultado.data

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("error = " + error)
            if (error.message == "Request failed with status code 429") { return { message: "ha enviado demasiadas solicitudes", status: "error" } }
            return { message: error.message, status: "error" }
        } else {
            return error;
        }
    }
}

export async function eliminarProducto(id: number) {
    const url = `${process.env.EXPO_PUBLIC_API_URL}producto/${id}`;

    const token = await SecureStore.getItemAsync('session')

    try {

        const resultado = await axios.delete(url, {
            headers: {
                //"Content-Type": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })
        return resultado.data

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("error = " + error)
            if (error.message == "Request failed with status code 429") { return { message: "ha enviado demasiadas solicitudes", status: "error" } }
            return { message: error.message, status: "error" }
        } else {
            return error;
        }
    }
}

export async function unproducto(id: number) {
    const url = `${process.env.EXPO_PUBLIC_API_URL}producto/${id}`;

    const token = await SecureStore.getItemAsync('session')

    try {

        const resultado = await axios.get(url, {
            headers: {
                //"Content-Type": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })
        return resultado.data

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("error = " + error)
            if (error.message == "Request failed with status code 429") { return { message: "ha enviado demasiadas solicitudes", status: "error" } }
            return { message: error.message, status: "error" }
        } else {
            return error;
        }
    }
}

export async function editarproducto(id: number, nombre: string, marca: string, cantidad: number) {
    const url = `${process.env.EXPO_PUBLIC_API_URL}producto/${id}`;

    const token = await SecureStore.getItemAsync('session')

    try {

        const resultado = await axios.patch(url, {
            nombre,
            marca,
            cantidad,
        }, {
            headers: {
                //"Content-Type": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })
        return resultado.data

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("error = " + error)
            if (error.message == "Request failed with status code 429") { return { message: "ha enviado demasiadas solicitudes", status: "error" } }
            return { message: error.message, status: "error" }
        } else {
            return error;
        }
    }
}

export async function cantidadActualizar(id: number, cantidad: number) {
    const url = `${process.env.EXPO_PUBLIC_API_URL}producto/cambiarcantidad/${id}`;

    const token = await SecureStore.getItemAsync('session')

    try {

        const resultado = await axios.patch(url, {
            cantidad,
        }, {
            headers: {
                //"Content-Type": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })
        return resultado.data

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("error = " + error)
            if (error.message == "Request failed with status code 429") { return { message: "ha enviado demasiadas solicitudes", status: "error" } }
            return { message: error.message, status: "error" }
        } else {
            return error;
        }
    }
}
