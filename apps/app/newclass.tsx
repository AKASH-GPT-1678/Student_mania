import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button, TextInput } from 'react-native-paper';
import Entypo from '@expo/vector-icons/Entypo';
const NewClass = () => {
    const [className, setClassName] = React.useState('');
    const [section, setSection] = React.useState('');
    const [room, setRoom] = React.useState('');
    const [subject, setSubject] = React.useState('');

    const handleSubmit = () => {
        console.log({
            className,
            section,
            room,
            subject,
        });
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
                        <Button mode="contained" buttonColor="#468FCC" className="px-4">
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