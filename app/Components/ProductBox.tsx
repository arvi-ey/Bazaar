import { StyleSheet, Text, View, FlatList, Keyboard, TextInput, Dimensions, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'
import { Colors } from '@/Theme';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Font } from '@/Font';
import { Entypo } from '@expo/vector-icons';
import Rating from './Rating';
const { height, width } = Dimensions.get("window")

const ProductBox = () => {

    const theme = useColorScheme();



    const demoProducts = [
        {
            title: "Wireless Bluetooth Headphones",
            description: "High-quality wireless headphones with noise cancellation.",
            price: 120,
            category: "Electronics",
            stock: 50,
            images: [
                "https://images.bewakoof.com/t1080/men-s-brown-standard-typography-super-loose-fit-flat-knit-sweater-597245-1726047157-1.jpg",
                "https://m.media-amazon.com/images/I/71K4WoY2EWL._SY879_.jpg"
            ],
            ratings: 4.5,
            numReviews: 25,
            createdAt: new Date(),
            deliveryTime: 5
        },
        {
            title: "Wireless Bluetooth Headphones",
            description: "High-quality wireless headphones with noise cancellation.",
            price: 120,
            category: "Electronics",
            stock: 50,
            images: [
                "https://images.bewakoof.com/t1080/men-s-beige-black-graphic-printed-super-loose-fit-sweater-644664-1721727020-1.jpg",
                "https://m.media-amazon.com/images/I/71K4WoY2EWL._SY879_.jpg"
            ],
            ratings: 1.5,
            numReviews: 25,
            createdAt: new Date(),
            deliveryTime: 5
        },
        {
            title: "Wireless Bluetooth Headphones",
            description: "High-quality wireless headphones with noise cancellation.",
            price: 120,
            category: "Electronics",
            stock: 50,
            images: [
                "https://images.bewakoof.com/t1080/men-s-gardenia-oversized-flatknit-sweater-597204-1721740129-1.jpg",
                "https://m.media-amazon.com/images/I/71K4WoY2EWL._SY879_.jpg"
            ],
            ratings: 3.5,
            numReviews: 25,
            createdAt: new Date(),
            deliveryTime: 5
        },
        {
            title: "Wireless Bluetooth Headphones",
            description: "High-quality wireless headphones with noise cancellation.",
            price: 120,
            category: "Electronics",
            stock: 50,
            images: [
                "https://images.bewakoof.com/t1080/men-s-black-orange-typography-oversized-sweater-644666-1724993791-1.jpg",
                "https://m.media-amazon.com/images/I/71K4WoY2EWL._SY879_.jpg"
            ],
            ratings: 2.5,
            numReviews: 25,
            createdAt: new Date(),
            deliveryTime: 5
        },
        {
            title: "Wireless Bluetooth Headphones",
            description: "High-quality wireless headphones with noise cancellation.",
            price: 120,
            category: "Electronics",
            stock: 50,
            images: [
                "https://images.bewakoof.com/t1080/men-s-brown-oversized-flat-knit-sweater-597250-1726047105-1.jpg",
                "https://m.media-amazon.com/images/I/71K4WoY2EWL._SY879_.jpg"
            ],
            ratings: 0.5,
            numReviews: 25,
            createdAt: new Date(),
            deliveryTime: 5
        },
        {
            title: "Wireless Bluetooth Headphones",
            description: "High-quality wireless headphones with noise cancellation.",
            price: 120,
            category: "Electronics",
            stock: 50,
            images: [
                "https://images.bewakoof.com/t1080/men-s-blue-oversized-flat-knit-sweater-597244-1722429369-1.jpg",
                "https://m.media-amazon.com/images/I/71K4WoY2EWL._SY879_.jpg"
            ],
            ratings: 4.5,
            numReviews: 25,
            createdAt: new Date(),
            deliveryTime: 5
        },
        {
            title: "Wireless Bluetooth Headphones",
            description: "High-quality wireless headphones with noise cancellation.",
            price: 120,
            category: "Electronics",
            stock: 50,
            images: [
                "https://images.bewakoof.com/t1080/men-s-blue-textured-sweater-651085-1728390664-1.jpg",
                "https://m.media-amazon.com/images/I/71K4WoY2EWL._SY879_.jpg"
            ],
            ratings: 2.5,
            numReviews: 25,
            createdAt: new Date(),
            deliveryTime: 5
        },
        {
            title: "Wireless Bluetooth Headphones",
            description: "High-quality wireless headphones with noise cancellation.",
            price: 120,
            category: "Electronics",
            stock: 50,
            images: [
                "https://images.bewakoof.com/t1080/men-s-lilac-solid-oversized-sweater-497681-1670329726-1.jpg",
                "https://m.media-amazon.com/images/I/71K4WoY2EWL._SY879_.jpg"
            ],
            ratings: 5,
            numReviews: 25,
            createdAt: new Date(),
            deliveryTime: 5
        },
    ];


    const renderData = ({ item }: any) => {
        // console.log(data)
        return (
            <TouchableOpacity activeOpacity={0.8} style={{ height: 350, width: 185, backgroundColor: '', overflow: "hidden", borderColor: Colors.BLACK, borderRadius: 5, marginVertical: 2, marginHorizontal: 2 }}>
                <View style={{ height: "87%", width: "100%", }} >
                    <Image source={{ uri: item.images[0] }} style={{ height: "100%", width: "100%", resizeMode: 'cover', borderRadius: 5 }} />
                </View>
                <View style={{ width: 180, overflow: "hidden", }}>
                    <Text style={{ fontFamily: Font.Medium, paddingLeft: 5, }}>
                        {item.title.length > 18 ? `${item.title.slice(0, 23)}...` : item.title}
                    </Text>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 20, }} >
                        <Text style={{ paddingLeft: 5, fontFamily: Font.Medium, }}>
                            ₹ {item.price}
                        </Text>
                        <Rating
                            maxRatingCount={5}
                            ratingValue={item.ratings}
                            selectedRatingColor={Colors.MAIN_COLOR}
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
                    autoFocus={true}
                />
                {
                    searchProduct ?
                        <Entypo name="circle-with-cross" size={24} color={theme === "dark" ? Colors.WHITE : Colors.BLACK} onPress={HandleKeyboard} />
                        : null
                }
            </View>
        )
    }

    return (
        <View style={{ width, justifyContent: 'center', alignItems: 'center' }}>
            <FlatList
                contentContainerStyle={{ width, marginTop: 10, justifyContent: 'center', alignItems: 'center' }}
                ListHeaderComponent={SearchBox}
                numColumns={2}
                data={demoProducts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(item) => renderData(item)}
            />
        </View>
    )
}

export default ProductBox

const styles = StyleSheet.create({})