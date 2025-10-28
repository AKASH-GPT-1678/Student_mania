import { StyleSheet,  View } from 'react-native'
import React from 'react'
import AttendanceView from '../cards/attendanceAnimation'
import AttendanceForm from '../components/attendanceForm'

const Atendance = () => {
  return (
    <View style={{backgroundColor : "white"}}>
      <AttendanceView/>

      <AttendanceForm/>
      
    
    </View>
  )
}

export default Atendance;

const styles = StyleSheet.create({});