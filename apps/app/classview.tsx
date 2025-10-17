import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useGetAxios } from './utils/getaxios';
import SafeScreenWrapper from './wrapper/safescreenwrapper';
import ProductNotFound from './components/not-found';
import LoadingScreen from './components/loadingScreen';
import ClassBanner from './components/classbanner';
import { ClassData } from './types/loadData';

const Class = () => {
  const imageUrls = [
  "https://studiess.s3.ap-south-1.amazonaws.com/education_2.jpg",
  "https://studiess.s3.ap-south-1.amazonaws.com/education_3.jpg",
  "https://studiess.s3.ap-south-1.amazonaws.com/education_4.jpg",
  "https://studiess.s3.ap-south-1.amazonaws.com/education_5.jpg",
  "https://studiess.s3.ap-south-1.amazonaws.com/latest.jpg"
];


  const { data, error, loading } = useGetAxios('api/class/classes');

  if (error) return <ProductNotFound />;
  if (loading) return <LoadingScreen />;
  return (
    <SafeScreenWrapper>

      <View>

        <FlatList
          data={data as ClassData[]}
          renderItem={({ item ,index}) => (


            <ClassBanner className={item.name} imgUrl={imageUrls[index]} teacherName={item.subject} classDescription={item.subject} />
          )}
          keyExtractor={(item) => item.id}
        // ListHeaderComponent={


        // }
        />
      </View>
    </SafeScreenWrapper>
  )
}

export default Class;

const styles = StyleSheet.create({})