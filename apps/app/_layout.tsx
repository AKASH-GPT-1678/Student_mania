import { Stack } from "expo-router";
import Drawer from "expo-router/drawer";

export default function RootLayout() {
  return <Stack
   
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "white" }  // <-- set background color
      }}

  
  >


       <Stack.Screen name="(tabs)" options={{ headerShown: false ,  }} />

  </Stack>;
}
