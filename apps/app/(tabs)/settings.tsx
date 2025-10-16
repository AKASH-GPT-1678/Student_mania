import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import SafeScreenWrapper from "../wrapper/safescreenwrapper";
import { useAppDispatch } from "../redux/reduxhooks";
import { logout } from "../redux/userSlice";

const Settings = () => {
    const dispatch = useAppDispatch();
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          dispatch(logout());
          console.log("User logged out");
        },
      },
    ]);
  };

  return (
    <SafeScreenWrapper>
      <View className="flex-1 bg-white px-6 py-10">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-gray-900">Settings</Text>
          <Text className="text-gray-500 mt-1">
            Manage your account and preferences
          </Text>
        </View>

        {/* Logout Section */}
        <View className="mt-auto items-center">
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-500 w-full py-3 rounded-2xl"
          >
            <Text className="text-center text-white font-semibold text-lg">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeScreenWrapper>
  );
};

export default Settings;
