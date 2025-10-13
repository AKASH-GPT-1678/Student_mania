import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { ImageBackground } from "expo-image";

interface Props {
    children: React.ReactNode;
    background?: string;
}

export default function SafeScreenWrapper({ children ,background}: Props) {
    const tempUrl = 'https://res.cloudinary.com/dffepahvl/image/upload/v1760341910/ov2jjlkawkcebfe6xpi0.jpg';
    return (
        <SafeAreaView style={{ backgroundColor: "white", height: "100%" }}>
            <ImageBackground source={{ uri: background }} resizeMode="cover" style={{ width: "100%", height: "100%" }} >
            {children}
            </ImageBackground>
        </SafeAreaView>
    );
}
