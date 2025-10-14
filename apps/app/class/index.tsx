import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import SafeScreenWrapper from '../wrapper/safescreenwrapper';
import ClassBanner from '../components/classbanner';
import AnnouncementCard from '../components/announcements';
import { router } from 'expo-router';
import useFetch, { loadClass } from '../hooks/loadClass';
import { useAppSelector } from '../redux/reduxhooks';
import { ENV } from '../utils/ENV';
import axios from 'axios';

const announcements = [
  {
    id: 1,
    type: "Exam",
    announcement: "Math Midterm Exam will be held in Room 101 at 10:00 AM.",
    time: "2 days ago"
  },
  {
    id: 2,
    type: "Sports",
    announcement: "Football practice scheduled at the school field from 4:00 PM to 5:30 PM.",
    time: "1 day ago"
  },
  {
    id: 3,
    type: "Event",
    announcement: "Annual science exhibition will start at 9:00 AM in the auditorium.",
    time: "3 days ago"
  },
  {
    id: 4,
    type: "Exam",
    announcement: "Short history quiz covering chapters 5-7, starting at 11:00 AM in Room 202.",
    time: "1 day ago"
  },
  {
    id: 5,
    type: "Event",
    announcement: "Inter-class art competition at 2:00 PM in the art room.",
    time: "4 days ago"
  },
  {
    id: 6,
    type: "Sports",
    announcement: "Basketball match between Class 10A and 10B at 3:00 PM in the gym.",
    time: "2 days ago"
  }
];

const IndexPage = () => {
  const token = useAppSelector((state) => state.user.token);




  const { data, loading, error } = useFetch(() => loadClass(token as string), true);

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
          <ClassBanner />
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
            data={announcements}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <AnnouncementCard
                type={item.type}
                announcement={item.announcement}
                time={item.time}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        </View>
      </View>
    </SafeScreenWrapper>
  );
};

export default IndexPage;

const styles = StyleSheet.create({});
