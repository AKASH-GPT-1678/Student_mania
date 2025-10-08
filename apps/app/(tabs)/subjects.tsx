import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SubjectCard from '../cards/subjectcard';

const Subjects = () => {
  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <Text>Subjects</Text>
      <SubjectCard subShortCut='JK' subName='Jammu and Kashmir' color='Orange'/>
    </View>
  )
}

export default Subjects;

const styles = StyleSheet.create({})