import { StyleSheet, Text, View, FlatList, Keyboard, TextInput, Dimensions, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react'
import { Colors } from '@/Theme';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Font } from '@/Font';
import { Entypo, Ionicons } from '@expo/vector-icons';
import Rating from './Components/Rating';
const { height, width } = Dimensions.get("window")
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/Redux/Store';
import { GetAllProducts, GetProducts, GetProductsByCategory } from '@/Redux/Slice/productsSlicer';
import { Router, Link, useRouter, useLocalSearchParams } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from 'expo-router';

const CategoryProduct = () => {
    const { products, loading } = useSelector((state: RootState) => state.product)
    const theme = useColorScheme();
    const router = useRouter()
    const { uid } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.user)
    const [page, setPage] = useState<number>(0)
    const navigation = useNavigation();
    const Background = theme === "dark" ? Colors.BLACK : Colors.WHITE
    const FontColor = theme === "dark" ? Colors.WHITE : Colors.BLACK
    const params = useLocalSearchParams()
    const delivery = require("../assets/images/deliverytruck.png")
    const LoaderBG = theme === "dark" ? Colors.INPUT_BACKGROUND_DARK : Colors.INPUT_BACKGROUND
    // console.log(products)

    useEffect(() => {
        if (params && params.category) {
            GetProduct()
        }

    }, [])

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

    const GetProduct = async () => {
        await dispatch(GetProductsByCategory(params.category.toString()))

    }
    const GoToProductdetails = (id: string, category: string) => {
        router.push({
            pathname: `productpage/${id}`,
            params: { from: "category", categoryName: params.category }
        })
    };



    const DemoARRAY = [1, 2, 3, 4, 5, 6, 7]
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

    const renderData = ({ item }: any) => {
        return (
            <TouchableOpacity
                onPress={() => GoToProductdetails(item._id, item.category)}
                activeOpacity={0.8} style={{ flexDirection: "row", height: 350, width: width - 20, backgroundColor: '', overflow: "hidden", borderColor: Colors.BLACK, borderRadius: 5, marginVertical: 2, marginHorizontal: 2 }}>
                <View style={{ height: "87%", width: "50%", }} >
                    <Image source={{ uri: item.images[0] }} style={{ height: "100%", width: "100%", resizeMode: 'cover', borderRadius: 5 }} />
                </View>
                <View style={{ gap: 5, width: 180, overflow: "hidden", marginTop: 2 }}>
                    <Text style={{ fontSize: 18, fontFamily: Font.Medium, paddingLeft: 5, color: theme === "dark" ? Colors.WHITE : Colors.BLACK }}>
                        {item.title.length > 30 ? `${item.title.slice(0, 30)}...` : item.title}
                    </Text>
                    <View style={{ paddingLeft: 5 }}>
                        <Rating
                            maxRatingCount={5}
                            ratingValue={3}
                            selectedRatingColor={Colors.MAIN_COLOR}
                            unSelectedRatingColor={theme === "dark" ? Colors.WHITE : Colors.BLACK}
                            size={13}
                        />
                    </View>
                    <Text style={{ paddingLeft: 5, fontFamily: Font.Regular, color: FontColor, opacity: 0.8 }}>{item.description.length > 50 ? `${item.description.slice(0, 50)}...` : item.description}</Text>
                    <Text style={{ paddingLeft: 5, fontSize: 18, fontFamily: Font.Medium, color: theme === "dark" ? Colors.WHITE : Colors.BLACK }}>
                        ₹ {item.price}
                    </Text>
                    <View style={{ paddingLeft: 2, flexDirection: "row", alignItems: "center" }} >
                        <View style={{}}>
                            <Image source={delivery} style={{ height: 25, width: 25 }} />
                        </View>
                        <Text style={{ color: FontColor, fontFamily: Font.Medium, fontSize: 13, marginLeft: 10 }} >Delivery by {getDateAfterDays(item?.deliveryTime)}</Text>
                    </View>
                    <Text style={{ paddingLeft: 5, color: FontColor, fontFamily: Font.Medium, fontSize: 13, }} >Available sizes :</Text>
                    <View style={{ flexDirection: "row", paddingLeft: 5, gap: 5 }}>
                        {
                            Size.map((item, index) => {
                                return (
                                    <View
                                        key={index} style={{ width: 30, height: 30, borderRadius: 5, borderWidth: 1, borderColor: Colors.MAIN_COLOR, justifyContent: 'center', alignItems: 'center', }} >
                                        <Text style={{ color: Colors.MAIN_COLOR, fontFamily: Font.Regular, fontSize: 12 }} >{item.symbol}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
            </TouchableOpacity >
        )
    }
    const SearchBox = () => {
        const [searchProduct, setSearchProduct] = useState<string | number>("")
        const HandleSearchProduct = (text: string | number) => {
            setSearchProduct(text)
        }

        const HandleKeyboard = () => {
            Keyboard.dismiss()
            setSearchProduct("")
        }


        return (
            <View style={{ width: width - 20, marginBottom: 10, borderRadius: 12, alignItems: "center", gap: 10, flexDirection: "row", backgroundColor: theme === "dark" ? Colors.INPUT_BACKGROUND_DARK : Colors.INPUT_BACKGROUND, }}>
                <TextInput
                    value={searchProduct.toString()}
                    style={[{
                        width: "90%",
                        height: 55, paddingHorizontal: 10, fontFamily: Font.SemiBold, fontSize: 15, color: theme === "dark" ? Colors.WHITE : Colors.BLACK
                    }]}
                    placeholderTextColor={theme === "dark" ? Colors.WHITE : Colors.BLACK}
                    placeholder='Search  products ....'
                    onChangeText={HandleSearchProduct}
                />
                {
                    searchProduct ?
                        <Entypo name="circle-with-cross" size={24} color={theme === "dark" ? Colors.WHITE : Colors.BLACK} onPress={HandleKeyboard} />
                        : null
                }
            </View>
        )
    }

    if (loading) {
        return (
            <View style={{ height, width, backgroundColor: Background, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size={"large"} color={Colors.MAIN_COLOR} />
            </View>
        )
    }
    return (
        <View style={{ width, backgroundColor: Background, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width, height: 50, flexDirection: 'row', paddingLeft: 20, gap: 20, marginTop: 10, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => router.push("/(tabs)")}>
                    <Ionicons name="arrow-back-outline" size={30} color={FontColor} />
                </TouchableOpacity>
                <Text style={{ fontFamily: Font.Medium, color: FontColor, fontSize: 25 }}>{params.category}</Text>
            </View>
            <FlatList
                contentContainerStyle={{ width, marginTop: 10, justifyContent: 'center', alignItems: 'center' }}
                ListHeaderComponent={SearchBox}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.1}
                numColumns={1}
                data={products}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(item) => renderData(item)}
            />
        </View >
    )
}

export default CategoryProduct

const styles = StyleSheet.create({})