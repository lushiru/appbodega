// ctx.tsx (in the root directory, outside 'app')
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextType {
    signIn: (token: string) => void;
    signOut: () => void;
    session: string | null;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    signIn: () => null,
    signOut: () => null,
    session: null,
    isLoading: false,
});

export function useSession() {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error('useSession must be wrapped in a SessionProvider');
    }
    return value;
}

export function SessionProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // In a real app, you'd fetch the session here
    useEffect(() => {
        SecureStore.getItemAsync('session').then(session => {
            setSession(session);
            setIsLoading(false);
            router.replace('/about');
        });
    }, []);

    useEffect(() => {
        console.log("cambio sesion")
        if (!isLoading) {
            if (!session) {
                // Redirect to sign-in page if not signed in

                router.replace('/login');
            } else if (session) {
                // Redirect to home page if signed in and currently in auth screens

                router.replace('/(app)/(tabs)/about');
            }
        }
    }, [session]);

    return (
        <AuthContext.Provider
            value={{
                signIn: async (token: string) => {
                    // Add actual sign-in logic here (API call to backend)
                    // On success, set the session and store it securely
                    setIsLoading(false);
                    const dummySession = token;
                    await SecureStore.setItemAsync('session', dummySession);
                    setSession(dummySession);


                },
                signOut: async () => {
                    setSession(null);
                    await SecureStore.deleteItemAsync('session');
                },
                session,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
