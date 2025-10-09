import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AttendanceView from '../cards/attendanceAnimation'

const Atendance = () => {
  return (
    <View style={{backgroundColor : "white", height : "100%" }}>
      <AttendanceView/>
    
    </View>
  )
}

export default Atendance

const styles = StyleSheet.create({});