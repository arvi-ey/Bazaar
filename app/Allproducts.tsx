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
import Entypo from '@expo/vector-icons/Entypo';

const Allproducts = () => {
    const theme = useColorScheme();
    const [searchProduct, setSearchProduct] = useState<string | number>("")
    const HandleSearchProduct = (text: string | number) => {
        setSearchProduct(text)
    }
    const HandleKeyboard = () => {
        Keyboard.dismiss()
        setSearchProduct("")
    }

    return (
        <View style={{ width, justifyContent: 'center', marginTop: 5, alignItems: 'center' }} >
            <View style={{ width: "95%", borderRadius: 12, alignItems: "center", flexDirection: "row", justifyContent: "space-around", backgroundColor: theme === "dark" ? Colors.INPUT_BACKGROUND_DARK : Colors.INPUT_BACKGROUND, }}>
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
        </View>
    )
}

export default Allproducts

const styles = StyleSheet.create({})