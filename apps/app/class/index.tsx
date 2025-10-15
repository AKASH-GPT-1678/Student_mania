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
import LoadingScreen from '../components/loadingScreen';
import ProductNotFound from '../components/not-found';

;

const ClassWork = () => {
  const token = useAppSelector((state) => state.user.token);
  const [announcements, setAnnouncements] = React.useState<any>(null);
  const [announceLoading, setAnnounceLoading] = React.useState(false);






  const { data, loading, error } = useFetch(() => loadClass(token as string), true);

  async function loadAnnouncements() {
    if (!data?.id) return;

    setAnnounceLoading(true);

    try {
      const response = await axios.get(
        `${ENV.BASE_URL}/api/class/announcements/${data.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      if (response.data) {
        setAnnouncements(response.data);
      }
    } catch (error: any) {
      console.error('Failed to load announcements:', error.message || error);
    } finally {
      setAnnounceLoading(false);
    }
  };



  React.useEffect(() => {
    loadAnnouncements()

  }, [data])

  if (loading) return (<LoadingScreen />);

  if (error) return (<ProductNotFound />);








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
                type={item.category}
                title={item.title}

                announcement={item.description}
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

export default ClassWork;

const styles = StyleSheet.create({});
