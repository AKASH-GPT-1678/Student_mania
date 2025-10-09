import { Stack } from "expo-router";
import { Drawer } from 'expo-router/drawer';

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
            /> <Drawer.Screen
                name="attendance" 
                options={{
                    drawerLabel: 'Attendance',
                    title: 'Attendance',
                    drawerActiveBackgroundColor: "white",
                 
                }}
               
            />
        </Drawer>






    );

}
