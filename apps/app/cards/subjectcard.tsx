import { View, Text, StyleSheet, Platform } from 'react-native';


interface Props {
    subShortCut : string,
    subName : string
    ,
    color : string
}

export default function SubjectCard(props: Props) {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.subjectContainer}>
                <Text style={styles.underText}>{props.subShortCut}</Text>
            </View>
            <Text style={styles.subjectName}>
                {props.subName}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "white",
        maxWidth: 200,
        padding: 6,
        borderRadius: 10,

  
        elevation: 8,

  
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    subjectContainer: {
        backgroundColor: "#E57373",
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        maxWidth: 200,
        borderRadius: 10,
        padding : 10,
        marginTop: 10,
        
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    underText: {
        color: "black",
        fontSize: 50,
    },
    subjectName: {
        fontSize: 16,
        alignSelf: "center",
        fontWeight: "bold",
        marginTop: 8,
    }
});
