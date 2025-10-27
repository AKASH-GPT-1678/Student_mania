import { StyleSheet, Text, TextInput, View, Pressable, Alert } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import axios from 'axios';
import { useOAuth } from "@clerk/clerk-expo";
import AntDesign from '@expo/vector-icons/AntDesign';

const SignUp = () => {
    const googleOAuth = useOAuth({ strategy: "oauth_google" });
    const githubAuth = useOAuth({ strategy: "oauth_github" });
    const facebookAuth = useOAuth({ strategy: "oauth_facebook" });
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [confirmPassword, setConfirmPassword] = React.useState<string>("");
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

    const [emptyError, setemptyError] = React.useState<boolean>()

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

    const handleSignUp = async () => {
        console.log(BASE_URL);
        if (!BASE_URL) {
            console.warn("No Base Url for Backend");
            return;
        }
        try {
            if (!email || !password || !confirmPassword) {
                setemptyError(true);
                return;
            } else {
                setemptyError(false);
            }
            if (password != confirmPassword) {
                console.log("Password and Confirm Password Should matrhc");
                return;
            }

            const response = await axios.post(`${BASE_URL}/api/auth/create`, {
                name: email,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            });

            console.log("User created:", response.data);
            if (response.data.success == true) {
                Alert.alert("Youve Signed up Sucessfully");
                router.push("/signin")
            }
            return response.data;


        } catch (error: any) {
            Alert.alert("Something Went Wrong");
            console.error("Sign up failed:", error.response?.data || error.message);
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
                    <Text style={styles.loginTitle}>Create your Account</Text>

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


                    <View style={styles.passwordContainer}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Confirm your password"
                            placeholderTextColor="#A1A1A1"
                            secureTextEntry={showPassword ? false : true}
                            autoCapitalize="none"
                            onChangeText={(text) => setConfirmPassword(text)}
                        />
                        <View style={styles.eyeIcons}>
                            {showPassword ? <AntDesign name="eye-invisible" size={24} color="black" onPress={() => setShowPassword(false)} /> :
                                <AntDesign name="eye" size={24} color="black" onPress={() => setShowPassword(true)} />}
                        </View>
                    </View>


                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={styles.loginButton}
                            onPress={() => handleSignUp()}
                        >
                            <Text style={styles.loginButtonText}>Sign Up</Text>
                        </Pressable>

                        {emptyError && <Text className='text-red-600 font-medium'>Values Cannot be empty</Text>}
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
                            onPress={() => router.push("/(tabs)")}




                        >Sign Up</Text>
                    </View>

                </View>

            </View>
        </SafeAreaView>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
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
        eyeIcons: {
        position: 'absolute',
        top: 40,
        right: 16,
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
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333333',
        marginBottom: 10,
    },
    passwordContainer: {
        marginBottom: 20,
        position: 'relative',
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
});
