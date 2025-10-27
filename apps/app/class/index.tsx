import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { use } from 'react';
import SafeScreenWrapper from '../wrapper/safescreenwrapper';
import ClassBanner from '../components/classbanner';
import AnnouncementCard from '../components/announcements';
import { router, useLocalSearchParams } from 'expo-router';
import useFetch, { loadClass } from '../hooks/loadClass';
import { useAppDispatch, useAppSelector } from '../redux/reduxhooks';
import { ENV } from '../utils/ENV';
import axios from 'axios';
import LoadingScreen from '../components/loadingScreen';
import ProductNotFound from '../components/not-found';
import { useSearchParams } from 'expo-router/build/hooks';
import { ClassData } from '../types/loadData';

;
import { fetchClassById } from '../redux/classReducer';

const ClassWork = () => {
  const token = useAppSelector((state) => state.user.token);
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const [classDataa, setClassData] = React.useState<ClassData[] | null>(null);
  const [announceLoading, setAnnounceLoading] = React.useState(false);
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();

  const classId = searchParams.get('classId');


  if (!classId) return <ProductNotFound />


  React.useEffect(() => {
    if (!isLoggedIn) return;
    dispatch(fetchClassById({ classId, token: token as string }));
  }, [classId]);



  const { classData, loading, error } = useAppSelector((state) => state.class)

  if (loading) return <LoadingScreen />;

  if (error) return <ProductNotFound />;
  if (!classData) return <ProductNotFound />















  return (
    <SafeScreenWrapper>
      <View>

        <View
          style={{
            height: 150,
            paddingHorizontal: 10,
            backgroundColor: "grey",
            marginBottom: 10
          }}
        >
          {/* {
            data && <ClassBanner className={data.name} imgUrl={data.image} teacherName={data.subject} classDescription={data.subject} />
          } */}
        </View>

        <View className='px-4 py-4' style={{ backgroundColor: "#D5DBE3" }}>
          <TouchableOpacity
            style={{ padding: 10, backgroundColor: "#2784F5" }}
            className='text-center rounded-xl'
            onPress={() =>
              router.push({
                pathname: "/class/classwork",
                params: { form: 'true' }
              })
            }
          >
            <View>
        
             
            </View>
            <Text className='text-center text-white'>New Classwork</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: "#2784F5",
              marginTop: 10,
            }}
            className='text-center rounded-xl'
            onPress={() =>
              router.push({
                pathname: '/class/newannouncement',
                // params: { classId: data.id }
              })
            }
          >
            <Text className='text-center text-white'>New Announcement</Text>
          </TouchableOpacity>
        </View>


        <View style={{ paddingHorizontal: 12, height: "100%", backgroundColor: "#D5DBE3" }}>
          <FlatList
            data={classDataa}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <AnnouncementCard
                type={item.subject}
                title={item.subject}

                announcement={item.subject}
                time={item.subject}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        </View>
      </View>
    </SafeScreenWrapper>
  );
};

export default ClassWork;

const styles = StyleSheet.create({});
