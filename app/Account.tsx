import { StyleSheet, Text, View, Dimensions, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { Font } from '@/Font'
import { Colors } from '@/Theme'
import { useColorScheme } from '@/hooks/useColorScheme';
import LottieView from 'lottie-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Redux/Store';
import { cartData } from '@/Redux/Slice/cartSlicer';
const { width, height } = Dimensions.get('window')
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { RemoveFromCart } from '@/Redux/Slice/cartSlicer';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import Button from './Components/Button';
import { DeleteAddress } from '@/Redux/Slice/addressSlicer';
const Account = () => {
    const theme = useColorScheme();
    const { address } = useSelector((state: RootState) => state.address)
    const Background = theme === "dark" ? Colors.BLACK : Colors.WHITE
    const FontColor = theme === "dark" ? Colors.WHITE : Colors.BLACK
    const Dark = theme === "dark"
    const InputColor = Dark ? Colors.WHITE : Colors.BLACK
    const InputBG = Dark ? "#393C41" : "#F3F3F6"
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.user)
    const Image_data = "https://images.unsplash.com/photo-1587778082149-bd5b1bf5d3fa?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3"

    const profileData = [
        {
            name: "Shipping addresses",
            image: require("../assets/images/shipping.png")
        },
        {
            name: "Orders",
            image: require("../assets/images/order1.png")
        },
        {
            name: "My Wallet",
            image: require("../assets/images/wallet.png")
        },
        {
            name: "Promocodes",
            image: require("../assets/images/promo.png")
        },
        {
            name: "Security",
            image: require("../assets/images/security.png")
        },
        {
            name: "Settings",
            image: require("../assets/images/settings.png")
        },
        {
            name: "Terms, Policies and Licenses",
            image: require("../assets/images/terms.png")
        },
    ]
    return (
        <ScrollView contentContainerStyle={{ flex: 1, gap: 10, alignItems: "center", width, backgroundColor: Background }}>
            <View style={{ width: width, flexDirection: "row", alignItems: "center", gap: 20, marginTop: 20 }}>
                <Image source={{ uri: user?.profile_picture ? user?.profile_picture : Image_data }} style={{ marginLeft: 20, resizeMode: "cover", height: 100, width: 100, borderRadius: 50, }} />
                <View>
                    <Text style={{ color: FontColor, fontFamily: Font.Medium, fontSize: 20, opacity: 0.7 }} >{user?.email}</Text>
                    <Text style={{ color: FontColor, fontFamily: Font.Medium, fontSize: 15, opacity: 0.7 }}>{user?.name}</Text>
                    <TouchableOpacity style={{ marginTop: 5, backgroundColor: Colors.MAIN_COLOR, height: 30, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 7 }}>
                        <Text style={{ color: Colors.BLACK, fontFamily: Font.Medium }} >Edit profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ width: width - 40, gap: 20, marginTop: 20 }} >
                {
                    profileData.map((data, index) => {
                        return (
                            <TouchableOpacity key={index} activeOpacity={0.5} style={{ height: 40, alignItems: 'center', flexDirection: 'row', gap: 20 }} >
                                <Image source={data.image} style={{ height: 20, width: 20, opacity: 0.7 }} />
                                <Text style={{ color: FontColor, fontFamily: Font.Medium, fontSize: 18, opacity: 0.7 }}>{data.name}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </ScrollView >
    )
}

export default Account

const styles = StyleSheet.create({})