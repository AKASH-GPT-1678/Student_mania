import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import SubjectCard from "../cards/subjectcard";
import { subjectData } from "../tempdata/subject";
import { useRouter } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import SubjectPopup from "../cards/subjectPopup";
const Subjects = () => {
  const [newSubject, setNewSubject] = React.useState(false);
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Subjects</Text>
        <Entypo name="plus" size={30} color="black" onPress={() => setNewSubject(true)} />
      </View>

      <FlatList
        data={subjectData}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatList}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push({
              pathname: "/(views)",
              params: { id: item.subName }
            })}


          >
            <SubjectCard
              subName={item.subName}
              subShortCut={item.subShortCut}
              color={item.color}

            />
          </TouchableOpacity>
        )}
      />
    { newSubject &&  <View style={styles.subjectPop}>
        <SubjectPopup onPress={() => setNewSubject(false)} />
      </View> }
    </View>
  );
};

export default Subjects;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 16,
    position : "relative"
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between', // keeps texts apart
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  viewAll: {
    fontSize: 16,
    color: '#007AFF', // iOS blue look
  },

  flatList: {
    paddingBottom: 20, // adds some space at the bottom
  },
  row: {
    justifyContent: "space-between", // evenly spaces 2 items per row
  },
  subjectPop : {
    position : "absolute",
    top : 200,
    width : "100%",
    alignSelf : "center"

  }
});
