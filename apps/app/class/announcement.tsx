import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import SafeScreenWrapper from '../wrapper/safescreenwrapper';

const announcement = () => {
  return (
    <SafeScreenWrapper>
    <View>
      <Text>announcement</Text>
    </View>
    </SafeScreenWrapper>
  )
}

export default announcement

const styles = StyleSheet.create({})