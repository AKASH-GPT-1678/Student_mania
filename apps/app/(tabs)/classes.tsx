import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeScreenWrapper from '../wrapper/safescreenwrapper';
import { useLocalSearchParams } from 'expo-router';
import AssignmentForm from '../components/newclasswork';
const Classwork = () => {
  const [showForm, setShowForm] = React.useState(false);
  const { form } = useLocalSearchParams();



  React.useEffect(() => {

    if (form) setShowForm(true);

  }, [])

  if (showForm) return <AssignmentForm />;


  return (
    <SafeScreenWrapper >
      <View >
<AssignmentForm />
      </View>
    </SafeScreenWrapper>
  )
}

export default Classwork;

const styles = StyleSheet.create({})