import { Tabs } from "expo-router";

export default function AppLayout() {

  return (
    <Tabs>

      <Tabs.Screen name="about" options={{ headerShown: false }} />
      <Tabs.Screen name="nosotros" options={{ headerShown: false }} />

    </Tabs>
  );
}
