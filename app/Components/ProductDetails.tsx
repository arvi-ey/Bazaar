import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useRef } from 'react'
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/Theme';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Redux/Store';
import { GetSingleProduct } from '@/Redux/Slice/productSlicer';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Font } from '@/Font';
const { height, width } = Dimensions.get("window")
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Rating from './Rating';

interface ProductIDProps {
    id: string;
}
const ProductDetails: FC<ProductIDProps> = ({ id }) => {
    const { product } = useSelector((state: RootState) => state.singleproduct)
    const theme = useColorScheme();
    const dispatch = useDispatch<AppDispatch>()
    const flatListRef = useRef<FlatList>(null);
    const Text_color = theme === "dark" ? Colors.WHITE : Colors.BLACK

    useEffect(() => {
        dispatch(GetSingleProduct(id))
    }, [dispatch, id])

    const ProductList = (item: string) => {
        if (!item) {
            return (
                <ActivityIndicator color={Colors.MAIN_COLOR} size={'large'} />
            )
        }
        return (
            <View style={{ width, height: 500 }} >
                <Image source={{ uri: item }} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </View>
        )
    }

    const GetPrice = (value: number | null | undefined) => {
        if (!value) return
        const Data = value * Math.random()
        return Data.toFixed(0)
    }
    const getDateAfterDays = (days: number | null | undefined) => {
        if (!days) return
        const today = new Date(); // Get the current date
        today.setDate(today.getDate() + days); // Add the specified number of days
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'short',  // Abbreviated weekday (e.g., "Mon")
            month: 'short',    // Abbreviated month (e.g., "Nov")
            day: 'numeric'     // Numeric day (e.g., "28")
        };
        return today.toLocaleDateString('en-US', options); // Return the formatted date without the year
    }

    const Size = [
        {
            name: "Extra small",
            symbol: "XS"
        },
        {
            name: "Small",
            symbol: "S"
        },
        {
            name: "Small",
            symbol: "S"
        },
        {
            name: "Large",
            symbol: "L"
        },
        {
            name: "Extra Large",
            symbol: "XL"
        },
        {
            name: "Extra Extra Large",
            symbol: "2XL"
        },

    ]

    return (
        <View style={{ width, alignItems: 'center', backgroundColor: theme === "dark" ? Colors.BLACK : Colors.WHITE }} >
            <FlatList
                ref={flatListRef}
                data={product?.images}
                renderItem={({ item }) => ProductList(item)}
                keyExtractor={(item, index) => index.toString()}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                horizontal
            />
            <View style={{ width, marginTop: 10, paddingLeft: 15 }} >
                <Text style={{ color: Text_color, fontFamily: Font.Bold, fontSize: 18 }} >{product?.title}</Text>
                <View style={{ width: 250, gap: 10, alignItems: "center", flexDirection: "row" }}>
                    <Text style={{ color: Text_color, fontFamily: Font.Bold, fontSize: 18 }} >₹{GetPrice(product?.price ?? 0)}</Text>
                    <View style={{ marginTop: 5, position: "relative", }}>
                        <Text style={{ color: Text_color, fontFamily: Font.Bold, fontSize: 12, opacity: 0.5, }} >₹{product?.price}</Text>
                        <View style={{ height: 1, width: 35, backgroundColor: Text_color, position: "absolute", top: "40%", opacity: 0.3 }} />
                    </View>
                </View>
                <Rating
                    maxRatingCount={5}
                    ratingValue={product?.ratings}
                    selectedRatingColor={Colors.MAIN_COLOR}
                    unSelectedRatingColor={theme === "dark" ? Colors.WHITE : Colors.BLACK}
                    size={13}
                />
                <Text style={{ color: Text_color, fontFamily: Font.Light, fontSize: 10 }} >{product?.description}</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }} >
                    <View style={{ width: 30 }}>
                        <MaterialCommunityIcons name="car-limousine" size={30} color={Colors.MAIN_COLOR} />
                    </View>
                    <Text style={{ color: Text_color, fontFamily: Font.Medium, fontSize: 13, marginLeft: 10 }} >Delivery by{getDateAfterDays(product?.deliveryTime)}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", }} >
                    <View style={{ width: 30 }}>
                        <Fontisto name="arrow-return-left" size={25} color={Colors.MAIN_COLOR} />
                    </View>
                    <Text style={{ color: Text_color, fontFamily: Font.Medium, fontSize: 13, marginLeft: 10 }} >10 days return policy</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 2 }} >
                    <View style={{ width: 30 }}>
                        <MaterialIcons name="payment" size={30} color={Colors.MAIN_COLOR} />
                    </View>
                    <Text style={{ color: Text_color, fontFamily: Font.Medium, fontSize: 13, marginLeft: 10 }} >Pay on delivery available</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    {
                        Size.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} style={{ width: 50, height: 50, borderRadius: 10, backgroundColor: Colors.MAIN_COLOR, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }} >
                                    <Text style={{ color: Colors.WHITE, fontFamily: Font.Bold, fontSize: 14 }} >{item.symbol}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        </View>
    )
}

export default ProductDetails

const styles = StyleSheet.create({})