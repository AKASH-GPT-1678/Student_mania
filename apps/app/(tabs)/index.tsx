import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '../utils/button';
import { router } from 'expo-router';

const IndexPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button title='Login' onPress={() => router.push('/signin')} width={120} />
      </View>
    </View>
  )
}

export default IndexPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",

  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end", // pushes content to right side
    paddingHorizontal: 20,      // adds some spacing from right edge
  
  },
});
