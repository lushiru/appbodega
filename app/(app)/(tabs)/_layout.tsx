import { router, Tabs } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { profile } from "../../../api/auth";

export default function AppLayout() {

  const check = async () => {
    try {
      const profres = await profile();
      if (profres.status == "error") {
        await SecureStore.deleteItemAsync('session');
        router.replace('/login');
      } else {
        await SecureStore.setItemAsync('session', profres.access_token);
      }
    } catch (error) {
      console.log(error);
      await SecureStore.deleteItemAsync('session');
      router.replace('/login');
    }
  }

  return (
    <Tabs
      screenListeners={{
        tabPress: (e) => {
          check();
          let name = e.target;
          let name2 = name?.split("-");
          if (name2 && name2[0] == "bodega") {
            router.replace('/(app)/(tabs)/bodega');
          }
        },
      }}
    >

      <Tabs.Screen name="about" options={{ headerShown: false }} />
      <Tabs.Screen name="bodega" options={{ headerShown: false }} />
      <Tabs.Screen name="nosotros" options={{ headerShown: false }} />


    </Tabs>
  );
}
