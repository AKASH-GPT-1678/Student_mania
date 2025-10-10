import { Stack } from "expo-router";
import Drawer from "expo-router/drawer";
import SafeScreenWrapper from "../wrapper/safescreenwrapper";
export default function RootLayout() {
    return (
    

       
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: "white" }  
                }}
            >
          
            </Stack>
            
     

    )
}
