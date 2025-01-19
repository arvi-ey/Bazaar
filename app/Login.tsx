import { ActivityIndicator, Alert, Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/Theme';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Redux/Store';
import { GetSingleProduct } from '@/Redux/Slice/productSlicer';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Font } from '@/Font';
const { height, width } = Dimensions.get("window")
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Router, router } from 'expo-router';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView, } from 'react-native-gesture-handler';
import Button from './Components/Button';
import { AppSignIn } from '@/Redux/Slice/authSlicer';
import { GetUserOnce } from '@/Redux/Slice/authSlicer';
import { useLocalSearchParams, } from 'expo-router';;
import { GetUserInfo } from '@/Redux/Slice/userSlicer';

export interface signInData {
    email: string;
    password: string;
}
const Login = () => {
    const [data, setData] = useState<signInData>({ email: "", password: "" })
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading, error } = useSelector((state: RootState) => state.auth)
    const theme = useColorScheme();
    const [hidepasword, setHidePassword] = useState<boolean>(true)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const Dark = theme === "dark" ? true : false
    const InputBG = Dark ? "#393C41" : "#F3F3F6"
    const InPutHeight = 60
    const InputColor = Dark ? Colors.WHITE : Colors.BLACK
    const InputFont = Font.Medium
    const InputFontSize = 18
    const IconColor = Dark ? Colors.WHITE : Colors.BLACK
    const LineBg = Dark ? Colors.WHITE : Colors.BLACK
    const apple = require("../assets/images/apple.png")
    const google = require("../assets/images/google.png")
    const facebook = require("../assets/images/facebook.png")
    const { id } = useLocalSearchParams()

    const { from } = useLocalSearchParams();
    const HandleSignUp = async () => {
        setErrorMessage(null)
        const result = await dispatch(AppSignIn(data))
        // console.log(result.payload)
        if (result?.payload?.user === false) {
            setErrorMessage(result.payload.message)
            return
        }
        if (result?.payload?.email === false) {
            router.push({
                pathname: "/Signup"
            })
        }
        if (result.payload._id) {
            await dispatch(GetUserInfo(result.payload._id));
            if (from === "home") {
                router.push({
                    pathname: '/(tabs)',
                })
            }
            if (id) {
                router.push({
                    pathname: `/productpage/${id}`,
                })

            }
        }
    }


    const HandleCheck = () => {
        if (from === "home") {
            console.log("this")
            router.push({
                pathname: '/(tabs)',
            })
        }
    }


    return (
        <View style={{ flex: 1, backgroundColor: Dark ? Colors.BLACK : Colors.WHITE, alignItems: 'center', paddingTop: 20 }} >
            <TouchableOpacity style={{ width }} onPress={() => router.back()} >
                <Ionicons name="chevron-back-outline" size={35} color={IconColor} style={{ opacity: 0.8, marginHorizontal: 10 }} />
            </TouchableOpacity>
            <View style={{ width: width - 40, marginTop: 10 }}>
                <Text style={{ fontFamily: Font.Bold, color: InputColor, fontSize: 30 }} >Login</Text>
                <Text style={{ fontFamily: Font.Medium, color: InputColor, fontSize: 15, opacity: 0.7 }} >Welcome back, please enter your details</Text>
            </View>
            <View style={{ marginTop: 30, width: width - 20, backgroundColor: InputBG, borderRadius: 8, height: InPutHeight, flexDirection: "row", alignItems: 'center' }}>
                <Fontisto name="email" size={28} color={IconColor} style={{ opacity: 0.8, marginHorizontal: 10 }} />
                <TextInput
                    style={{ height: "100%", color: InputColor, fontFamily: InputFont, width: "85%", alignItems: 'center', fontSize: InputFontSize }}
                    placeholder="Enter Email"
                    value={data?.email}
                    placeholderTextColor={Dark ? Colors.WHITE : Colors.BLACK}
                    onChangeText={(text) => setData({ ...data, email: text })}
                />
            </View>
            <View style={{ position: 'relative', marginTop: 30, width: width - 20, backgroundColor: InputBG, borderRadius: 8, height: InPutHeight, flexDirection: "row", alignItems: 'center' }}>
                <Ionicons name="lock-closed-outline" size={28} color={IconColor} style={{ opacity: 0.8, marginHorizontal: 10 }} />
                <TextInput
                    style={{ height: "100%", color: InputColor, fontFamily: InputFont, width: "75%", alignItems: 'center', fontSize: InputFontSize }}
                    placeholder="Enter Password"
                    value={data.password}
                    secureTextEntry={hidepasword}
                    onChangeText={(text) => setData({ ...data, password: text })}
                    placeholderTextColor={Dark ? Colors.WHITE : Colors.BLACK}
                />
                <TouchableOpacity onPress={() => setHidePassword(!hidepasword)} style={{ height: "100%", justifyContent: 'center' }} >
                    <Ionicons name={hidepasword ? "eye-off-outline" : "eye-outline"} size={24} color={IconColor} style={{ opacity: 0.8, marginHorizontal: 5 }} />
                </TouchableOpacity>
                {errorMessage ?
                    <View style={{ width: "100%", position: "absolute", bottom: -20 }}>
                        <Text style={{ color: Colors.EROR_TEXT, fontFamily: Font.Light, paddingLeft: 20 }}>{errorMessage}</Text>
                    </View> : null
                }
            </View>
            <View style={{ width: width - 30, flexDirection: 'row', justifyContent: "flex-end", marginTop: 10 }} >
                <TouchableOpacity>
                    <Text style={{ color: Colors.MAIN_COLOR, fontFamily: Font.Regular }}>Forgot passsword?</Text>
                </TouchableOpacity>
            </View>
            {
                loading ?
                    <View style={{ width: width - 40, alignItems: "center", justifyContent: "center", height: 50 }}>
                        <ActivityIndicator size='large' color={Colors.MAIN_COLOR} />
                    </View>
                    :
                    <Button
                        buttonStyle={{ marginTop: 10, borderRadius: 7, width: width - 40, backgroundColor: Colors.MAIN_COLOR, alignItems: "center", justifyContent: "center", height: 50 }}
                        title='Sign in'
                        press={HandleSignUp}
                        textStyle={{ color: Colors.BLACK, fontFamily: Font.Bold, fontSize: 25 }}
                    />
            }
            <View style={{ width, flexDirection: "row", alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                <View style={{ width: "35%", height: 1, opacity: 0.2, backgroundColor: LineBg }} />
                <Text style={{ fontFamily: Font.Regular, color: InputColor, marginHorizontal: 5, opacity: 0.5 }}>Or signin with</Text>
                <View style={{ width: "35%", height: 1, opacity: 0.2, backgroundColor: LineBg }} />
            </View>
            <View style={{ width, justifyContent: 'center', alignContent: 'center', flexDirection: "row", gap: 30, marginTop: 20 }} >
                <TouchableOpacity activeOpacity={0.2} style={{ backgroundColor: InputBG, height: 50, width: 50, borderRadius: 10, justifyContent: 'center', alignItems: "center" }}>
                    <Image source={apple} style={{ height: 30, width: 30 }} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.2} style={{ backgroundColor: InputBG, height: 50, width: 50, borderRadius: 10, justifyContent: 'center', alignItems: "center" }}>
                    <Image source={google} style={{ height: 30, width: 30 }} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.2} style={{ backgroundColor: InputBG, height: 50, width: 50, borderRadius: 10, justifyContent: 'center', alignItems: "center" }}>
                    <Image source={facebook} style={{ height: 30, width: 30 }} />
                </TouchableOpacity>
            </View>
            <View style={{ width, justifyContent: "center", flexDirection: 'row', marginTop: 30, gap: 5 }}>
                <Text style={{ fontFamily: Font.Regular, color: InputColor, opacity: 0.5 }}>Don't have an account ?</Text>
                <TouchableOpacity onPress={() => router.push({
                    pathname: '/Signup',
                })}>
                    <Text style={{ fontFamily: Font.Regular, color: Colors.MAIN_COLOR }} >Sign up</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({})
export default Login
