import { ActivityIndicator, Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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
import Signin from '@/web/src/components/Signin';
import { GestureHandlerRootView, } from 'react-native-gesture-handler';
import Button from './Components/Button';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { signupUser } from '@/Redux/Slice/authSlicer';

interface RegisterState {
    name: string;
    email: string;
    phone_number: string;
    password: string;
}

interface ErrorText {
    value: string,
    message: string;
}

interface ServerError {
    value: string,
    message: string;
}
const Signup = () => {
    const [data, setData] = useState<RegisterState>({
        name: '',
        email: '',
        phone_number: '',
        password: '',
    })
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading, error } = useSelector((state: RootState) => state.auth)
    const [errorText, setErrortext] = useState<ErrorText>({ value: "", message: "" })
    const [serverErrorText, setServerErrorText] = useState<ServerError>({ value: "", message: "" })
    const [confirmPassword, setConfirmPssword] = useState<string>()
    const theme = useColorScheme();
    const [hidepasword, setHidePassword] = useState<boolean>(false)
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

    const HandleSignUp = async () => {
        const emailRegex = /^([a-z0-9._%+-]+)@([a-z0-9.-]+\.[a-z]{2,})$/;
        setErrortext({ value: "", message: "" })
        setServerErrorText({ value: "", message: "" })
        if (!data.name) {
            setErrortext({ ...errorText, value: "name", message: "Please enter your name" })
            return
        }
        if (!data.phone_number) {
            setErrortext({ ...errorText, value: "phone_number", message: "Please enter your phone number" })
            return
        }
        if (data.phone_number.length < 10) {
            setErrortext({ ...errorText, value: "phone_number", message: "Please enter a valid phone number" })
            return
        }
        if (!data.email) {
            setErrortext({ ...errorText, value: "email", message: "Please enter your email" })
            return
        }
        if (!emailRegex.test(data.email)) {
            setErrortext({ ...errorText, value: "email", message: "Please enter valid email" })
            return
        }
        if (!data.password) {
            setErrortext({ ...errorText, value: "password", message: "Please enter your password" })
            return
        }
        if (!confirmPassword) {
            setErrortext({ ...errorText, value: "confirmPassword", message: "Please confirm your password" })
            return
        }
        if (data.password !== confirmPassword) {
            setErrortext({ ...errorText, value: "confirmPassword", message: "Passoword an confirm password does not matched" })
            return
        }
        const result = await dispatch(signupUser(data))
        if (result.payload.user === false) {
            if (result.payload.error === "email") {
                setServerErrorText({ value: result.payload.error, message: result.payload.message })
                return
            }
            if (result.payload.error === "phone") {
                setServerErrorText({ value: result.payload.error, message: result.payload.message })
                return
            }
        }
        if (result.payload._id) {
            router.push({
                pathname: '/Login',
            })
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: Dark ? Colors.BLACK : Colors.WHITE, alignItems: 'center', paddingTop: 20 }} >
            <TouchableOpacity style={{ width }} onPress={() => router.back()} >
                <Ionicons name="chevron-back-outline" size={35} color={IconColor} style={{ opacity: 0.8, marginHorizontal: 10 }} />
            </TouchableOpacity>
            <View style={{ width: width - 40, marginTop: 10 }}>
                <Text style={{ fontFamily: Font.Bold, color: InputColor, fontSize: 30 }} >Register account</Text>
                <Text style={{ fontFamily: Font.Medium, color: InputColor, fontSize: 15, opacity: 0.7 }} >Welcome, please enter your details</Text>
            </View>
            <View style={{ position: "relative", marginTop: 30, width: width - 20, backgroundColor: InputBG, borderRadius: 8, height: InPutHeight, flexDirection: "row", alignItems: 'center' }}>
                <SimpleLineIcons name="user" size={24} color={IconColor} style={{ opacity: 0.8, marginHorizontal: 10 }} />
                <TextInput
                    style={{ height: "100%", color: InputColor, fontFamily: InputFont, width: "85%", alignItems: 'center', fontSize: InputFontSize }}
                    placeholder="Enter Name"
                    placeholderTextColor={Dark ? Colors.WHITE : Colors.BLACK}
                    value={data?.name}
                    onChangeText={(text) => setData({ ...data, name: text })}
                />
                {errorText.value === "name" ?
                    <View style={{ width: "100%", position: "absolute", bottom: -20 }}>
                        <Text style={{ color: Colors.MAIN_COLOR, fontFamily: Font.Light, paddingLeft: 20 }}>{errorText.message}</Text>
                    </View> : null
                }
            </View>
            <View style={{ position: "relative", marginTop: 30, width: width - 20, backgroundColor: InputBG, borderRadius: 8, height: InPutHeight, flexDirection: "row", alignItems: 'center' }}>
                <Ionicons name="phone-portrait-outline" size={28} color={IconColor} style={{ opacity: 0.8, marginHorizontal: 10 }} />
                <TextInput
                    style={{ height: "100%", color: InputColor, fontFamily: InputFont, width: "85%", alignItems: 'center', fontSize: InputFontSize }}
                    placeholder="Enter mobile Number"
                    placeholderTextColor={Dark ? Colors.WHITE : Colors.BLACK}
                    value={data?.phone_number}
                    onChangeText={(text) => setData({ ...data, phone_number: text })}
                />
                {errorText.value === "phone_number" ?
                    <View style={{ width: "100%", position: "absolute", bottom: -20 }}>
                        <Text style={{ color: Colors.MAIN_COLOR, fontFamily: Font.Light, paddingLeft: 20 }}>{errorText.message}</Text>
                    </View> : null
                }
                {
                    serverErrorText.value === "phone" ?
                        <View style={{ width: "100%", position: "absolute", bottom: -20 }}>
                            <Text style={{ color: Colors.EROR_TEXT, fontFamily: Font.Light, paddingLeft: 20 }}>{serverErrorText.message}</Text>
                        </View>
                        : null
                }
            </View>
            <View style={{ position: "relative", marginTop: 30, width: width - 20, backgroundColor: InputBG, borderRadius: 8, height: InPutHeight, flexDirection: "row", alignItems: 'center' }}>
                <Fontisto name="email" size={28} color={IconColor} style={{ opacity: 0.8, marginHorizontal: 10 }} />
                <TextInput
                    style={{ height: "100%", color: InputColor, fontFamily: InputFont, width: "85%", alignItems: 'center', fontSize: InputFontSize }}
                    placeholder="Enter Email"
                    placeholderTextColor={Dark ? Colors.WHITE : Colors.BLACK}
                    value={data?.email}
                    onChangeText={(text) => setData({ ...data, email: text })}
                />
                {errorText.value === "email" ?
                    <View style={{ width: "100%", position: "absolute", bottom: -20 }}>
                        <Text style={{ color: Colors.MAIN_COLOR, fontFamily: Font.Light, paddingLeft: 20 }}>{errorText.message}</Text>
                    </View> : null
                }
                {
                    serverErrorText.value === "email" ?
                        <View style={{ width: "100%", position: "absolute", bottom: -20 }}>
                            <Text style={{ color: Colors.EROR_TEXT, fontFamily: Font.Light, paddingLeft: 20 }}>{serverErrorText.message}</Text>
                        </View>
                        : null
                }
            </View>
            <View style={{ position: "relative", marginTop: 30, width: width - 20, backgroundColor: InputBG, borderRadius: 8, height: InPutHeight, flexDirection: "row", alignItems: 'center' }}>
                <Ionicons name="lock-closed-outline" size={28} color={IconColor} style={{ opacity: 0.8, marginHorizontal: 10 }} />
                <TextInput
                    style={{ height: "100%", color: InputColor, fontFamily: InputFont, width: "75%", alignItems: 'center', fontSize: InputFontSize }}
                    placeholder="Enter Password"
                    secureTextEntry={hidepasword}
                    placeholderTextColor={Dark ? Colors.WHITE : Colors.BLACK}
                    value={data?.password}
                    onChangeText={(text) => setData({ ...data, password: text })}
                />
                <TouchableOpacity onPress={() => setHidePassword(!hidepasword)} style={{ height: "100%", justifyContent: 'center' }} >
                    <Ionicons name={hidepasword ? "eye-off-outline" : "eye-outline"} size={24} color={IconColor} style={{ opacity: 0.8, marginHorizontal: 5 }} />
                </TouchableOpacity>
                {errorText.value === "password" ?
                    <View style={{ width: "100%", position: "absolute", bottom: -20 }}>
                        <Text style={{ color: Colors.MAIN_COLOR, fontFamily: Font.Light, paddingLeft: 20 }}>{errorText.message}</Text>
                    </View> : null
                }
            </View>
            <View style={{ position: 'relative', marginTop: 30, width: width - 20, backgroundColor: InputBG, borderRadius: 8, height: InPutHeight, flexDirection: "row", alignItems: 'center' }}>
                <Ionicons name="lock-closed-outline" size={28} color={IconColor} style={{ opacity: 0.8, marginHorizontal: 10 }} />
                <TextInput
                    style={{ height: "100%", color: InputColor, fontFamily: InputFont, width: "75%", alignItems: 'center', fontSize: InputFontSize }}
                    placeholder="Confirm Password"
                    secureTextEntry={hidepasword}
                    placeholderTextColor={Dark ? Colors.WHITE : Colors.BLACK}
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPssword(text)}
                />
                <TouchableOpacity onPress={() => setHidePassword(!hidepasword)} style={{ height: "100%", justifyContent: 'center' }} >
                    <Ionicons name={hidepasword ? "eye-off-outline" : "eye-outline"} size={24} color={IconColor} style={{ opacity: 0.8, marginHorizontal: 5 }} />
                </TouchableOpacity>
                {errorText.value === "confirmPassword" ?
                    <View style={{ width: "100%", position: "absolute", bottom: -20 }}>
                        <Text style={{ color: Colors.MAIN_COLOR, fontFamily: Font.Light, paddingLeft: 20 }}>{errorText.message}</Text>
                    </View> : null
                }
            </View>
            {
                loading ?
                    <View style={{ width: width - 40, alignItems: "center", justifyContent: "center", height: 50 }}>
                        <ActivityIndicator size='large' color={Colors.MAIN_COLOR} />
                    </View>
                    :
                    <Button
                        buttonStyle={{ marginTop: 30, borderRadius: 7, width: width - 40, backgroundColor: Colors.MAIN_COLOR, alignItems: "center", justifyContent: "center", height: 50 }}
                        title='Sign up'
                        press={HandleSignUp}
                        textStyle={{ color: Colors.BLACK, fontFamily: Font.Bold, fontSize: 25 }}
                    />
            }
            <View style={{ width, flexDirection: "row", alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                <View style={{ width: "35%", height: 1, opacity: 0.2, backgroundColor: LineBg }} />
                <Text style={{ fontFamily: Font.Regular, color: InputColor, marginHorizontal: 5, opacity: 0.5 }}>Or signup with</Text>
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
                <Text style={{ fontFamily: Font.Regular, color: InputColor, opacity: 0.5 }}>Already have an account ?</Text>
                <TouchableOpacity onPress={() => router.push({
                    pathname: '/Login',
                })}>
                    <Text style={{ fontFamily: Font.Regular, color: Colors.MAIN_COLOR }} >Sign in</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Signup

const styles = StyleSheet.create({})