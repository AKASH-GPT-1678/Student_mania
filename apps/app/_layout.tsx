import { Stack } from "expo-router";
import Drawer from "expo-router/drawer";

export default function RootLayout() {
  return <Stack>


       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

  </Stack>;
}
