import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '../utils/button';
import SafeScreenWrapper from '../wrapper/safescreenwrapper';

const Globals = () => {
    return (
        <SafeScreenWrapper>
            <View>
                <Text>Globals</Text>
            </View>
        </SafeScreenWrapper>
    )
}

export default Globals;

const styles = StyleSheet.create({});