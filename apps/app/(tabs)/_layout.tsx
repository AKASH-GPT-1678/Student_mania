import { Stack } from "expo-router";
import { Drawer } from 'expo-router/drawer';
import SafeScreenWrapper from "../wrapper/safescreenwrapper";
export default function TabsLayout() {
    return (



        <Drawer >
            <Drawer.Screen

                name="index"
                options={{
                    drawerLabel: 'Home',
                    title: 'overview',
                    drawerActiveBackgroundColor: "white",


                }}
            />
            <Drawer.Screen
                name="subjects" 
                options={{
                    drawerLabel: 'Subjects',
                    title: 'subjects',
                    drawerActiveBackgroundColor: "white",
                }}
            />
            <Drawer.Screen
                name="onboarding" 
                options={{
                    drawerLabel: 'User',
                    title: 'overview',
                    drawerActiveBackgroundColor: "white",
                }}
            />
        </Drawer>






    );

}
