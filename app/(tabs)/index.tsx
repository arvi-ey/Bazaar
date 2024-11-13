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

export default function HomeScreen() {
  const theme = useColorScheme();
  const { banner } = useSelector((state: RootState) => state.banner)
  const { category } = useSelector((state: RootState) => state.category)
  const [searchProduct, setSearchProduct] = useState<string | number>("")
  const [scrolling, setScrolling] = useState<Boolean>(false)
  const HandleSearchProduct = (text: string | number) => {
    setSearchProduct(text)
  }
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    if (currentOffset > 0) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };
  return (
    <SafeAreaView style={[styles.MainView, { backgroundColor: theme === "dark" ? Colors.BLACK : Colors.WHITE }]} >
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* <StatusBar hidden={scrolling ? true : false} /> */}
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 55 : 0,
  }
});
