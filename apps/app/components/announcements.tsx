import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Entypo from '@expo/vector-icons/Entypo';

// 1️⃣ Define the interface for props
interface AnnouncementCardProps {
  type: string;
  announcement: string;
  time: string;
}

// 2️⃣ Use the interface in the component
const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ type, announcement, time }) => {
  return (
    <View style={{ backgroundColor: "white", padding: 12 }} className='bg-white rounded-2xl'>
      <View className='flex flex-row justify-between w-full'>
        <View style={{ padding: 10, backgroundColor: "#2784F5", width: 100 }} className='text-center rounded-lg'>
          <Text className='text-white text-center'>{type}</Text>
        </View>
        <Entypo name="dots-three-vertical" size={24} color="black" />
      </View>

      <View className='mt-2'>
        <Text className='text-xl font-bold'>{announcement}</Text>
      </View>

      <View className='mt-6 mb-2'>
        <Text>{time}</Text>
      </View>
    </View>
  );
};

export default AnnouncementCard;

const styles = StyleSheet.create({});
