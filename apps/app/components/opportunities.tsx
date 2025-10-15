import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
const opportunitiesData = [
    {
        id: 1,
        title: 'Frontend Developer',
        company: 'PixelSoft Labs',
        image: 'https://res.cloudinary.com/dffepahvl/image/upload/v1753534237/sdwv6uaqggpcnnufpmop.jpg',
    },
    {
        id: 2,
        title: 'Mobile App Engineer',
        company: 'TechVerse',
        image: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
    },
    {
        id: 3,
        title: 'UI/UX Designer',
        company: 'CreativeFlow',
        image: 'https://res.cloudinary.com/demo/image/upload/v1625405822/avatar3.jpg',
    },
    {
        id: 4,
        title: 'Data Analyst',
        company: 'Insightify',
        image: 'https://res.cloudinary.com/demo/image/upload/v1625405822/avatar2.jpg',
    },
    {
        id: 5,
        title: 'DevOps Engineer',
        company: 'CloudCore Systems',
        image: 'https://res.cloudinary.com/demo/image/upload/v1625405822/avatar1.jpg',
    },
];

const OppoutunitesItem = () => {
    const renderItem = ({ item }: any) => (
        <View className="bg-white rounded-2xl  shadow-sm p-4 mb-4 border border-gray-200 ">
            <View className="flex-row items-center gap-3">
                <Image source={{ uri: item.image }} className="rounded-full h-14 w-14" />
                <View>
                    <Text className="text-xl font-bold text-gray-800">{item.title}</Text>
                    <Text className="text-gray-500 text-base">{item.company}</Text>
                </View>
            </View>

            <View className='mt-6 flex flex-row justify-between'>
                <View>
                    <Text>Salary</Text>
                    <Text className='text-xl font-bold'>$25-$30</Text>

                </View>
                <View>
                    <Text className='font-bold'>Applicants</Text>
                    <View className='flex flex-row gap-2 items-center'>
                        <MaterialIcons name="contacts" size={24} color="orange" />
                        <Text className='text-2xl font-bold'>2666</Text>
                    </View>

                </View>

            </View>
            <View className='mt-5 flex flex-row justify-between'>
                <View className='flex flex-row gap-2'>
                    <Text>
                        Remote

                    </Text>
                    <Text>
                        Full Time

                    </Text>
                    <Text>
                        UI/UX Design

                    </Text>

                </View>
                <Ionicons name="arrow-forward-circle" size={50} color="black" />

            </View>
        </View>
    );

    return (
        <View className="flex-1 bg-gray-50 pt-2">
            <FlatList
                data={opportunitiesData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default OppoutunitesItem;
