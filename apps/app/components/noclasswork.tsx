// NoClassworkFound.js
// Usage:
// <NoClassworkFound onPress={() => console.log('Refresh')} message="No classwork yet" />

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SafeScreenWrapper from '../wrapper/safescreenwrapper';

export default function NoClassworkFound({
    message = 'No Classwork found',
    showButton = true,
    buttonText = 'Refresh',
    onPress = null,
    style = {},
}) {
    return (
        <SafeScreenWrapper>
        <View style={[styles.container, style]} accessibilityRole="summary">
            <View style={styles.iconCircle} accessible={false}>
                <Text style={styles.iconEmoji}>📚</Text>
            </View>

            <Text style={styles.message} accessibilityRole="text">
                {message}
            </Text>

            {showButton && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onPress}
                    accessibilityRole="button"
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </TouchableOpacity>
            )}
        </View>
        </SafeScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 24,
        paddingHorizontal: 16,
        marginTop: 24,
    },
    iconCircle: {
        width: 84,
        height: 84,
        borderRadius: 42,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        backgroundColor: '#fafafa',
    },
    iconEmoji: {
        fontSize: 36,
    },
    message: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 12,
    },
    button: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#1976d2',
    },
    buttonText: {
        fontSize: 14,
        color: '#1976d2',
        fontWeight: '600',
    },
});
