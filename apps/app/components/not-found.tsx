import { StyleSheet, View, Text, Pressable } from 'react-native'
import React from 'react';
import { Image } from 'react-native';
import { router } from 'expo-router';
const ProductNotFound = () => {
    return (
        <View className='flex flex-col items-center justify-center '>
            <Image source={require("../../assets/images/error.png")} alt="not-found-icon" className='h-48 w-72' />
            <Text className='font-bold text-3xl text-black  mt-4'>No Such Product Found</Text>
            <Text className='text-lg text-red-600  px-10 text-center mt-6'>The product you're looking may be out of stock or no more listed with our platform</Text>
            <Pressable className='p-2 bg-pink-700 px-10 py-5 mt-10 rounded-lg'
                onPress={() =>
                    router.replace({
                        pathname: "/(tabs)",
                        params: { "diverted": "true" }
                    })



                }



            >
                <Text className='text-center text-xl font-bold text-white'>Return Home</Text>
            </Pressable>

        </View>
    )
}

export default ProductNotFound;

const styles = StyleSheet.create({});