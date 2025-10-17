import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { use } from 'react';
import SafeScreenWrapper from '../wrapper/safescreenwrapper';
import ClassBanner from '../components/classbanner';
import AnnouncementCard from '../components/announcements';
import { router, useLocalSearchParams } from 'expo-router';
import useFetch, { loadClass } from '../hooks/loadClass';
import { useAppSelector } from '../redux/reduxhooks';
import { ENV } from '../utils/ENV';
import axios from 'axios';
import LoadingScreen from '../components/loadingScreen';
import ProductNotFound from '../components/not-found';
import { useSearchParams } from 'expo-router/build/hooks';
import { ClassData } from '../types/loadData';

;

const ClassWork = () => {
  const token = useAppSelector((state) => state.user.token);
  const [classData, setClassData] = React.useState<ClassData[] | null>(null);
  const [announceLoading, setAnnounceLoading] = React.useState(false);

  const searchParams = useSearchParams();

  const classId = searchParams.get('classId');

  const fetchClass = async () => {

    try {
      const response = await axios.get(`${ENV.BASE_URL}/api/class/load/${classId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });



      return response.data;

    } catch (error) {
      console.error("Error fetching class:", error);

      return null;
    }
  };




  if (!classId) return <ProductNotFound />



  const { data, loading, error } = useFetch(() => fetchClass(), classId ? true : false);

  if (loading) return <LoadingScreen />;

  if (error) return <ProductNotFound />















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
          {/* <ClassBanner /> */}
        </View>

        <View className='px-4 py-4  ' style={{ backgroundColor: "#D5DBE3" }}>
          <TouchableOpacity style={{ padding: 10, backgroundColor: "#2784F5" }} className='text-center rounded-xl'
            onPress={() => router.push({
              pathname: "/class/classwork",
              params: { form: 'true' }
            })}


          >
            <Text className='text-center'>New Classwork</Text>

          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 12, height: "100%", backgroundColor: "#D5DBE3" }}>
          <FlatList
            data={classData}
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
