import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TextInput } from 'react-native-paper';

const NewClass = () => {
    return (
        <View>
            <View className='bg-gray-300'>
                <View className='bg-gray-300 flex flex-row justify-between p-6 mt-10'>
                    <View className='flex flex-row gap-3'>
                        <Ionicons name="arrow-back" size={24} color="black" />
                        <Text className='text-2xl '>Create class</Text>

                    </View>
                </View>
            </View>

            <View className='px-4 flex gap-4 mt-6'>

                <TextInput label="Class Name (required)" mode="outlined" className='p-2' />
                <TextInput label="Section" mode="outlined" className='p-2' />
                <TextInput label="Room" mode="outlined" className='p-2' />
                <TextInput label="Subject" mode="outlined" className='p-2' />

            </View>
        </View>


    )
}

export default NewClass

const styles = StyleSheet.create({})