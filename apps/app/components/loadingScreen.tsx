import React from "react";
import { StyleSheet, View, ActivityIndicator, Text, Image, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const LoadingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
   
      <Image
        source={{ uri: "https://img.icons8.com/fluency/96/react.png" }}
        style={styles.logo}
      />

 
      <ActivityIndicator size="large" color="#2563EB" style={{ marginTop: 20 }} />


      <Text style={styles.text}>Loading your content...</Text>
      <Text style={styles.subText}>Please wait a moment</Text>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB", // clean background
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  text: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937",
  },
  subText: {
    marginTop: 8,
    fontSize: 16,
    color: "#6B7280",
  },
});
