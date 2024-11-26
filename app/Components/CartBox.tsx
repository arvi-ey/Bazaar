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
import Button from '../Components/Button';
import { RemoveFromCart } from '@/Redux/Slice/cartSlicer';
import { router } from 'expo-router';
interface CartBoxProps {
    item: cartData; // Replace `cartData` with the exact type of your cart item
}
const CartBox: FC<CartBoxProps> = ({ item }) => {
    const theme = useColorScheme();
    const Background = theme === "dark" ? Colors.BLACK : Colors.WHITE
    const FontColor = theme === "dark" ? Colors.WHITE : Colors.BLACK
    const { cartitems } = useSelector((state: RootState) => state.cart)
    const delivery = require("../../assets/images/deliverytruck.png")
    const dispatch = useDispatch<AppDispatch>();
    const [count, setCount] = useState<number>(1)
    const [subtotal, setSubtotal] = useState<number>(Number(item.price.toFixed()))
    const RemoveFromcart = async (id: string) => {
        const result = await dispatch(RemoveFromCart(id))
    }

    useEffect(() => {
        setSubtotal(count * Number(item.price.toFixed()))
    }, [count])
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
        <View style={{ height: 350, width: width - 10, justifyContent: "center", flexDirection: "row", gap: 10, borderBottomColor: FontColor }}>
            <View style={{ width: "45%", }} >
                <Image source={{ uri: item.image }} style={{ height: 300, width: "100%", borderRadius: 10 }} />
            </View>
            <View style={{ width: "50%", }}>
                <View style={{ gap: 5 }}>
                    <Text style={{ color: FontColor, fontFamily: Font.Regular, fontSize: 20 }}>{item.title}</Text>
                    <Text style={{ color: FontColor, fontFamily: Font.Medium, fontSize: 15, opacity: 0.7, }}>SIze:{item.size}</Text>
                    <Text style={{ color: Colors.BLACK, fontFamily: Font.Medium, fontSize: 18, backgroundColor: Colors.MAIN_COLOR, paddingHorizontal: 10, width: 90, borderRadius: 5 }}>₹{item.price.toFixed()}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <View style={{ width: 20 }}>
                            <Image source={delivery} style={{ height: 20, width: 20 }} />
                        </View>
                        <Text style={{ color: FontColor, fontFamily: Font.Medium, fontSize: 10, opacity: 0.7 }}>Delivery by {getDateAfterDays(item.deliveryTime)}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", gap: 15, alignItems: "center", marginTop: 10 }} >
                    <TouchableOpacity activeOpacity={0.5}
                        onPress={() => {
                            setCount(prev => prev - 1)
                            if (count <= 1) {
                                setCount(1)
                                return
                            }
                        }}
                        style={{ width: 40, height: 40, borderRadius: 7, backgroundColor: Colors.MAIN_COLOR, justifyContent: "center", alignItems: 'center' }}>
                        <AntDesign name="minus" size={24} color={Colors.BLACK} />
                    </TouchableOpacity>
                    <Text style={{ color: FontColor, fontFamily: Font.Bold, fontSize: 20 }} >{count}</Text>
                    <TouchableOpacity activeOpacity={0.5}
                        onPress={() => setCount(prev => prev + 1)}
                        style={{ width: 40, height: 40, borderRadius: 7, backgroundColor: Colors.MAIN_COLOR, justifyContent: "center", alignItems: 'center' }}>
                        <AntDesign name="plus" size={24} color={Colors.BLACK} />
                    </TouchableOpacity>
                </View>
                <Button
                    title='Remove'
                    press={() => item._id && RemoveFromcart(item._id)}
                    buttonStyle={{ marginTop: 10, backgroundColor: Colors.EROR_TEXT, width: 100, justifyContent: "center", alignItems: 'center', height: 30, borderRadius: 7 }}
                    activeOpacity={0.5}
                    textStyle={{ color: Colors.WHITE, fontFamily: Font.Medium }}
                />
                <View style={{ flexDirection: "row", width: 150, justifyContent: "space-between", marginTop: 10 }}>
                    <Text style={{ fontFamily: Font.Medium, color: FontColor, fontSize: 15 }}>Subtotal:</Text>
                    <Text style={{ fontFamily: Font.Medium, color: FontColor, fontSize: 15 }}>₹ {subtotal}</Text>

                </View>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: 5, backgroundColor: Colors.MAIN_COLOR, width: 150, justifyContent: "center", alignItems: 'center', height: 50, borderRadius: 7 }}>
                    <Text style={{ color: Colors.BLACK, fontFamily: Font.Bold }}>Place Order</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CartBox

const styles = StyleSheet.create({})