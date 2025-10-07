import { Stack } from "expo-router";
import { Drawer } from 'expo-router/drawer';
import SafeScreenWrapper from "../wrapper/safescreenwrapper";
export default function TabsLayout() {
    return (
        //  <SafeScreenWrapper>



        <Drawer>
            <Drawer.Screen
                name="index" // This is the name of the page and must match the url from root
                options={{
                    drawerLabel: 'Home',
                    title: 'overview',
                }}
            />
            <Drawer.Screen
                name="onboarding" // This is the name of the page and must match the url from root
                options={{
                    drawerLabel: 'User',
                    // title: 'overview',
                    // headerShown: false
                }}
            />
        </Drawer>






    );

}
