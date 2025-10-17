import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ImageBackground } from 'expo-image';

interface Props {
  imgUrl?: string,
  className: string,
  teacherName: string,
  classDescription: string
}
const ClassBanner = ({ imgUrl, classDescription, className, teacherName }: Props) => {
  const tempUrl = 'https://res.cloudinary.com/dffepahvl/image/upload/v1760341910/ov2jjlkawkcebfe6xpi0.jpg';
  return (
    <ImageBackground
      source={{ uri: imgUrl ?? tempUrl }}
      style={{ width: '100%', height: 150,  borderRadius: 10 }}
      resizeMode="cover"
      className="relative"
    >
      <View className="flex-1 justify-between p-4">

        <View>
          <Text className="text-3xl text-white font-bold">{className}</Text>
          <Text className="text-xl text-gray-200">{classDescription}</Text>
        </View>


        <View
          className="absolute bottom-0 left-0 right-0 py-3 px-4 rounded-t-2xl"
          style={{

          }}
        >
          <Text className="text-lg text-white font-semibold ">
            {teacherName}
          </Text>
        </View>
      </View>
    </ImageBackground>
  )
}

export default ClassBanner;

const styles = StyleSheet.create({

})