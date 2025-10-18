import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeScreenWrapper from '../wrapper/safescreenwrapper';
import { useLocalSearchParams } from 'expo-router';
import AssignmentForm from '../components/newclasswork';
import { useSearchParams } from 'expo-router/build/hooks';
import DatePicker from 'react-native-date-picker'
import { useGetAxios } from '../utils/getaxios';
const Classwork = () => {
  const [showForm, setShowForm] = React.useState(false);
  const [dueDate, setDueDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false)
  const form = useSearchParams().get('form');
  const classId = useSearchParams().get('classId');

  const {} = useGetAxios('api/class/classes');





  // if (form) return <AssignmentForm classIdd='' />;


  return (
    <SafeScreenWrapper >
      <View >
        <Text>Classwork</Text>

      </View>
    </SafeScreenWrapper>
  )
}

export default Classwork;

const styles = StyleSheet.create({})