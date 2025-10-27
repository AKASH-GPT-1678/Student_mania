import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import SafeScreenWrapper from '../wrapper/safescreenwrapper';
import { useLocalSearchParams } from 'expo-router';
import AssignmentForm from '../components/newclasswork';
import { useSearchParams } from 'expo-router/build/hooks';

import { useAppSelector } from '../redux/reduxhooks';

const Classwork = () => {
  const [showForm, setShowForm] = React.useState(false);
  const [dueDate, setDueDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false)
  const form = useSearchParams().get('form');
  const classId = useSearchParams().get('classId');
  const { classData } = useAppSelector((state) => state.class);


  if(form === 'true') return <AssignmentForm classIdd={classId as string} />









  return (
    <SafeScreenWrapper >
      <View >
        <FlatList
          data={classData?.assignments}
          renderItem={({ item }) => (
            <View>
              <Text>{item.title}</Text>
              <Text>{item.description}</Text>
              <Text>{item.attachments}</Text>
            </View>
          )}

        />
        <Text>{JSON.stringify(classData?.assignments)}</Text>

      </View>
    </SafeScreenWrapper>
  )
}

export default Classwork;

const styles = StyleSheet.create({})