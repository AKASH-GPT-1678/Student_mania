import { StyleSheet,  View } from 'react-native'
import React from 'react'
import Button from '../utils/button';
import { router } from 'expo-router';
import { useAppDispatch, useAppSelector } from '../redux/reduxhooks';
import { checkToken } from '../utils/checkToken';
import { logout } from '../redux/userSlice';
const IndexPage = () => {
  const token = useAppSelector((state) => state.user.token);
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const dispatch = useAppDispatch();


  React.useEffect(() => {
    const verify = async () => {
      const result = await checkToken(token as string);
      if (!result) { dispatch(logout()); router.push('/signin'); }
    };
    verify();
  }, [token]);



  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        {

          isLoggedIn ? <Button title='New Class' onPress={() => router.push('/newclass')} width={120} /> :
            <Button title='Login' onPress={() => router.push('/signin')} width={120} />

        }


      </View>
      <View>

      </View>

    </View>
  )
}

export default IndexPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",

  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end", // pushes content to right side
    paddingHorizontal: 20,      // adds some spacing from right edge

  },
});
