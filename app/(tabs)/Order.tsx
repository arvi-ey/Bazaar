import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Font } from '@/Font'
import { Colors } from '@/Theme'
import { useColorScheme } from '@/hooks/useColorScheme';
import LottieView from 'lottie-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Redux/Store';
import { GetUserOrder } from '@/Redux/Slice/orderSlicer';
import { router, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
const { width, height } = Dimensions.get('window')
const Order = () => {
    const theme = useColorScheme();
    const dispatch = useDispatch<AppDispatch>();
    const { address } = useSelector((state: RootState) => state.address)
    const { orderItems } = useSelector((state: RootState) => state.order)
    const { uid } = useSelector((state: RootState) => state.auth)

    const Background = theme === "dark" ? Colors.BLACK : Colors.WHITE
    const FontColor = theme === "dark" ? Colors.WHITE : Colors.BLACK

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
        <>
            {orderItems && Array.isArray(orderItems) && orderItems.length < 1 ? (
                <View style={{ flex: 1, gap: 10, justifyContent: "center", alignItems: "center", width, backgroundColor: Background }}>
                    <LottieView
                        source={require('../../assets/images/EmptyOrder.json')}
                        autoPlay
                        loop
                        style={{ width: 350, height: 350 }}
                    />
                    <View style={{ width: width - 10, justifyContent: "center", alignItems: 'center' }}>
                        <Text style={{ color: FontColor, fontSize: 20, fontFamily: Font.Bold }}>
                            You have no orders yet. Place an order to get started.
                        </Text>
                    </View>
                </View>
            ) : (
                <View style={{ flex: 1, gap: 10, width, backgroundColor: Background }}>
                    <View style={{ width, height: 50, flexDirection: 'row', paddingLeft: 20, gap: 20, marginTop: 10, alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => router.push("/(tabs)/Cart")}>
                            <Ionicons name="arrow-back-outline" size={30} color={FontColor} />
                        </TouchableOpacity>
                        <Text style={{ fontFamily: Font.Medium, color: FontColor, fontSize: 25 }}>Orders</Text>
                    </View>
                    <ScrollView>
                        {orderItems && Array.isArray(orderItems) && orderItems.map((data, index) => {
                            return (
                                <TouchableOpacity activeOpacity={0.5} onPress={() => router.push(`productpage/${data.productId}`)} key={index} style={{ width: width, marginVertical: 20, alignItems: "center", flexDirection: "row", gap: 10, marginLeft: 20 }}>
                                    <Image source={{ uri: data.image }} style={{ height: 120, width: 120, borderRadius: 20 }} />
                                    <View style={{ gap: 5 }}>
                                        <View style={{ flexDirection: "row", gap: 10 }}>
                                            <Text style={{ color: FontColor, opacity: 0.5, fontFamily: Font.Regular }}>Size: {data.size}</Text>
                                            <Text style={{ color: FontColor, opacity: 0.5, fontFamily: Font.Regular }}>Qty: {data.quantity}</Text>
                                        </View>
                                        <Text style={{ color: FontColor, fontFamily: Font.Medium, fontSize: 18 }}>₹{data.totalPrice}</Text>
                                        <Text style={{ color: FontColor, opacity: 0.5, fontFamily: Font.Regular }}>Delivery by : {getDateAfterDays(data.deliveryTime)} </Text>
                                        <Text style={{ color: FontColor, opacity: 0.5, fontFamily: Font.Regular }}>Order: {data.orderStatus.toLowerCase()} </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>
            )}

        </>
    )
}

export default Order

const styles = StyleSheet.create({})