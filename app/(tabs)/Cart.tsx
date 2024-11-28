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
import CartBox from '../Components/CartBox';

const Cart = () => {
    const theme = useColorScheme();
    const Background = theme === "dark" ? Colors.BLACK : Colors.WHITE
    const FontColor = theme === "dark" ? Colors.WHITE : Colors.BLACK
    const Checkout = theme === "dark" ? Colors.INPUT_BACKGROUND_DARK : Colors.INPUT_BACKGROUND
    const { cartitems } = useSelector((state: RootState) => state.cart)
    const [total, setTotal] = useState<number>()
    const [totalItem, setTotalItem] = useState<number>()
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        let data = 0
        let count = 0
        if (cartitems) {
            for (let i in cartitems) {
                if (cartitems[i].subTotal) {
                    data = data + cartitems[i].subTotal
                }
            }
            setTotal(data)
            for (let i in cartitems) {
                if (cartitems[i].count) {
                    count = count + cartitems[i].count
                }
            }
            setTotalItem(count)
        }
    }, [cartitems]);

    if (cartitems && cartitems.length <= 0) {
        return (
            <View style={{ flex: 1, gap: 10, justifyContent: "center", alignItems: "center", width, backgroundColor: Background }}>
                <LottieView
                    source={require('../../assets/images/Empty_Cart.json')}
                    autoPlay
                    loop
                    style={{ width: 350, height: 350 }}
                />
                <View style={{ width: width - 10, justifyContent: "center", alignItems: 'center', }}>
                    <Text style={{ color: FontColor, fontSize: 20, fontFamily: Font.Bold }}>Your cart is empty. Browse and add items to proceed with your order.</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, gap: 10, justifyContent: "center", alignItems: "center", width, backgroundColor: Background }}>
            <View style={{ width, height: 50, flexDirection: 'row', paddingLeft: 20, gap: 20, marginTop: 10, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => router.push("/(tabs)")}>
                    <Ionicons name="arrow-back-outline" size={30} color={FontColor} />
                </TouchableOpacity>
                <Text style={{ fontFamily: Font.Medium, color: FontColor, fontSize: 25 }}>Cart</Text>
            </View>
            <FlatList
                data={cartitems}
                renderItem={({ item }) => <CartBox item={item} />}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={{ height: 70, flexDirection: "row", width: width - 10, backgroundColor: Checkout, alignItems: 'center', justifyContent: "space-around" }} >
                <View style={{}}>
                    <Text style={{ color: FontColor, fontFamily: Font.Bold, fontSize: 20 }}>₹ {total}</Text>
                    <Text style={{ color: FontColor, fontFamily: Font.Medium, fontSize: 15, opacity: 0.5 }}>{totalItem} items</Text>
                </View>
                <Button
                    title='Make payment'
                    buttonStyle={{ backgroundColor: Colors.MAIN_COLOR, width: 200, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 7 }}
                    textStyle={{ color: Colors.BLACK, fontFamily: Font.Bold }}
                />
            </View>
        </View>
    )
}

export default Cart

const styles = StyleSheet.create({})