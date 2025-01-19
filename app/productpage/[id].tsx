import { Image, Keyboard, StyleSheet, FlatList, Platform, SafeAreaView, Text, TextInput, Dimensions, View, ScrollView, NativeSyntheticEvent, NativeScrollEvent, StatusBar, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/Theme';
import { Font } from '@/Font';
const { height, width } = Dimensions.get("window")
import { useState, useEffect } from 'react';
import { RootState } from '@/Redux/Store';
import { useSelector } from 'react-redux';
import Button from '../Components/Button';
import { router, Router } from 'expo-router';
import { useLocalSearchParams, } from 'expo-router';
import { useDispatch, } from 'react-redux';
import { AppDispatch } from '@/Redux/Store';
import { GetSingleProduct } from '@/Redux/Slice/productSlicer';
import { URL } from '@/config';
import ProductDetails from '../Components/ProductDetails';
// import { FlatList } from 'react-native-gesture-handler';
import { GetProductsByCategory } from '@/Redux/Slice/categorySlicer';
import Rating from '../Components/Rating';

const Product = () => {
    const theme = useColorScheme();
    const dispatch = useDispatch<AppDispatch>()
    const { productByCategory } = useSelector((state: RootState) => state.category)
    const { id } = useLocalSearchParams();

    // useEffect(() => {
    //     dispatch(GetProductsByCategory(category.toString()))
    // }, [dispatch])

    return (
        <ScrollView contentContainerStyle={{ width, alignItems: 'center', backgroundColor: theme === "dark" ? Colors.BLACK : Colors.WHITE, }} >
            <ProductDetails id={id.toString()} />
        </ScrollView>
    )
}

export default Product

const styles = StyleSheet.create({})