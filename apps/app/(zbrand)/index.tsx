import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeScreenWrapper from '../wrapper/safescreenwrapper'
import { useLocalSearchParams } from 'expo-router'

const Index = () => {
  const { verified} = useLocalSearchParams();

  if(!verified) return <Text>You are not verified</Text>;
  return (
    <SafeScreenWrapper>
    <View>
      <Text>Index</Text>
    </View>
    </SafeScreenWrapper>
  )
}

export default Index

const styles = StyleSheet.create({})