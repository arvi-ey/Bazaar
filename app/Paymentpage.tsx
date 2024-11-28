import { StyleSheet, Text, View, Dimensions, Image, FlatList, TouchableOpacity } from 'react-native'
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
const Paymentpage = () => {
    const theme = useColorScheme();
    const Background = theme === "dark" ? Colors.BLACK : Colors.WHITE
    const FontColor = theme === "dark" ? Colors.WHITE : Colors.BLACK
    const dispatch = useDispatch<AppDispatch>();
    const { item } = useLocalSearchParams()
    const parsedItem = typeof item === 'string' ? JSON.parse(item) : null;

    const getDateAfterDays = (days: number | null | undefined) => {
        if (!days) return
        const today = new Date();
        today.setDate(today.getDate() + days);
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        };
        return today.toLocaleDateString('en-US', options);
    }
    return (
        <View style={{ flex: 1, gap: 10, alignItems: "center", width, backgroundColor: Background }}>
            <View style={{ width, height: 50, flexDirection: 'row', paddingLeft: 20, gap: 20, marginTop: 10, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => router.push("/(tabs)/Cart")}>
                    <Ionicons name="arrow-back-outline" size={30} color={FontColor} />
                </TouchableOpacity>
                <Text style={{ fontFamily: Font.Medium, color: FontColor, fontSize: 25 }}>Payment</Text>
            </View>
            <View style={{ height: 150, width: width - 10, justifyContent: "center", flexDirection: "row", borderWidth: 1, borderBottomColor: FontColor }}>
                <View style={{ width: "40%", }} >
                    <Image source={{ uri: parsedItem.image }} style={{ height: 100, width: "100%", borderRadius: 10, resizeMode: "center" }} />
                </View>
                <View style={{ width: "60%", }}>
                    <View style={{ gap: 5 }}>
                        <Text style={{ color: FontColor, fontFamily: Font.Regular, fontSize: 15 }}>{parsedItem.title}</Text>
                        <Text style={{ color: FontColor, fontFamily: Font.Medium, fontSize: 15, opacity: 0.7, }}>SIze:{parsedItem.size}</Text>
                        <View style={{ flexDirection: 'row', gap: 10 }} >
                            <Text style={{ color: Colors.BLACK, fontFamily: Font.Medium, fontSize: 15, backgroundColor: Colors.MAIN_COLOR, paddingHorizontal: 5, width: 60, borderRadius: 5 }}>₹{parsedItem.subTotal}</Text>
                            <Text style={{ color: FontColor, fontFamily: Font.Medium, fontSize: 15, opacity: 0.7, }}>{parsedItem.count} items</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                            <Text style={{ color: FontColor, fontFamily: Font.Medium, fontSize: 10, opacity: 0.7 }}>Delivery by {getDateAfterDays(parsedItem.deliveryTime)}</Text>
                        </View>
                    </View>
                </View>
            </View >
            <View style={{ width, alignItems: 'center' }}>
                <TouchableOpacity style={{
                    flexDirection: "row", gap: 10, width: 200, justifyContent: 'center', borderRadius: 5,
                    alignItems: 'center', borderWidth: 1, backgroundColor: Colors.MAIN_COLOR
                }} >
                    <Ionicons name="add-outline" size={24} color={Colors.BLACK} />
                    <Text style={{ color: Colors.BLACK, fontFamily: Font.Regular }}>Add address</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Paymentpage

const styles = StyleSheet.create({})