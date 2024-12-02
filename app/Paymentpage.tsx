import { StyleSheet, Text, View, Dimensions, Image, FlatList, TouchableOpacity, ScrollView, ScrollViewBase } from 'react-native'
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
import index from '../web/src/components/Analytics/index';


const Paymentpage = () => {
    const theme = useColorScheme();
    const { address } = useSelector((state: RootState) => state.address)
    const Background = theme === "dark" ? Colors.BLACK : Colors.WHITE
    const FontColor = theme === "dark" ? Colors.WHITE : Colors.BLACK
    const dispatch = useDispatch<AppDispatch>();
    const { item } = useLocalSearchParams()
    const parsedItem = typeof item === 'string' ? JSON.parse(item) : null;
    const promo = require("../assets/images/promo.png")
    const [selectCash, setSelectCash] = useState<boolean>(false)
    const Dark = theme === "dark"
    const InputBG = Dark ? "#393C41" : "#F3F3F6"

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


    const PaymentgateWay = [
        {
            name: "Google pay",
            image: require("../assets/images/google-pay.png")
        },
        {
            name: "Paytm",
            image: require("../assets/images/paytm.png")
        },
        {
            name: "Stripe",
            image: require("../assets/images/stripe.png")
        }
    ]
    return (
        <View style={{ height, gap: 10, alignItems: "center", width, backgroundColor: Background }}>
            <View style={{ width, height: 50, flexDirection: 'row', paddingLeft: 20, gap: 20, marginTop: 10, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => router.push("/(tabs)/Cart")}>
                    <Ionicons name="arrow-back-outline" size={30} color={FontColor} />
                </TouchableOpacity>
                <Text style={{ fontFamily: Font.Medium, color: FontColor, fontSize: 25 }}>Payment</Text>
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} >
                <View style={{ height: 150, width: width - 10, justifyContent: "center", flexDirection: "row", borderBottomColor: FontColor }}>
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
                    <View style={{ width, flexDirection: "row", justifyContent: "space-around" }}>

                        <TouchableOpacity
                            onPress={() => router.push({
                                pathname: "/Address"
                            })}
                            style={{
                                flexDirection: "row", gap: 5, width: 150, justifyContent: 'center', borderRadius: 5,
                                alignItems: 'center', backgroundColor: Colors.MAIN_COLOR
                            }} >
                            <Ionicons name="add-outline" size={24} color={Colors.BLACK} />
                            <Text style={{ color: Colors.BLACK, fontFamily: Font.Regular }}>{address && address.length > 0 ? "Add new address" : "Add address"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => router.push("/Alladdress")}
                            activeOpacity={0.5} style={{
                                flexDirection: "row", gap: 10, width: 150, justifyContent: 'center', borderRadius: 5,
                                alignItems: 'center', backgroundColor: Colors.MAIN_COLOR
                            }}>
                            <Text style={{ color: Colors.BLACK, fontFamily: Font.Regular }}>View all addresses</Text>
                        </TouchableOpacity>
                    </View>
                    {address && address.length > 0 ?
                        <View style={{ width: width - 10, marginLeft: 20, marginVertical: 5, }}>
                            <Text style={{ color: FontColor, opacity: 0.7, fontFamily: Font.Regular, fontSize: 15 }}>
                                {address[0].label}
                            </Text>
                            <View style={{ flexDirection: "row", gap: 10 }}>
                                <Text style={{ color: FontColor, opacity: 0.7, fontFamily: Font.Regular, fontSize: 15 }}>
                                    {address[0].street},
                                </Text>
                                <Text style={{ color: FontColor, opacity: 0.7, fontFamily: Font.Regular, fontSize: 15 }}>
                                    {address[0].landmark}
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row", gap: 10 }}>
                                <Text style={{ color: FontColor, opacity: 0.7, fontFamily: Font.Regular, fontSize: 15 }}>
                                    State: {address[0].state},
                                </Text>
                                <Text style={{ color: FontColor, opacity: 0.7, fontFamily: Font.Regular, fontSize: 15 }}>
                                    pincode: {address[0].pinCode}
                                </Text>
                            </View>
                            <Text style={{ color: FontColor, opacity: 0.7, fontFamily: Font.Regular, fontSize: 15 }}>
                                Address type: {address[0].addressType}
                            </Text>
                        </View>
                        : null}
                    <View style={{ width: width - 10, borderWidth: 0.7, paddingVertical: 20, borderBottomColor: FontColor, borderTopColor: FontColor }}>
                        <Text style={{ marginLeft: 10, color: FontColor, fontFamily: Font.Medium, fontSize: 18 }} >Offers</Text>
                        <View style={{ flexDirection: "row", marginLeft: 20, marginTop: 5, }}>
                            <Image source={promo} style={{ height: 20, width: 20 }} />
                            <View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "95%" }}>
                                    <Text style={{ marginLeft: 10, color: FontColor, fontFamily: Font.Regular, fontSize: 15 }}>Select a promo code</Text>
                                    <TouchableOpacity style={{ alignSelf: "flex-end" }}>
                                        <Text style={{ color: Colors.MAIN_COLOR, fontFamily: Font.Regular, fontSize: 15, }}>Apply promo</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ marginLeft: 10, color: FontColor, fontFamily: Font.Regular, fontSize: 11, opacity: 0.7 }}>Save ₹60 with code FRTGBVX</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ width: width - 10, paddingVertical: 10, gap: 15, borderWidth: 0.7, borderBottomColor: FontColor }}>
                        <View style={{ width: "90%", paddingLeft: 10, height: 50, flexDirection: "row", gap: 15, alignItems: "center" }}>
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10 }}>
                                <TouchableOpacity onPress={() => setSelectCash(!selectCash)} style={{ height: 20, width: 20, borderWidth: 1, borderColor: FontColor, borderRadius: 20, justifyContent: "center", alignItems: "center", }}>
                                    {selectCash ?
                                        <View style={{ height: 10, width: 10, backgroundColor: FontColor, borderRadius: 20 }} />
                                        : null
                                    }
                                </TouchableOpacity>
                                <Text style={{ color: FontColor, fontFamily: Font.Medium, fontSize: 18 }}>Cash on delivery(cash/UPI)</Text>
                            </View>
                            <Image source={require("../assets/images/money.png")} style={{ height: 30, width: 30 }} />
                        </View>
                    </View>
                    <View style={{ width: width - 10, paddingVertical: 5, gap: 5, borderWidth: 0.7, borderBottomColor: FontColor }}>
                        <TouchableOpacity style={{ width: "90%", paddingLeft: 10, height: 50, flexDirection: "row", gap: 10, alignItems: "center" }}>
                            <Image source={require("../assets/images/wallet_pay.png")} style={{ height: 20, width: 20 }} />
                            <Text style={{ color: FontColor, fontFamily: Font.Medium, fontSize: 18 }}>Pay through Bazaar wallet</Text>
                            <AntDesign name="down" size={12} color={FontColor} style={{ opacity: 0.7 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: "90%", paddingLeft: 10, height: 50, flexDirection: "row", gap: 10, alignItems: "center" }}>
                            <Image source={require("../assets/images/visa_pay.png")} style={{ height: 30, width: 30 }} />
                            <Text style={{ color: FontColor, fontFamily: Font.Medium, fontSize: 18 }}>Pay by card</Text>
                            <AntDesign name="down" size={12} color={FontColor} style={{ opacity: 0.7 }} />
                        </TouchableOpacity>
                        <View style={{ width: "90%", gap: 20, marginTop: 10, marginBottom: 10, flexDirection: "row" }}>
                            {
                                PaymentgateWay.map((data, index) => {
                                    return (
                                        <TouchableOpacity key={index} style={{ backgroundColor: InputBG, paddingHorizontal: 20, borderRadius: 7, marginLeft: 20, height: 50, justifyContent: "center", alignItems: "center" }}>
                                            <Image source={data.image} style={{ height: 40, width: 40 }} />
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </View>
                    <View style={{ width: width - 10, marginTop: 10, gap: 15 }} >
                        <View style={{ marginLeft: 10, flexDirection: "row", width: "90%", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ color: FontColor, fontFamily: Font.Medium, opacity: 0.7 }}>Item cost</Text>
                            <Text style={{ color: FontColor, fontFamily: Font.Medium, opacity: 0.7 }}>₹{parsedItem.subTotal}</Text>
                        </View>
                        <View style={{ marginLeft: 10, flexDirection: "row", width: "90%", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ color: FontColor, fontFamily: Font.Medium, opacity: 0.7 }}>Delivery Charge</Text>
                            <Text style={{ color: FontColor, fontFamily: Font.Medium, opacity: 0.7 }}>₹50</Text>
                        </View>
                        <View style={{ marginLeft: 10, flexDirection: "row", width: "90%", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ color: FontColor, fontFamily: Font.Medium, opacity: 0.7 }}>Taxes</Text>
                            <Text style={{ color: FontColor, fontFamily: Font.Medium, opacity: 0.7 }}>₹5</Text>
                        </View>
                        <View style={{ marginLeft: 10, flexDirection: "row", width: "90%", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ color: FontColor, fontFamily: Font.Medium, fontSize: 18 }}>Sub total</Text>
                            <Text style={{ color: FontColor, fontFamily: Font.Medium, fontSize: 18 }}>₹{(parsedItem.subTotal + 50 + 5)}</Text>
                        </View>
                    </View>
                    <Button
                        title='Make Payment'
                        activeOpacity={0.5}
                        buttonStyle={{ backgroundColor: Colors.MAIN_COLOR, height: 60, width: width - 50, marginTop: 20, justifyContent: "center", alignItems: "center", borderRadius: 7 }}
                        textStyle={{ color: Colors.BLACK, fontFamily: Font.Bold, fontSize: 18, }}
                    />
                </View >
            </ScrollView>
        </View>
    )
}

export default Paymentpage

const styles = StyleSheet.create({})