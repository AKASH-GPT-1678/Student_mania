import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import Button from '../utils/button';
import Entypo from '@expo/vector-icons/Entypo';
import axios from 'axios';
import { router } from 'expo-router';
interface Props {
    onPress: () => void
 }
const SubjectPopup = ({ onPress }: Props) => {
    const [subject, setSubject] = React.useState("");



    const handleAddSubject = async () => { 
        try {
            const response = await axios
            
        } catch (error) {
            
        }
    };
    return (
        <View style={styles.container}>
            <Entypo name="cross" size={30} color="red" style={{ alignSelf: "flex-end" }} onPress={onPress} />
            <TextInput placeholder='Search' style={styles.input} onChangeText={(text) => setSubject(text)} />
            <Button title='Add Subject' onPress={() => router.push('/signin')} width={120}/>


        </View>
    )
}

export default SubjectPopup;

const styles = StyleSheet.create({

    container: {


        backgroundColor: "white",
        padding: 16,
        minHeight: 120,
        width: "100%",
        elevation: 15,          // higher elevation = more visible
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd'

    },
    input: {
        paddingHorizontal: 24,
        paddingVertical: 10,

        alignItems: "center",
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 14,

        width: "90%",
        borderColor: "grey",
        borderWidth: 4,
        borderRadius: 30
    },
})