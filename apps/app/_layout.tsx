import { Stack } from "expo-router";
import Drawer from "expo-router/drawer";
import ReduxWrapper from "./wrapper/reduxWrapper";
import "./global.css";
export default function RootLayout() {
  return (
    <ReduxWrapper>



      <Stack

        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "white" }  // <-- set background color
        }}


      >


        <Stack.Screen name="(tabs)" options={{ headerShown: false, }} />

      </Stack>
    </ReduxWrapper>
  )
}
