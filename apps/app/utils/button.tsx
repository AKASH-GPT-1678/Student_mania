import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

interface CustomButtonProps {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    backgroundColor?: string;
    textColor?: string;
    disabled?: boolean;
    width : number 

}

const Button: React.FC<CustomButtonProps> = ({
    title,
    onPress,
    backgroundColor = '#007AFF',
    textColor = '#fff',
    disabled = false,
    width = 100

}) => {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor }, { maxWidth: width }]}
            onPress={onPress}
            activeOpacity={0.8}
            disabled={disabled}
        >
            <Text style={[styles.text, { color: textColor }]}>{title}</Text>
        </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({
    button: {
        width: '90%',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
});
