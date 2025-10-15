import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { Switch, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
const OffersView = () => {
    const [isEnabled, setIsEnabled] = React.useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const offers = [
        {
            id: '1',
            brand: 'Nike',
            image: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
            category: 'Sportswear',
            discount: '40% OFF',
            description: 'On all running shoes & sneakers',
            validity: 'Till 31 Oct',
            location: 'All Stores',
        },
        {
            id: '2',
            brand: 'Adidas',
            image: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg',
            category: 'Apparel',
            discount: '30% OFF',
            description: 'On selected sportswear collection',
            validity: 'Till 20 Oct',
            location: 'Online & Stores',
        },
    ]

    const renderItem = ({ item }: any) => (
        <View className="bg-white rounded-2xl shadow p-4 mb-4 border border-gray-200">


            <View className="flex-row items-center gap-3">
                <Image source={{ uri: item.image }} className="h-16 w-16 rounded-full" />
                <View>
                    <Text className="text-xl font-bold text-gray-800">{item.brand}</Text>
                    <Text className="text-gray-500 text-sm">{item.category}</Text>
                </View>
            </View>

            {/* Offer Details */}
            <View className="mt-5">
                <Text className="text-gray-500">Offer</Text>
                <Text className="text-2xl font-bold text-red-500">{item.discount}</Text>
                <Text className="text-gray-600 mt-1">{item.description}</Text>
            </View>


            <View className="mt-5 flex-row justify-between items-center">
                <View className="flex-row gap-3">
                    <View className="bg-gray-100 rounded-full px-3 py-1">
                        <Text className="text-gray-700 text-sm">{item.validity}</Text>
                    </View>
                    <View className="bg-gray-100 rounded-full px-3 py-1">
                        <Text className="text-gray-700 text-sm">{item.location}</Text>
                    </View>
                </View>
                <Ionicons name="arrow-forward-circle" size={40} color="black" />
            </View>

        </View>
    )

    return (
        <View className="flex-1 bg-white p-4">
            <Text className="text-2xl font-bold mb-4">🔥 Brand OffersView</Text>
            <View className='flex flex-row justify-between items-center mb-14 px-2'>
                <Text className='font-bold text-xl'>
                    Enable Location
                </Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    className='absolute top-0 right-0'
                />

            </View>
            <FlatList
                data={offers}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    )
};

export default OffersView
