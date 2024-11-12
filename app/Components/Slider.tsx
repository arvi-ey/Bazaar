import { Image, StyleSheet, Platform, SafeAreaView, Text, TextInput, Dimensions, View } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/Theme';
import { Font } from '@/Font';
const { height, width } = Dimensions.get("window")
import { useState, useEffect } from 'react';
import { Banner } from '@/Redux/Slice/bannerSlicer';

const Slider: React.FC<Banner> = () => {
    const theme = useColorScheme();
    return (
        <SafeAreaView>
            <Text style={[{ color: theme === "dark" ? Colors.WHITE : Colors.BLACK }]} >Slider</Text>
        </SafeAreaView>
    )
}

export default Slider

const styles = StyleSheet.create({})