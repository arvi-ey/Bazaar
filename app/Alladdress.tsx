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


const Alladdress = () => {
    const theme = useColorScheme();
    const { address } = useSelector((state: RootState) => state.address)
    const Background = theme === "dark" ? Colors.BLACK : Colors.WHITE
    const FontColor = theme === "dark" ? Colors.WHITE : Colors.BLACK
    const Dark = theme === "dark"
    const InputColor = Dark ? Colors.WHITE : Colors.BLACK
    const InputBG = Dark ? "#393C41" : "#F3F3F6"
    const dispatch = useDispatch<AppDispatch>();
    return (
        <View style={{ flex: 1, gap: 10, alignItems: "center", width, backgroundColor: Background }}>
            <View style={{ width, height: 50, flexDirection: 'row', paddingLeft: 20, gap: 20, marginTop: 10, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back-outline" size={30} color={FontColor} />
                </TouchableOpacity>
                <Text style={{ fontFamily: Font.Medium, color: FontColor, fontSize: 25 }}>All address</Text>
            </View>
            <View style={{ width }}>
                <TouchableOpacity
                    onPress={() => router.push({
                        pathname: "/Address"
                    })}
                    style={{
                        flexDirection: "row", gap: 5, width: 150, justifyContent: 'center', borderRadius: 5,
                        alignItems: 'center', backgroundColor: Colors.MAIN_COLOR, marginLeft: 10
                    }} >
                    <Ionicons name="add-outline" size={24} color={Colors.BLACK} />
                    <Text style={{ color: Colors.BLACK, fontFamily: Font.Regular }}>{address && address.length > 0 ? "Add new address" : "Add address"}</Text>
                </TouchableOpacity>
                <ScrollView contentContainerStyle={{}}>
                    {address && address.map((value, index) => {
                        return (
                            <View key={index} style={{ borderRadius: 8, backgroundColor: InputBG, padding: 10, width: width - 20, flexDirection: "row", marginLeft: 10, marginVertical: 10, }}>
                                <View style={{ width: "85%" }} >
                                    <Text style={{ color: FontColor, opacity: 0.7, fontFamily: Font.Regular, fontSize: 15 }}>
                                        {value.label}
                                    </Text>
                                    <View style={{ flexDirection: "row", gap: 10 }}>
                                        <Text style={{ color: FontColor, opacity: 0.7, fontFamily: Font.Regular, fontSize: 15 }}>
                                            {value.street},
                                        </Text>
                                        <Text style={{ color: FontColor, opacity: 0.7, fontFamily: Font.Regular, fontSize: 15 }}>
                                            {value.landmark}
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: "row", gap: 10 }}>
                                        <Text style={{ color: FontColor, opacity: 0.7, fontFamily: Font.Regular, fontSize: 15 }}>
                                            State: {value.state},
                                        </Text>
                                        <Text style={{ color: FontColor, opacity: 0.7, fontFamily: Font.Regular, fontSize: 15 }}>
                                            pincode: {value.pinCode}
                                        </Text>
                                    </View>
                                    <Text style={{ color: FontColor, opacity: 0.7, fontFamily: Font.Regular, fontSize: 15 }}>
                                        Address type: {value.addressType}
                                    </Text>
                                </View>
                                <View style={{ gap: 15, justifyContent: "center", alignItems: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => router.push({
                                            pathname: "/Address",
                                            params: { item: JSON.stringify(value) }
                                        })}
                                        activeOpacity={0.5} style={{ backgroundColor: Colors.MAIN_COLOR, paddingHorizontal: 5, borderRadius: 5, height: 20, justifyContent: 'center', alignItems: 'center', width: 40 }}>
                                        <Text style={{ color: Colors.BLACK, fontFamily: Font.Medium, fontSize: 10 }}>Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => value._id && dispatch(DeleteAddress(value._id))}
                                        activeOpacity={0.5} style={{ justifyContent: 'center', alignItems: 'center', height: 40, width: 40 }}>
                                        <AntDesign name="delete" size={20} color={Colors.EROR_TEXT} style={{ opacity: 0.7 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })}

                </ScrollView>
            </View>
        </View>
    )
}

export default Alladdress

const styles = StyleSheet.create({})