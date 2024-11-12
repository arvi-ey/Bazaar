import { Image, StyleSheet, Platform, SafeAreaView, Text, TextInput, Dimensions, View } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/Theme';
import { Font } from '@/Font';
const { height, width } = Dimensions.get("window")
import { useState, useEffect } from 'react';
import Slider from '../Components/Slider';
export default function HomeScreen() {
  const theme = useColorScheme();
  const [searchProduct, setSearchProduct] = useState<string | number>("")
  const HandleSearchProduct = (text: string | number) => {
    setSearchProduct(text)
  }
  return (
    <SafeAreaView style={[styles.MainView, { backgroundColor: theme === "dark" ? Colors.BLACK : Colors.WHITE }]} >
      <View style={{ width: width, alignItems: "center" }}>
        <TextInput
          value={searchProduct.toString()}
          style={[{
            backgroundColor: theme === "dark" ? Colors.INPUT_BACKGROUND_DARK : Colors.INPUT_BACKGROUND, width: "90%",
            borderRadius: 12, height: 55, paddingHorizontal: 20, fontFamily: Font.SemiBold, fontSize: 15, color: theme === "dark" ? Colors.WHITE : Colors.BLACK
          }]}
          placeholderTextColor={theme === "dark" ? Colors.WHITE : Colors.BLACK}
          placeholder='Search  products ....'
          onChangeText={HandleSearchProduct}
        />
      </View>
      <Slider />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 55 : 0,
  }
});
