import axios from "axios";
import * as SecureStore from 'expo-secure-store';

export const login = async (email: string, password: string) => {

    const url = `${process.env.EXPO_PUBLIC_API_URL}auth/login`;

    console.log("url = " + url)

    try {

        const resultado = await axios.post(url, {
            email,
            password,
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
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

export const profile = async () => {

    const url = `${process.env.EXPO_PUBLIC_API_URL}auth/profile`;

    const token = await SecureStore.getItemAsync('session')

    try {

        const resultado = await axios.get(url, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
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