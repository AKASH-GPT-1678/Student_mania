import { Stack } from "expo-router";
import SafeScreenWrapper from "../wrapper/safescreenwrapper";


export default function RootLayout() {
    return (

        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "white" } }}>

        </Stack>

    )

}