import { Image, Keyboard, StyleSheet, Platform, SafeAreaView, Text, TextInput, Dimensions, View, ScrollView, NativeSyntheticEvent, NativeScrollEvent, StatusBar } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/Theme';
import { Font } from '@/Font';
const { height, width } = Dimensions.get("window")
import { useState, useEffect } from 'react';
import { RootState } from '@/Redux/Store';
import { useSelector } from 'react-redux';
import Button from './Components/Button';
import { router, Router } from 'expo-router';
import { useLocalSearchParams, } from 'expo-router';

import ProductDetails from './Components/ProductDetails';


const Product = () => {
    const theme = useColorScheme();
    const { id } = useLocalSearchParams();
    return (
        <ScrollView contentContainerStyle={{ width, flex: 1, alignItems: 'center', backgroundColor: theme === "dark" ? Colors.BLACK : Colors.WHITE }} >
            <ProductDetails id={id.toString()} />
            {/* <Text style={{ color: Colors.WHITE }} >Product Details</Text> */}
        </ScrollView>
    )
}

export default Product

const styles = StyleSheet.create({})