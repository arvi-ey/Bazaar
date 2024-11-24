import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React from 'react'
import { Font } from '@/Font'
import { Colors } from '@/Theme'
import { useColorScheme } from '@/hooks/useColorScheme';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window')
const Order = () => {
    const theme = useColorScheme();
    const Background = theme === "dark" ? Colors.BLACK : Colors.WHITE
    const FontColor = theme === "dark" ? Colors.WHITE : Colors.BLACK
    return (
        <View style={{ flex: 1, gap: 10, justifyContent: "center", alignItems: "center", width, backgroundColor: Background }}>
            <LottieView
                source={require('../../assets/images/EmptyOrder.json')}
                autoPlay
                loop
                style={{ width: 350, height: 350 }}
            />
            <View style={{ width: width - 10, justifyContent: "center", alignItems: 'center', }}>
                <Text style={{ color: FontColor, fontSize: 20, fontFamily: Font.Bold }}>You have no orders yet. Place an order to get started.</Text>

            </View>
        </View>
    )
}

export default Order

const styles = StyleSheet.create({})