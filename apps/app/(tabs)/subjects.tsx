import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import SubjectCard from "../cards/subjectcard";
import { subjectData } from "../tempdata/subject";
import { useRouter } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import SubjectPopup from "../cards/subjectPopup";
import { useAppSelector } from "../redux/reduxhooks";
import { useGetAxios } from "../utils/getaxios";
import ProductNotFound from "../components/not-found";
import LoadingScreen from "../components/loadingScreen";
import SubjectNotFound from "../components/no-subjects";
const Subjects = () => {
  const [newSubject, setNewSubject] = React.useState(false);
  const token = useAppSelector((state) => state.user.token)
  const [subjects, setSubjectData] = React.useState([]);
  const router = useRouter();

  const { data, error, loading } = useGetAxios('api/subject/loadSubjects');

  if (error) return <SubjectNotFound />

  if (loading) return <LoadingScreen />


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Subjects</Text>
        <Entypo name="plus" size={30} color="black" onPress={() => setNewSubject(true)} />
      </View>

      <FlatList
        data={data}
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
              subName={item.name}
              subShortCut={item.name.charAt(0) + item.name.charAt(item.name.length - 1)}
              color={item.color}

            />
          </TouchableOpacity>
        )}
      />
      {newSubject && <View style={styles.subjectPop}>
        <SubjectPopup onPress={() => setNewSubject(false)} />
      </View>}
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
    position: "relative"
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
  subjectPop: {
    position: "absolute",
    top: 200,
    width: "100%",
    alignSelf: "center"

  }
});
