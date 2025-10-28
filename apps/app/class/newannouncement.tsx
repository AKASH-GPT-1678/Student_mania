// src/screens/CreateAnnouncement.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import axios from "axios";
import { ENV } from "../utils/ENV";
import { useAppSelector } from "../redux/reduxhooks";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import SafeScreenWrapper from "../wrapper/safescreenwrapper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from "expo-router";


const CreateAnnouncement = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const token = useAppSelector((state) => state.user.token);
  const searchParams = useLocalSearchParams();
  const classId = searchParams.classId;

  const handleSubmit = async () => {
    if (!classId) {
      Alert.alert("Missing Fields", "Class ID is required.");
      return;
    }
    if (!category || !title) {
      Alert.alert("Missing Fields", "Category and Title are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        //announcement
        `${ENV.BASE_URL}/api/class/announcement/${classId}`,
        { category, title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert("Success", "Announcement created successfully!");
      setCategory("");
      setTitle("");
      setDescription("");
      console.log(res.data);


    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to create announcement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeScreenWrapper>
      <View className="flex-1 bg-white p-5 mt-4">
        <Ionicons name="arrow-back-outline" size={24} color="black" onPress={() => router.back()} />
        <Text className="text-2xl font-bold mb-4 text-center text-blue-700">
          Create Announcement
        </Text>

        <Text className="text-lg font-semibold mb-2">Category</Text>
        <TextInput
          className="border border-gray-300 rounded-xl p-3 mb-4"
          placeholder="e.g. Exam, Homework, Event"
          value={category}
          onChangeText={setCategory}
        />

        <Text className="text-lg font-semibold mb-2">Title</Text>
        <TextInput
          className="border border-gray-300 rounded-xl p-3 mb-4"
          placeholder="Enter announcement title"
          value={title}
          onChangeText={setTitle}
        />

        <Text className="text-lg font-semibold mb-2">Description</Text>
        <TextInput
          className="border border-gray-300 rounded-xl p-3 mb-6"
          placeholder="Add some details (optional)"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={loading}
          className={`rounded-2xl py-3 ${loading ? "bg-gray-400" : "bg-blue-600"}`}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-center font-semibold text-lg">
              Create
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeScreenWrapper>
  );
};

export default CreateAnnouncement;
