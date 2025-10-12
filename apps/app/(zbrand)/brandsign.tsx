import { StyleSheet, Text, TextInput, View, Pressable, Alert } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import axios from 'axios';
import { useDispatch } from 'react-redux';


const SignInn = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
  const dispatch = useDispatch();



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sidedisplay}>
        <Ionicons
          name="arrow-back"
          size={26}
          color="black"
          style={styles.backIcon}
          onPress={() => router.back()}
        />

        <Text style={styles.header}>BookBaazar</Text>

        <View style={styles.view1}>
          <Text style={styles.loginTitle}>Login to your Account</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Brand Code</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your brand code"
              placeholderTextColor="#A1A1A1"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <View style={styles.passwordContainer}>
            <Text style={styles.label}>Brand Password</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your brand password"
              placeholderTextColor="#A1A1A1"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
            />
            <View style={styles.eyeIcons}>
              {showPassword ? (
                <AntDesign name="eye-invisible" size={24} color="black" onPress={() => setShowPassword(false)} />
              ) : (
                <AntDesign name="eye" size={24} color="black" onPress={() => setShowPassword(true)} />
              )}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Pressable style={styles.loginButton} >
              <Text style={styles.loginButtonText}>Log In</Text>
            </Pressable>
          </View>

          <View style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </View>
        </View>


        <Text style={styles.website}>
          If you don't have brand code then visit website www.theakashgupta.com to register 

        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignInn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    height: "100%",
  },
  sidedisplay: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 40,
    color: "#111",
  },
  view1: {
    width: "100%",
    maxWidth: 400,
  },
 website: {
  position: 'absolute',
  bottom: 20,              
  left: 0,
  right: 0,
  textAlign: 'center',
  fontSize: 16,
  fontWeight: '500',
  color: '#333333',
  paddingHorizontal: 20,  
},

  loginTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  passwordContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#F8F9FA',
    color: '#333333',
  },
  buttonContainer: {
    marginTop: 28,
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  forgotPasswordText: {
    fontSize: 15,
    color: '#007AFF',
    fontWeight: '500',
  },
  backIcon: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  eyeIcons: {
    position: 'absolute',
    top: 40,
    right: 16,
  },
});
