import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect, router } from 'expo-router'

const Classes = () => {

  React.useEffect(()=> {

    router.push('/class')

  }, []);
  return (
    <View>
      <Text>Classes</Text>
    </View>
  )
}

export default Classes

const styles = StyleSheet.create({})