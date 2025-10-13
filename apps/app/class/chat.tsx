import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Image, ImageBackground } from 'expo-image';
import React from 'react'
import SafeScreenWrapper from '../wrapper/safescreenwrapper';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
const Chat = () => {
  const tempUrl = 'https://res.cloudinary.com/dffepahvl/image/upload/v1760360520/g5p9jbwwyh5lydndna7c.png';
  return (
    <SafeScreenWrapper background={tempUrl.toString()} >
      <View className='p-6 relative h-full flex ' >
        <View className='flex flex-row justify-between bg-white py-5'>
          <View className='flex flex-row justify-between'>
            <Image source={{ uri: tempUrl }} alt='temp' className='rounded-full h-16 w-16' />
            <View className='ml-4'>
              <Text className='text-lg font-bold'>Dinesh Bhatia</Text>
              <Text className='text-sm text-gray-500'>Online</Text>
            </View>

          </View>

          <Entypo name="dots-three-vertical" size={24} color="black" />
        </View>
    
        <View className='p-5 bg-white w-screen  rounded-2xl flex flex-row items-center  gap-3 absolute bottom-16 self-center'

        
        
        >
          <FontAwesome name="plus-circle" size={26} color="black" />
          <TextInput placeholder='Type a message' className='text-lg px-4 py-2 border-none w-2/4' style={{
            borderWidth: 0,

            fontSize: 18,
            paddingHorizontal: 16,
            paddingVertical: 8,
          }} />
          <View className='flex flex-row items-center gap-4 ml-auto'>
            <Entypo name="emoji-happy" size={26} color="black" />
            <FontAwesome name="microphone" size={26} color="black" className='p-2 px-3 bg-blue-500 rounded-2xl' />
          </View>


        </View>
   
      </View>
    </SafeScreenWrapper>
  )
}

export default Chat

const styles = StyleSheet.create({})