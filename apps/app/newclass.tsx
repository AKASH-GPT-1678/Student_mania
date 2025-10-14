import { StyleSheet, Text, View, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button, TextInput } from 'react-native-paper';
import Entypo from '@expo/vector-icons/Entypo';
import { useAppSelector } from './redux/reduxhooks';
import { ENV } from './utils/ENV';
import axios from 'axios';
const NewClass = () => {
    const [className, setClassName] = React.useState('');
    const [section, setSection] = React.useState('');
    const [room, setRoom] = React.useState('');
    const [subject, setSubject] = React.useState('');
    const token = useAppSelector((state) => state.user.token);

    const handleSubmit = async () => {
        const payload = { className, section, room, subject };

        try {
            const response = await axios.post(
                `${ENV.BASE_URL}/class/create`, 
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, 
                    },
                }
            );

            if (response.status === 201) {
                Alert.alert('Success', 'Class created successfully!');
                console.log(response.data);
            } else {
                Alert.alert('Error', 'Unexpected response from server');
            }
        } catch (error: any) {
            console.error('Axios Error:', error.response || error.message);
            const message =
                error.response?.data?.message || 'Something went wrong!';
            Alert.alert('Error', message);
        }
    };
    return (
        <View>
            <View className='bg-gray-300'>
                <View className='bg-gray-300 flex flex-row justify-between items-center p-6 mt-10'>
                    <View className='flex flex-row gap-3'>
                        <Ionicons name="arrow-back" size={24} color="black" />
                        <Text className='text-2xl '>Create class</Text>

                    </View>
                    <View className='flex flex-row gap-2 items-center'>
                        <Button mode="contained" buttonColor="#468FCC" className="px-4" onPress={handleSubmit}>
                            Create
                        </Button>
                        <Entypo name="dots-three-vertical" size={24} color="black" />

                    </View>
                </View>
            </View>

            <View className='px-4 flex gap-4 mt-6'>

                <TextInput
                    label="Class Name (required)"
                    mode="outlined"
                    value={className}
                    onChangeText={setClassName}
                    className="p-2"
                />

                <TextInput
                    label="Section"
                    mode="outlined"
                    value={section}
                    onChangeText={setSection}
                    className="p-2"
                />

                <TextInput
                    label="Room"
                    mode="outlined"
                    value={room}
                    onChangeText={setRoom}
                    className="p-2"
                />

                <TextInput
                    label="Subject"
                    mode="outlined"
                    value={subject}
                    onChangeText={setSubject}
                    className="p-2"
                />


            </View>
        </View>


    )
}

export default NewClass

const styles = StyleSheet.create({})