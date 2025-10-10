import { StyleSheet, Text, TextInput, View, Button, Pressable, Alert } from 'react-native'
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useSignIn, useSignUp } from '@clerk/clerk-expo';
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAppDispatch } from './redux/reduxhooks';

import axios from 'axios';
// import { login, setToken } from './store/slice/userSlice';
import { useDispatch } from 'react-redux';
import { login } from './redux/userSlice';
WebBrowser.maybeCompleteAuthSession();
const SignInn = () => {
    const googleOAuth = useOAuth({ strategy: "oauth_google" });
    const githubAuth = useOAuth({ strategy: "oauth_github" });
    const facebookAuth = useOAuth({ strategy: "oauth_facebook" });
    const [email, setEmail] = React.useState("");       // state for email
    const [password, setPassword] = React.useState(""); // state for password
    const [showPassword, setShowPassword] = React.useState(false);

    const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
    const dispatch = useDispatch();



    const handleSignIn = async (providerOAuth: any) => {
        try {
            const { createdSessionId, setActive } = await providerOAuth.startOAuthFlow();

            if (createdSessionId) {
                setActive?.({ session: createdSessionId });
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    };

    const handleManualSignIn = async () => {

        console.log(email, password)
        if (!BASE_URL) return { success: false, message: "BASE_URL is not defined" };
        if (!email || !password)
            return { success: false, message: "Email and password are required" };

        try {
            const response = await axios.post(`${BASE_URL}/api/auth/login`, {
                "email": email.toString(),
                "password": password.toString()
            }, {
                headers: {
                    "Content-Type": "application/json",
                },

            });
            console.log(response.data)


            if (response?.data?.success) {
                Alert.alert("Sucessfull SigniN ");
                dispatch(login({ id: response.data.id, token: response.data.access_token }));

                return { success: true, data: response.data };
            } else {
                return { success: false, message: response?.data?.message || "Login failed" };
            }
        } catch (error: any) {
            return { success: false, message: error.message || "Something went wrong" };
        }
    };






    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.sidedisplay} className='relative'>
                <Ionicons name="arrow-back" size={26} color="black" className='absolute left-4'
                    onPress={() => router.back()}



                />
                <Text style={styles.header}>BookBaazar</Text>


                <View style={styles.view1}>
                    <Text style={styles.loginTitle}>Login to your Account</Text>


                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your email"
                            placeholderTextColor="#A1A1A1"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(text) => setEmail(text)}

                        />
                    </View>


                    <View style={styles.passwordContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your password"
                            placeholderTextColor="#A1A1A1"
                            secureTextEntry={showPassword ? false : true}
                            autoCapitalize="none"
                            onChangeText={(text) => setPassword(text)}

                        />
                        <View style={styles.eyeIcons}>
                            {showPassword ? <AntDesign name="eye-invisible" size={24} color="black" onPress={() => setShowPassword(false)} /> :
                                <AntDesign name="eye" size={24} color="black" onPress={() => setShowPassword(true)} />}
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={styles.loginButton}
                            onPress={() => handleManualSignIn()}
                        >
                            <Text style={styles.loginButtonText}>Log In</Text>
                        </Pressable>
                    </View>



                    <View style={styles.forgotPasswordContainer}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </View>



                </View>
                <View style={{ marginTop: 32, display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <Text>--Or Sign in with--</Text>
                    <View className='mt-14 flex flex-row gap-10'>



                        <Pressable onPress={() => handleSignIn(googleOAuth)}>
                            <Image
                                source={require("../assets/images/google.png")}
                                style={{ height: 30, width: 30 }}
                            />
                        </Pressable>


                        <Pressable onPress={() => handleSignIn(facebookAuth)}>
                            <Image
                                source={require("../assets/images/facebook.png")}
                                style={{ height: 30, width: 30 }}
                            />
                        </Pressable>


                        <Pressable onPress={() => handleSignIn(githubAuth)}>
                            <Image
                                source={require("../assets/images/github.png")}
                                style={{ height: 30, width: 30 }}
                            />
                        </Pressable>


                    </View>

                    <View className='flex flex-row gap-1 mt-20'>
                        <Text>Dont't have an account ? </Text>
                        <Text className='font-bold text-blue-600'
                            onPress={() => router.push("/signup")}




                        >Sign Up</Text>
                    </View>

                </View>

                <View style={styles.brand}>
                    <Text className='font-bold text-blue-600' onPress={
                        () =>
                            router.push("/(zbrand)/brandsign")
                    }>Brand SignIn</Text>

                </View>



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
        position: "relative"
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
    brand: {
        position: 'absolute',


        bottom: 10

    },
    brandText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'blue',
        textAlign: 'center',
        marginBottom: 32,
    },
    eyeIcons: {
        position: 'absolute',
        top: 40,
        right: 16,
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
});
