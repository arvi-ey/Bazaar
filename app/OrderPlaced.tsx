import { StyleSheet, Text, View, Dimensions, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Font } from '@/Font'
import { Colors } from '@/Theme'
const { width, height } = Dimensions.get('window')
import Button from './Components/Button';
import LottieView from 'lottie-react-native';
import { router } from 'expo-router'
import { useLocalSearchParams } from 'expo-router';



const OrderPlaced = () => {
    const theme = useColorScheme();
    const Background = theme === "dark" ? Colors.BLACK : Colors.WHITE
    const FontColor = theme === "dark" ? Colors.WHITE : Colors.BLACK
    const [timer, setTimer] = useState<boolean>(false)
    const { item } = useLocalSearchParams()
    const parsedItem = typeof item === 'string' ? JSON.parse(item) : null;


    // useEffect(() => {
    //     setTimeout(() => {
    //         setTimer(true)
    //     }, 2500)
    // }, [])

    // useEffect(() => {
    //     if (timer === true) router.push("/(tabs)/Order")
    // }, [timer])

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
        <View style={{ flex: 1, gap: 2, justifyContent: "center", alignItems: "center", width, backgroundColor: Background }}>
            <LottieView
                source={require('../assets/images/Order_placed.json')}
                autoPlay
                loop
                style={{ width: 550, height: 550 }}
            />
            <View style={{ width: width - 10, justifyContent: "center", alignItems: 'center', }}>
                <Text style={{ color: FontColor, fontSize: 20, fontFamily: Font.Bold }}>Order placed successfully</Text>
                <Text style={{ color: FontColor, fontSize: 15, fontFamily: Font.Medium, opacity: 0.7 }}>Expected delivery with in {getDateAfterDays(parsedItem.deliveryTime)} </Text>
            </View>
        </View>
    )
}

export default OrderPlaced

const styles = StyleSheet.create({})