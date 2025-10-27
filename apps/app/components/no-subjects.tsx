import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import SafeScreenWrapper from '../wrapper/safescreenwrapper';

const SubjectNotFound = () => {
  return (
    <SafeScreenWrapper>
      <View className="flex flex-col items-center justify-center">
        <Image
          source={require('../../assets/images/notfound.jpg')} // You can reuse error.png or make a new image
          alt="subject-not-found-icon"
          className="h-48 w-72"
        />
        <Text className="font-bold text-3xl text-black mt-4">
          No Subjects Found
        </Text>
        <Text className="text-lg text-red-600 px-10 text-center mt-6">
          It seems no subjects have been added yet. You can create a new subject to get started.
        </Text>
        <Pressable
          className="p-2 bg-blue-700 px-10 py-5 mt-10 rounded-lg"
          onPress={() =>
            router.replace({
              pathname: '/(tabs)',
              params: { redirected: 'true' },
            })
          }
        >
          <Text className="text-center text-xl font-bold text-white">
            Return Home
          </Text>
        </Pressable>
      </View>
    </SafeScreenWrapper>
  );
};

export default SubjectNotFound;

const styles = StyleSheet.create({});
