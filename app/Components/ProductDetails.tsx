import { ActivityIndicator, Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
import AntDesign from '@expo/vector-icons/AntDesign';
import Rating from './Rating';
import { Router, router } from 'expo-router';
import Button from './Button';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AddToCart, cartData } from '@/Redux/Slice/cartSlicer';

interface ProductIDProps {
    id: string;
}
const ProductDetails: FC<ProductIDProps> = ({ id }) => {
    const { product } = useSelector((state: RootState) => state.singleproduct)
    const { uid } = useSelector((state: RootState) => state.auth)
    const { cartitems } = useSelector((state: RootState) => state.cart)
    const [productadded, setProductAdded] = useState<boolean>(false)
    const theme = useColorScheme();
    const dispatch = useDispatch<AppDispatch>()
    const flatListRef = useRef<FlatList>(null);
    const Text_color = theme === "dark" ? Colors.WHITE : Colors.BLACK
    const [currentindex, setCurrentIndex] = useState<number>(0)
    const [SelectSize, stSelectSize] = useState<Size>()
    const [errorText, setErrortext] = useState<string>()

    const delivery = require("../../assets/images/deliverytruck.png")
    const returnimage = require("../../assets/images/return.png")
    const cash = require("../../assets/images/cashdelivery.png")

    useEffect(() => {
        dispatch(GetSingleProduct(id))
    }, [dispatch, id])

    useEffect(() => {
        if (cartitems && cartitems.length > 0 && product) {
            const data = cartitems.find(cartitems => cartitems.product_id === product._id)
            if (data) {
                setProductAdded(true)
            } else {
                setProductAdded(false)
            }
        }
    }, [cartitems, product])




    const ProductList = (item: string) => {
        if (!item) {
            return (
                <ActivityIndicator color={Colors.MAIN_COLOR} size={'large'} />
            )
        }
        return (
            <View style={{ width, height: 500, position: 'relative' }} >
                <Image source={{ uri: item }} style={{ width: "100%", height: "100%", borderBottomLeftRadius: 40, borderBottomRightRadius: 40, objectFit: "cover" }} />
                {currentindex === 0 ?
                    <TouchableOpacity onPress={() => router.push({ pathname: "/Allproducts" })} style={{ position: 'absolute', left: 20, top: 20, backgroundColor: Colors.MAIN_COLOR, padding: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }} >
                        <AntDesign name="back" size={24} color={Colors.BLACK} />
                    </TouchableOpacity>
                    :
                    null
                }
            </View>
        )
    }
    const sizeChartData = [
        { size: "Small", chest: "34-36", waist: "28-30", length: "27" },
        { size: "Medium", chest: "38-40", waist: "32-34", length: "28" },
        { size: "Large", chest: "42-44", waist: "36-38", length: "29" },
        { size: "XL", chest: "46-48", waist: "40-42", length: "30" },
        { size: "XXL", chest: "50-52", waist: "44-46", length: "31" },
    ];


    const GetPrice = (value: number | null | undefined) => {
        if (!value) return
        const Data = value * Math.random()
        return Data.toFixed(0)
    }
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

    interface Size {
        name: string;
        symbol: string;
    }
    const Size = [
        {
            name: "Small",
            symbol: "S"
        },
        {
            name: "Medium",
            symbol: "M"
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
            symbol: "XXL"
        },

    ]


    const HandleSCroll = (event: any) => {
        const offset = event.nativeEvent.contentOffset.x
        const index = parseInt((offset / width).toFixed())
        setCurrentIndex(index)

    }

    const HandleSizeSelect = (item: Size) => {
        stSelectSize(item)
    }
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
        []
    );

    const AddToCat = async () => {
        if (!SelectSize) {
            setErrortext("Please select size")
            return
        }
        if (productadded) {
            router.push({
                pathname: "/(tabs)/Cart"
            })
            return
        }
        if (uid) {
            const cartdata: cartData = {
                userId: uid,
                size: SelectSize?.symbol || "",
                product_id: product?._id || "",
                description: product?.description || '',
                price: product?.price && product.price * (1 - 0.40) || 0,
                category: product?.category || '',
                stock: product?.stock || 0,
                image: product?.images?.[0] || '',
                ratings: product?.ratings || 0,
                numReviews: product?.numReviews || 0,
                title: product?.title || '',
                createdAt: Date.now().toString(),
                deliveryTime: product?.deliveryTime || 0,
                subTotal: product?.price && product.price * (1 - 0.40) || 0,
            }
            const result = await dispatch(AddToCart(cartdata))
            if (result.payload._id) {
                setProductAdded(true)
            }
        }
        else {
            router.push({
                pathname: '/Login'
            })
        }
    }

    if (!product) {
        return (
            <View style={{ flex: 1, height, justifyContent: "center", alignItems: "center" }} >
                <ActivityIndicator size={24} color={Colors.MAIN_COLOR} />
            </View>
        )
    }

    return (
        <View style={{ flex: 1, width, alignItems: 'center', backgroundColor: theme === "dark" ? Colors.BLACK : Colors.WHITE, marginBottom: 20 }} >
            <FlatList
                ref={flatListRef}
                data={product?.images}
                renderItem={({ item }) => ProductList(item)}
                keyExtractor={(item, index) => index.toString()}
                pagingEnabled
                onScroll={HandleSCroll}
                showsHorizontalScrollIndicator={false}
                horizontal
            />
            <View style={{ width: width - 20, flexDirection: "row", justifyContent: "center", gap: 10, marginVertical: 5 }} >
                {
                    product?.images?.map((value, index) => {
                        return (
                            <View key={index} style={{ opacity: index === currentindex ? 1 : 0.5, height: 3, width: index === currentindex ? 20 : 15, borderRadius: 30, backgroundColor: "#C3C3C3" }} />
                        )
                    })
                }
            </View>
            <View style={{ width, marginTop: 10, paddingLeft: 15 }} >
                <Text style={{ color: Text_color, fontFamily: Font.Bold, fontSize: 18 }} >{product?.title}</Text>
                <View style={{ width: 250, gap: 10, alignItems: "center", flexDirection: "row" }}>
                    <Text style={{ color: Text_color, fontFamily: Font.Bold, fontSize: 18 }} >₹{product?.price ? (product.price * (1 - 0.40)).toFixed() : 'N/A'}</Text>
                    <View style={{ marginTop: 5, position: "relative", }}>
                        <Text style={{ color: Text_color, fontFamily: Font.Bold, fontSize: 12, opacity: 0.5, }} >₹{product?.price}</Text>
                        <View style={{ height: 1, width: 35, backgroundColor: Text_color, position: "absolute", top: "40%", opacity: 0.3 }} />
                    </View>
                    <View style={{ backgroundColor: Colors.MAIN_COLOR, paddingHorizontal: 5, borderRadius: 7 }}>
                        <Text style={{ color: Colors.BLACK, fontFamily: Font.Bold, fontSize: 15 }}>40% OFF</Text>
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
                <View style={{ gap: 5 }} >
                    <View style={{ flexDirection: "row", alignItems: "center" }} >
                        <View style={{ width: 30 }}>
                            <Image source={delivery} style={{ height: 30, width: 30 }} />
                        </View>
                        <Text style={{ color: Text_color, fontFamily: Font.Medium, fontSize: 13, marginLeft: 10 }} >Delivery by {getDateAfterDays(product?.deliveryTime)}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", }} >
                        <View style={{ width: 30 }}>
                            <Image source={returnimage} style={{ height: 30, width: 30 }} />
                        </View>
                        <Text style={{ color: Text_color, fontFamily: Font.Medium, fontSize: 13, marginLeft: 10 }} >10 days return policy</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 2 }} >
                        <View style={{ width: 30 }}>
                            <Image source={cash} style={{ height: 30, width: 30 }} />
                        </View>
                        <Text style={{ color: Text_color, fontFamily: Font.Medium, fontSize: 13, marginLeft: 10 }} >Pay on delivery available</Text>
                    </View>
                    <View style={{ marginTop: 10, width, flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontFamily: Font.Medium, color: theme === "dark" ? Colors.WHITE : Colors.BLACK }}>SIZES</Text>
                        <TouchableOpacity >
                            <Text style={{ fontFamily: Font.Light, marginRight: 50, fontSize: 10, borderBottomWidth: 1, borderColor: theme === "dark" ? Colors.WHITE : Colors.BLACK, color: theme === "dark" ? Colors.WHITE : Colors.BLACK }}>SIZE CHART</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: "row", marginTop: 5 }}>
                    {
                        Size.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => HandleSizeSelect(item)}
                                    key={index} style={{ width: 50, height: 50, borderRadius: 10, borderWidth: 2, borderColor: (theme === "dark" && SelectSize?.symbol !== item.symbol) ? Colors.WHITE : (theme === "light" && SelectSize?.symbol !== item.symbol) ? Colors.BLACK : Colors.MAIN_COLOR, justifyContent: 'center', alignItems: 'center', marginHorizontal: 7 }} >

                                    <Text style={{ color: (theme === "dark" && SelectSize?.symbol !== item.symbol) ? Colors.WHITE : (theme === "light" && SelectSize?.symbol !== item.symbol) ? Colors.BLACK : Colors.MAIN_COLOR, fontFamily: Font.Bold, fontSize: 14 }} >{item.symbol}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                {errorText ?
                    <Text style={{ color: Colors.MAIN_COLOR, fontFamily: Font.Medium }}>{errorText}</Text> :
                    null
                }
                <Button
                    title={productadded ? "Add to cart" : "Add to cart"}
                    activeOpacity={0.5}
                    press={AddToCat}
                    textStyle={styles.ButtonText}
                    buttonStyle={[styles.ButtonStyle, { backgroundColor: Colors.MAIN_COLOR }]}
                />
            </View>
        </View >
    )
}

export default ProductDetails

const styles = StyleSheet.create({
    ButtonText: {
        fontFamily: Font.Bold,
        color: Colors.BLACK,
        fontSize: 20
    },
    ButtonStyle: {
        backgroundColor: Colors.MAIN_COLOR,
        width: width - 60,
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 10
    }
})