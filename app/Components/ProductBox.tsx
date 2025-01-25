import { StyleSheet, Text, View, FlatList, Keyboard, TextInput, Dimensions, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react'
import { Colors } from '@/Theme';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Font } from '@/Font';
import { Entypo, Ionicons } from '@expo/vector-icons';
import Rating from './Rating';
const { height, width } = Dimensions.get("window")
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/Redux/Store';
import { GetAllProducts, GetProducts } from '@/Redux/Slice/productsSlicer';
import { Router, Link, useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from 'expo-router';

const ProductBox = () => {
    const { products, hasMore, currentPage, loading } = useSelector((state: RootState) => state.product)
    const theme = useColorScheme();
    const router = useRouter()
    const { uid } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.user)
    const [page, setPage] = useState<number>(0)
    const navigation = useNavigation();
    const Background = theme === "dark" ? Colors.BLACK : Colors.WHITE
    const FontColor = theme === "dark" ? Colors.WHITE : Colors.BLACK

    useEffect(() => {
        GetData()
    }, [page])
    async function GetData() {
        if (hasMore) {
            await dispatch(GetProducts({ page, limit: 6, dsc: 'dsc' }))
        }
    }
    const ListEnd = () => {
        setPage(page + 1)
    }
    const GoToProductdetails = (id: string, category: string) => {
        router.push(`productpage/${id}`)
    };




    // const GoToProductdetails = (id: string, category: string) => {
    //     router.push({
    //         pathname: '/Product',
    //         params: { id, category },
    //     })
    // }




    const renderData = ({ item }: any) => {
        return (
            <TouchableOpacity
                onPress={() => GoToProductdetails(item._id, item.category)}
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
    const renderFooter = () => {
        return (
            <View style={{ marginBottom: 150 }}>
                {loading ?
                    <ActivityIndicator size="large" color={Colors.MAIN_COLOR} />
                    :
                    <Text style={{ fontFamily: Font.SemiBold, color: Colors.MAIN_COLOR }}>
                        {hasMore ? '' : 'No more products to load'}
                    </Text>
                }
            </View>
        );
    };
    return (
        <View style={{ width, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width, height: 50, flexDirection: 'row', paddingLeft: 20, gap: 20, marginTop: 10, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => router.push("/(tabs)")}>
                    <Ionicons name="arrow-back-outline" size={30} color={FontColor} />
                </TouchableOpacity>
                <Text style={{ fontFamily: Font.Medium, color: FontColor, fontSize: 25 }}>All products</Text>
            </View>
            <FlatList
                contentContainerStyle={{ width, marginTop: 10, justifyContent: 'center', alignItems: 'center' }}
                ListHeaderComponent={SearchBox}
                onEndReached={ListEnd}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.1}
                numColumns={2}
                data={products}
                ListFooterComponent={renderFooter}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(item) => renderData(item)}
            />
        </View >
    )
}

export default ProductBox

const styles = StyleSheet.create({})