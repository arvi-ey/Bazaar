import { Image, Keyboard, StyleSheet, FlatList, Platform, SafeAreaView, Text, TextInput, Dimensions, View, ScrollView, NativeSyntheticEvent, NativeScrollEvent, StatusBar, TouchableOpacity } from 'react-native';
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
import { useDispatch, } from 'react-redux';
import { AppDispatch } from '@/Redux/Store';
import { GetSingleProduct } from '@/Redux/Slice/productSlicer';
import { URL } from '@/config';
import ProductDetails from './Components/ProductDetails';
// import { FlatList } from 'react-native-gesture-handler';
import { GetProductsByCategory } from '@/Redux/Slice/categorySlicer';
import Rating from './Components/Rating';

const Product = () => {
    const theme = useColorScheme();
    const dispatch = useDispatch<AppDispatch>()
    const { productByCategory } = useSelector((state: RootState) => state.category)
    const { id, category } = useLocalSearchParams();

    useEffect(() => {
        dispatch(GetProductsByCategory(category.toString()))
    }, [dispatch, category])
    const renderData = ({ item }: any) => {
        // console.log(item)
        return (
            <TouchableOpacity
                // onPress={() => GoToProductdetails(item._id, item.category)}
                activeOpacity={0.8} style={{ height: 350, width: 185, backgroundColor: '', overflow: "hidden", borderColor: Colors.BLACK, borderRadius: 5, marginVertical: 2, marginHorizontal: 2 }}>
                <View style={{ height: "87%", width: "100%", }} >
                    <Image source={{ uri: item.images[0] }} style={{ height: "100%", width: "100%", resizeMode: 'cover', borderRadius: 5 }} />
                </View>
                <View style={{ width: 180, overflow: "hidden", marginTop: 2 }}>
                    <Text style={{ fontFamily: Font.Medium, paddingLeft: 5, color: theme === "dark" ? Colors.WHITE : Colors.BLACK }}>
                        {item.title.length > 18 ? `${item.title.slice(0, 18)}...` : item.title}
                    </Text>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 20, }} >
                        <Text style={{ paddingLeft: 5, fontFamily: Font.Medium, color: theme === "dark" ? Colors.WHITE : Colors.BLACK }}>
                            ₹ {item.price}
                        </Text>
                        <Rating
                            maxRatingCount={5}
                            ratingValue={item.ratings}
                            selectedRatingColor={Colors.MAIN_COLOR}
                            unSelectedRatingColor={theme === "dark" ? Colors.WHITE : Colors.BLACK}
                            size={13}
                        />
                    </View>
                </View>

            </TouchableOpacity >
        )
    }
    return (
        <ScrollView contentContainerStyle={{ width, alignItems: 'center', backgroundColor: theme === "dark" ? Colors.BLACK : Colors.WHITE, }} >
            <ProductDetails id={id.toString()} />
        </ScrollView>
    )
}

export default Product

const styles = StyleSheet.create({})