import {  Text, TextInput, View } from 'react-native'
import { Image, ImageBackground } from 'expo-image';
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';

const Chat = () => {
  const tempUrl = 'https://res.cloudinary.com/dffepahvl/image/upload/v1760360520/g5p9jbwwyh5lydndna7c.png';

  return (
    <SafeAreaView className='flex-1 bg-white'>
      {/* Header */}
      <View className='flex flex-row justify-between items-center px-4 py-4 border-b border-gray-200'>
        <View className='flex flex-row items-center'>
          <Image source={{ uri: tempUrl }} alt='temp' className='rounded-full h-14 w-14' />
          <View className='ml-3'>
            <Text className='text-lg font-bold'>Dinesh Bhatia</Text>
            <Text className='text-sm text-gray-500'>Online</Text>
          </View>
        </View>
        <Entypo name="dots-three-vertical" size={22} color="black" />
      </View>

      {/* Chat background */}
      <ImageBackground
        source={{ uri: tempUrl }}
        style={{ flex: 1, justifyContent: 'flex-end' }}
      >

    
        <View className='p-4 bg-white w-full flex flex-row items-center gap-3 rounded-t-2xl shadow-md'>
          <FontAwesome name="plus-circle" size={26} color="black" />
          <TextInput
            placeholder='Type a message'
            className='flex-1 text-lg px-4 py-2'
            style={{ borderWidth: 0, fontSize: 18 }}
          />
          <Entypo name="emoji-happy" size={26} color="black" />
          <View className='ml-2 bg-blue-500 p-2 rounded-full'>
            <FontAwesome name="microphone" size={20} color="white" />
          </View>
        </View>

      </ImageBackground>
    </SafeAreaView>
  )
}

export default Chat;
