import React, { useState } from "react";
import { TextInput, View, Text, Pressable, ActivityIndicator } from "react-native";
import SafeScreenWrapper from "../wrapper/safescreenwrapper";
import { ENV } from "../utils/ENV";
import axios from "axios";

export default function SubjectNotes({ token }: { token: string }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!text.trim()) {
      setMessage("Please write something before submitting.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // Example: Send note or description to backend
      const response = await axios.post(
        `${ENV.BASE_URL}/api/subjects/notes`,
        { content: text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("✅ Note submitted successfully!");
      setText("");
    } catch (error: any) {
      console.error(error);
      setMessage("❌ Failed to submit note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeScreenWrapper>
      <View className="flex-1 p-4 mt-4">
        <Text className="text-2xl font-bold text-center text-black mb-4">
          Add Subject Notes
        </Text>

        <TextInput
          className="border border-gray-300 rounded-2xl p-4 text-base h-96"
          placeholder="Write your notes or subject details here..."
          multiline
          value={text}
          onChangeText={setText}
          textAlignVertical="top"
        />

        {message ? (
          <Text
            className={`mt-3 text-center ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </Text>
        ) : null}

        <Pressable
          className={`mt-6 p-4 rounded-2xl ${
            loading ? "bg-gray-400" : "bg-blue-700"
          }`}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-center text-white text-lg font-semibold">
              Submit Note
            </Text>
          )}
        </Pressable>
      </View>
    </SafeScreenWrapper>
  );
}
