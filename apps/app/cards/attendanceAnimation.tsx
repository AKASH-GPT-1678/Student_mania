import { View, StyleSheet, Text } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function AttendanceView() {

    return (
        <View style={styles.container}>
        
             
                <View style={styles.halfCircle}>
                    <Text style={styles.text}>
                        75%
                    </Text>

                </View>
          


        </View>

    )
};

const styles = StyleSheet.create({

    container: {
        display: "flex",

        alignItems: "center",
        backgroundColor: "white",
    
    },
    halfCircle: {
        marginTop: 100,
        width: 300,
        height: 150,
        borderColor: "red",
        borderWidth: 20,
        borderTopLeftRadius: 150,
        
        borderTopRightRadius: 150,
        borderLeftColor : "red",
        borderTopColor : "red",
        borderBottomColor : "white",
        borderRightColor : "green",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",


    },
    text: {
        fontSize: 30,
        fontWeight: "bold"
    }

});