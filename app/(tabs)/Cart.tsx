import { StyleSheet, Text, View, Dimensions, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { FC, useState } from 'react'
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
    const { cartitems } = useSelector((state: RootState) => state.cart)
    const dispatch = useDispatch<AppDispatch>();


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

        </View>
    )
}

export default Cart

const styles = StyleSheet.create({})