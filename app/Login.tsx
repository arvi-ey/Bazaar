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
import { GestureHandlerRootView, } from 'react-native-gesture-handler';
import Button from './Components/Button';


const Login = () => {
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
                    placeholderTextColor={Dark ? Colors.WHITE : Colors.BLACK}
                />
            </View>
            <View style={{ marginTop: 30, width: width - 20, backgroundColor: InputBG, borderRadius: 8, height: InPutHeight, flexDirection: "row", alignItems: 'center' }}>
                <Ionicons name="lock-closed-outline" size={28} color={IconColor} style={{ opacity: 0.8, marginHorizontal: 10 }} />
                <TextInput
                    style={{ height: "100%", color: InputColor, fontFamily: InputFont, width: "75%", alignItems: 'center', fontSize: InputFontSize }}
                    placeholder="Enter Password"
                    secureTextEntry={hidepasword}
                    placeholderTextColor={Dark ? Colors.WHITE : Colors.BLACK}
                />
                <TouchableOpacity onPress={() => setHidePassword(!hidepasword)} style={{ height: "100%", justifyContent: 'center' }} >
                    <Ionicons name={hidepasword ? "eye-off-outline" : "eye-outline"} size={24} color={IconColor} style={{ opacity: 0.8, marginHorizontal: 5 }} />
                </TouchableOpacity>
            </View>
            <View style={{ width: width - 30, flexDirection: 'row', justifyContent: "flex-end", marginTop: 10 }} >
                <TouchableOpacity>
                    <Text style={{ color: Colors.MAIN_COLOR, fontFamily: Font.Regular }}>Forgot passsword?</Text>
                </TouchableOpacity>
            </View>
            <Button
                buttonStyle={{ marginTop: 10, borderRadius: 7, width: width - 40, backgroundColor: Colors.MAIN_COLOR, alignItems: "center", justifyContent: "center", height: 50 }}
                title='Sign in'
                textStyle={{ color: Colors.BLACK, fontFamily: Font.Bold, fontSize: 25 }}
            />
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
