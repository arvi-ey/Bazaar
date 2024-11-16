import { Image, StyleSheet, Platform, SafeAreaView, Text, TextInput, Dimensions, View, ScrollView, NativeSyntheticEvent, NativeScrollEvent, StatusBar } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/Theme';
import { Font } from '@/Font';
const { height, width } = Dimensions.get("window")
import { useState, useEffect } from 'react';
import Slider from '../Components/Slider';
import { RootState } from '@/Redux/Store';
import { useSelector } from 'react-redux';
import Category from '../Components/Category';
import AntDesign from '@expo/vector-icons/AntDesign';
import Button from '../Components/Button';
import { router, Router } from 'expo-router';
import Logo from "../../assets/images/App_logo.png"
export default function HomeScreen() {
  const theme = useColorScheme();
  const { banner } = useSelector((state: RootState) => state.banner)
  const { category } = useSelector((state: RootState) => state.category)
  const [searchProduct, setSearchProduct] = useState<string | number>("")
  const HandleSearchProduct = (text: string | number) => {
    setSearchProduct(text)
  }

  return (
    <ScrollView style={{ backgroundColor: theme === "dark" ? Colors.BLACK : Colors.WHITE }}>
      <SafeAreaView style={[styles.MainView, { backgroundColor: theme === "dark" ? Colors.BLACK : Colors.WHITE }]} >
        <View style={{ width: width, alignItems: "center" }}>
          <TextInput
            value={searchProduct.toString()}
            style={[{
              backgroundColor: theme === "dark" ? Colors.INPUT_BACKGROUND_DARK : Colors.INPUT_BACKGROUND, width: "95%",
              borderRadius: 12, height: 55, paddingHorizontal: 20, fontFamily: Font.SemiBold, fontSize: 15, color: theme === "dark" ? Colors.WHITE : Colors.BLACK
            }]}
            placeholderTextColor={theme === "dark" ? Colors.WHITE : Colors.BLACK}
            placeholder='Search  products ....'
            onChangeText={HandleSearchProduct}
            onFocus={() => router.push("/Allproducts")}
          />
        </View>
        <Slider
          data={banner}
        />
        <View style={{ width: width - 20, alignItems: "center", flexDirection: "row", justifyContent: 'space-between' }}>
          <Text style={{ color: theme === "dark" ? Colors.WHITE : Colors.BLACK, fontFamily: Font.Bold, fontSize: 20, marginLeft: 10 }} >Categories</Text>
          <AntDesign name="arrowright" size={34} color={theme === "dark" ? Colors.WHITE : Colors.BLACK} />
        </View>
        <Category
          data={category}
        />
        <View style={{ width, alignItems: 'center', marginBottom: 7 }} >
          <Button
            title="View all products"
            buttonStyle={styles.ButtonStyle}
            textStyle={styles.ButtonStyleText}
            activeOpacity={0.8}
            press={() => router.push("/Allproducts")}
          />
        </View>
      </SafeAreaView>
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 45 : 0,
  },
  ButtonStyle: {
    backgroundColor: Colors.MAIN_COLOR,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8
  },
  ButtonStyleText: {
    fontFamily: Font.Medium,
    fontSize: 15
  }
});
