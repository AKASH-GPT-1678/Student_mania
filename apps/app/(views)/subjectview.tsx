import { useLocalSearchParams } from 'expo-router';
import React from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { TextInput } from 'react-native';
import SafeScreenWrapper from '../wrapper/safescreenwrapper';
import Feather from '@expo/vector-icons/Feather';
import { subjectData2 } from '../tempdata/subject';

const SubjectView = () => {
    const { id } = useLocalSearchParams();
    return (
        <SafeScreenWrapper>
            <View style={{ width: "100%" }}>
                <TextInput placeholder='Search' style={styles.input} />


                <View style={{ marginTop: 10 }}>
                    <FlatList
                        data={subjectData2}
                        contentContainerStyle={styles.container}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <View style={styles.cardIcon}>
                                    {item.icon}
                                </View>
                                <View style={styles.cardInfo}>
                                    <Text style={styles.heading}>{item.heading}</Text>
                                    <Text>
                                        {item.subject}
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
        marginTop: 20,

        width: "90%",
        borderColor: "grey",
        borderWidth: 4,
        borderRadius: 30
    },
    container: {
        marginTop: 30,
        gap: 16,
        paddingHorizontal: 10

    },
    card: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        padding: 16,
        minHeight: 120,
        paddingHorizontal: 20,
        backgroundColor: "#F2F2F2",
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
