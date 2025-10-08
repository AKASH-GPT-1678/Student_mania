import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import SubjectCard from "../cards/subjectcard";
import { subjectData } from "../tempdata/subject";
import { useRouter } from "expo-router";
const Subjects = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subjects</Text>

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
              pathname : "/(views)/subjectview",
              params : {id : item.subName}
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
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  flatList: {
    paddingBottom: 20, // adds some space at the bottom
  },
  row: {
    justifyContent: "space-between", // evenly spaces 2 items per row
  },
});
