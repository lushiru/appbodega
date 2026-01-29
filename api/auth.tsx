import axios from "axios";

export const login = async (email: string, password: string) => {

    const url = `http://192.168.1.81:3000/auth/login`;


    try {

        const resultado = await axios.post(url, {
            email,
            password,
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        return resultado.data

    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.message == "Request failed with status code 429") { return { message: "ha enviado demasiadas solicitudes", status: "error" } }
            return { message: error.message, status: "error" }
        } else {
            return error;
        }
    }

}