import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SafeScreenWrapper from '../wrapper/safescreenwrapper';
import ClassBanner from '../utils/classbanner';

const IndexPage = () => {
    return (
        <SafeScreenWrapper >
            <View >
        
                <View style={{height :150 , paddingHorizontal: 10}}>
                <ClassBanner/>
                </View>
            </View>
        </SafeScreenWrapper>
    )
}

export default IndexPage

const styles = StyleSheet.create({});