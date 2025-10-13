import { SafeAreaView } from "react-native-safe-area-context";
import React from "react"; 

interface Props {
    children: React.ReactNode;
}

export default function SafeScreenWrapper({ children }: Props) {
    return (
        <SafeAreaView style={{backgroundColor : "white" , height : "100%"}}>
            {children}
        </SafeAreaView>
    );
}
