import { Image, Keyboard, StyleSheet, FlatList, Platform, RefreshControl, SafeAreaView, Text, TextInput, Dimensions, View, ScrollView, NativeSyntheticEvent, NativeScrollEvent, StatusBar, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/Theme';
import { Font } from '@/Font';
const { height, width } = Dimensions.get("window")
import { useState, useEffect, useCallback } from 'react';
import { RootState } from '@/Redux/Store';
import { useSelector } from 'react-redux';
import Button from '../Components/Button';
import { router, Router } from 'expo-router';
import { useLocalSearchParams, } from 'expo-router';
import { useDispatch, } from 'react-redux';
import { AppDispatch } from '@/Redux/Store';
import { Ionicons } from '@expo/vector-icons';
import { GetOrderById } from '@/Redux/Slice/orderSlicer';
import Feather from '@expo/vector-icons/Feather';
import LottieView from 'lottie-react-native';

const Order = () => {
    const theme = useColorScheme();
    const dispatch = useDispatch<AppDispatch>()
    const { singleOrder } = useSelector((state: RootState) => state.order)
    const { id } = useLocalSearchParams()
    const Background = theme === "dark" ? Colors.BLACK : Colors.WHITE
    const FontColor = theme === "dark" ? Colors.WHITE : Colors.BLACK
    const MainColor = Colors.MAIN_COLOR
    const statuSColor = theme === "dark" ? Colors.INPUT_BACKGROUND_DARK : Colors.INPUT_BACKGROUND
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        dispatch(GetOrderById(id.toString()))
    }, [id, refresh])

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
    // console.log(singleOrder)

    function formatDate(dateString: string): string {
        const date = new Date(dateString);

        // Create an array for suffixes
        const daySuffixes = ["th", "st", "nd", "rd"];
        const day = date.getDate();
        const suffix = daySuffixes[(day % 10) > 3 || (day % 100 >= 11 && day % 100 <= 13) ? 0 : day % 10];

        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            weekday: "long"
        };

        // Format the date into "12 January 2025 Monday"
        const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

        return `${day}${suffix} ${formattedDate}`;
    }
    const orderStatus = ['PLACED', 'SHIPPED', 'OUT FOR DELIVERY', 'DELIVERED', 'CANCELLED', "RETURNED"]

    const onRefresh = useCallback(() => {
        setRefresh(true);
        setTimeout(() => {
            setRefresh(false);
        }, 1000);
    }, []);

    return (
        <View style={{ width, height, alignItems: 'center', backgroundColor: Background, }} >
            <View style={{ width, height: 50, flexDirection: 'row', paddingLeft: 20, gap: 20, marginTop: 10, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => router.push("/(tabs)/Order")}>
                    <Ionicons name="arrow-back-outline" size={30} color={FontColor} />
                </TouchableOpacity>
                <Text style={{ fontFamily: Font.Medium, color: FontColor, fontSize: 25 }}>Order detail</Text>
            </View>

            <Text style={{ color: FontColor, fontFamily: Font.Medium, fontSize: 12 }}>Pull down and  Refresh to get current Update</Text>
            {
                singleOrder &&

                <ScrollView contentContainerStyle={{ width, flex: 1, marginTop: 20, flexDirection: "row" }}

                    refreshControl={
                        <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
                    }>
                    <View style={{ width: 120, height: 450, paddingLeft: 20, }}>
                        <View style={{
                            height: 20, width: 5, borderRadius: 5,
                            backgroundColor: (singleOrder.orderStatus === "PLACED" || singleOrder.orderStatus === "SHIPPED" || singleOrder.orderStatus === "OUT" || singleOrder.orderStatus === "DELIVERED") ? Colors.MAIN_COLOR : statuSColor,
                            // backgroundColor: MainColor,
                            alignItems: "center", marginTop: 1
                        }} />
                        <View style={{
                            height: 90, borderRadius: 10, width: 5, backgroundColor: (singleOrder.orderStatus === "SHIPPED" || singleOrder.orderStatus === "OUT" || singleOrder.orderStatus === "DELIVERED") ? Colors.MAIN_COLOR : statuSColor,
                            alignItems: "center",
                        }}>
                            <View style={{ position: "relative", flexDirection: "row", backgroundColor: "", marginBottom: 10 }}>
                                <View style={{ height: 10, width: 10, borderRadius: 25, backgroundColor: MainColor, marginTop: -5, justifyContent: "center", alignItems: "center" }} >
                                    {singleOrder.orderStatus === "PLACED" ?
                                        <LottieView
                                            source={require('../../assets/images/point.json')}
                                            autoPlay
                                            loop
                                            style={{ width: 20, height: 20 }}
                                        />
                                        : null
                                    }
                                </View>
                                <View style={{ position: "absolute", left: 10, width: 85, }}>
                                    <Text style={{ fontFamily: Font.Regular, color: FontColor, fontSize: 12, marginLeft: 5, marginTop: -5, opacity: 1 }}>Order Placed</Text>
                                </View>
                            </View>

                        </View>
                        <View style={{
                            height: 90, borderRadius: 10, width: 5, backgroundColor: (singleOrder.orderStatus === "OUT" || singleOrder.orderStatus === "DELIVERED") ? Colors.MAIN_COLOR : statuSColor,
                            alignItems: "center", marginTop: -8
                        }}>
                            <View style={{ position: "relative", flexDirection: "row", backgroundColor: "", marginBottom: 10 }}>
                                <View style={{ height: 10, width: 10, borderRadius: 25, backgroundColor: MainColor, marginTop: -5, justifyContent: "center", alignItems: "center" }} >
                                    {singleOrder.orderStatus === "SHIPPED" ?
                                        <LottieView
                                            source={require('../../assets/images/point.json')}
                                            autoPlay
                                            loop
                                            style={{ width: 20, height: 20 }}
                                        />
                                        : null
                                    }
                                </View>
                                <View style={{ position: "absolute", left: 10, width: 85, }}>
                                    <Text style={{ fontFamily: Font.Regular, color: FontColor, fontSize: 12, marginLeft: 5, opacity: (singleOrder.orderStatus === "SHIPPED" || singleOrder.orderStatus === "OUT" || singleOrder.orderStatus === "DELIVERED") ? 1 : 0.5 }}>Order Shippted</Text>
                                </View>
                            </View>

                        </View>
                        <View style={{
                            height: 90, borderRadius: 10, width: 5, backgroundColor: (singleOrder.orderStatus === "DELIVERED") ? Colors.MAIN_COLOR : statuSColor,
                            alignItems: "center", marginTop: -8
                        }}>
                            <View style={{ position: "relative", flexDirection: "row", backgroundColor: "", marginBottom: 10 }}>
                                <View style={{ height: 10, width: 10, borderRadius: 25, backgroundColor: MainColor, marginTop: -5, justifyContent: "center", alignItems: "center" }} >
                                    {singleOrder.orderStatus === "OUT" ?
                                        <LottieView
                                            source={require('../../assets/images/point.json')}
                                            autoPlay
                                            loop
                                            style={{ width: 20, height: 20 }}
                                        />
                                        : null
                                    }
                                </View>
                                <View style={{ position: "absolute", left: 10, width: 85, }}>
                                    <Text style={{ fontFamily: Font.Regular, color: FontColor, fontSize: 12, marginLeft: 5, opacity: (singleOrder.orderStatus === "OUT" || singleOrder.orderStatus === "DELIVERED") ? 1 : 0.5 }}>Out for delivery</Text>
                                </View>
                            </View>

                        </View>
                        <View style={{
                            height: 90, borderRadius: 10, width: 5, backgroundColor: statuSColor,
                            alignItems: "center", marginTop: -8
                        }}>
                            <View style={{ position: "relative", flexDirection: "row", backgroundColor: "", marginBottom: 10 }}>
                                <View style={{ height: 10, width: 10, borderRadius: 25, backgroundColor: MainColor, marginTop: -5, justifyContent: "center", alignItems: "center" }} >
                                    {singleOrder.orderStatus === "DELIVERED" ?
                                        <LottieView
                                            source={require('../../assets/images/point.json')}
                                            autoPlay
                                            loop
                                            style={{ width: 20, height: 20 }}
                                        />
                                        : null
                                    }
                                </View>
                                <View style={{ position: "absolute", left: 10, width: 85, }}>
                                    <Text style={{ fontFamily: Font.Regular, color: FontColor, fontSize: 12, marginLeft: 5, opacity: (singleOrder.orderStatus === "DELIVERED") ? 1 : 0.5 }}>Item delivered</Text>
                                </View>
                            </View>

                        </View>
                        <View style={{ height: 90, borderRadius: 10, width: 5, backgroundColor: statuSColor, alignItems: "center", marginTop: -8 }}>
                            <View style={{ position: "relative", flexDirection: "row", backgroundColor: "", marginBottom: 10 }}>
                                <View style={{ height: 10, width: 10, borderRadius: 25, backgroundColor: MainColor }} />
                                <View style={{ position: "absolute", left: 10, width: 85, }}>
                                    <Text style={{ fontFamily: Font.Regular, color: FontColor, fontSize: 12, marginLeft: 5, opacity: 0.6 }}>Order cancelled</Text>
                                </View>
                            </View>

                        </View>
                        <View style={{ height: 90, borderRadius: 10, width: 5, alignItems: "center", marginTop: -8 }}>
                            <View style={{ position: "relative", flexDirection: "row", backgroundColor: "", }}>
                                <View style={{ height: 10, width: 10, borderRadius: 25, backgroundColor: MainColor }} />
                                <View style={{ position: "absolute", left: 10, width: 85, }}>
                                    <Text style={{ fontFamily: Font.Regular, color: FontColor, fontSize: 12, marginLeft: 5, opacity: 0.6 }}>Item Returned</Text>
                                </View>
                            </View>

                        </View>

                    </View>
                    <TouchableOpacity activeOpacity={0.8} style={{ flex: 1, height: 450, alignItems: "center" }} onPress={() => router.push(`productpage/${singleOrder.productId}`)}>
                        <Image source={{ uri: singleOrder?.image }} style={{ height: 350, width: "95%", borderRadius: 10 }} />
                        <View style={{ gap: 5, }}>
                            <Text style={{ color: FontColor, fontFamily: Font.Medium, fontSize: 20 }}>{singleOrder.productTitle}</Text>
                            <View style={{ flexDirection: "row", gap: 10 }}>
                                <Text style={{ color: FontColor, opacity: 0.8, fontFamily: Font.Regular, fontSize: 18 }}>Size: {singleOrder.size}</Text>
                                <Text style={{ color: FontColor, opacity: 0.8, fontFamily: Font.Regular, fontSize: 18 }}>Quantity: {singleOrder.quantity}</Text>
                            </View>
                            <Text style={{ color: FontColor, fontFamily: Font.Medium, fontSize: 18 }}>₹{singleOrder.totalPrice}</Text>
                            <Text style={{ color: FontColor, fontFamily: Font.Medium, opacity: 0.7 }}>Order placed on : {formatDate(singleOrder.orderDate)}</Text>
                            <Text style={{ color: FontColor, opacity: 0.7, fontFamily: Font.Regular }}>Delivery by : {getDateAfterDays(singleOrder.deliveryTime)} </Text>
                            <View style={{ alignItems: "center" }}>
                                <Text style={{ color: FontColor, opacity: 0.7, fontFamily: Font.Regular }}>Address : {singleOrder?.orderAddress}</Text>
                            </View>
                            <TouchableOpacity activeOpacity={0.5} style={{ backgroundColor: Colors.EROR_TEXT, justifyContent: "center", alignItems: "center", borderRadius: 7, marginTop: 12, paddingVertical: 5 }}>
                                <Text style={{ color: FontColor, fontFamily: Font.Medium, fontSize: 18 }}>Cancel Order</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </ScrollView>

            }
        </View >
    )
}

export default Order

const styles = StyleSheet.create({})