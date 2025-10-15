import { Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import OppoutunitesItem from '../components/opportunities';

const Offers = () => {
  const [isOffer, setIsOffer] = React.useState(true);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center p-4 bg-white shadow-md">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <FontAwesome6 name="arrow-left-long" size={22} color="black" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-xl font-semibold text-gray-800">Offers & Opportunities</Text>
      </View>

      {/* Tabs */}
      <View className="flex-row justify-evenly border-b border-gray-200 bg-white">
        <TouchableOpacity
          onPress={() => setIsOffer(true)}
          className={`flex-1 py-4 ${isOffer ? 'border-b-4 border-red-500' : ''}`}
        >
          <Text
            className={`text-center text-lg font-bold ${
              isOffer ? 'text-red-600' : 'text-gray-500'
            }`}
          >
            Offers
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsOffer(false)}
          className={`flex-1 py-4 ${!isOffer ? 'border-b-4 border-red-500' : ''}`}
        >
          <Text
            className={`text-center text-lg font-bold ${
              !isOffer ? 'text-red-600' : 'text-gray-500'
            }`}
          >
            Opportunities
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View className="flex-1 items-center justify-center p-6">
        {isOffer ? (
          <View className="bg-white rounded-2xl shadow-md p-6 w-11/12">
            <Text className="text-xl font-semibold text-gray-800 mb-2">Special Offer 🎁</Text>
            <Text className="text-gray-600 leading-relaxed">
              Get up to 30% off on selected courses this month! Explore our limited-time learning offers and boost your skills today.
            </Text>
          </View>
        ) : (
           
            <OppoutunitesItem/>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Offers;
