import { useLocalSearchParams } from 'expo-router';
import React from 'react'
import { StyleSheet, View, Text,FlatList } from 'react-native';
import { TextInput } from 'react-native';
import SafeScreenWrapper from '../wrapper/safescreenwrapper';
import Feather from '@expo/vector-icons/Feather';
import { subjectData } from '../tempdata/subject';

const SubjectView = () => {
    const { id } = useLocalSearchParams();
    return (
        <SafeScreenWrapper>
            <View style={{ width: "100%" }}>
                <TextInput placeholder='Search' style={styles.input} />


                <View style={{ marginTop: 10 }}>
                    <FlatList
                        data={subjectData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <Feather name="globe" size={80} color="black" style={styles.cardIcon} />
                                <View style={styles.cardInfo}>
                                    <Text style={styles.heading}>Saved Notes</Text>
                                    <Text>
                                        Would you like me to show how to pass this onClick from your FlatList → SubjectCard
                                    </Text>
                                </View>
                            </View>
                        )}
                    />
                </View>


            </View>
        </SafeScreenWrapper>
    )
}

export default SubjectView;

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 24,
        paddingVertical: 10,

        alignItems: "center",
        alignSelf: "center",

        width: "90%",
        borderColor: "grey",
        borderWidth: 4,
        borderRadius: 30
    },
    card: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        padding: 16,
        alignItems: "center"
    },
    cardIcon: {
        width: "30%"
    },
    cardInfo: {
        width: "70%"
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold"
    }

});
