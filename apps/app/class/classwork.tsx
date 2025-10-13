import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeScreenWrapper from '../wrapper/safescreenwrapper';
import { useLocalSearchParams } from 'expo-router';
import AssignmentForm from '../components/newclasswork';
const Projects = () => {
  const [showForm, setShowForm] = React.useState(false);
     const { form } = useLocalSearchParams();

   React.useEffect(() => {
 
    if (form) setShowForm(true);

  }, [])

  if (showForm) return <AssignmentForm />

 
  return (
    <SafeScreenWrapper >
      <View >
        <Text>IndexPage</Text>
        <Pressable onPress={() => setShowForm(true)}>
          <Text>New Classwork</Text>
        </Pressable>
      </View>
    </SafeScreenWrapper>
  )
}

export default Projects;

const styles = StyleSheet.create({})