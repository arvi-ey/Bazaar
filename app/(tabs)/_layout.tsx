import { router, Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/Redux/Store';
import { GetBanners } from '@/Redux/Slice/bannerSlicer';
import { GetAllCategory } from '@/Redux/Slice/categorySlicer';
import { Dimensions, Image, Text, View, TouchableOpacity } from 'react-native';
const { height, width } = Dimensions.get("window")
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/Theme';
import { Font } from '@/Font';
import { GetUserOnce, CheckAuth } from '@/Redux/Slice/authSlicer';
import { GetUserInfo } from '@/Redux/Slice/userSlicer';
import Button from '../Components/Button';
import { GetCartItems } from '@/Redux/Slice/cartSlicer';
export default function TabLayout() {
  const theme = useColorScheme();
  const dispatch = useDispatch<AppDispatch>();
  const { uid } = useSelector((state: RootState) => state.auth)
  const { user } = useSelector((state: RootState) => state.user)
  const { cartitems } = useSelector((state: RootState) => state.cart)


  useEffect(() => {
    dispatch(GetBanners());
    dispatch(CheckAuth());
    dispatch(GetAllCategory());
  }, [dispatch]);

  useEffect(() => {
    if (uid) {
      dispatch(GetUserInfo(uid));
      dispatch(GetCartItems(uid))
    }
  }, [uid])

  const Logo = require("../../assets/images/App_logo.png")

  const Image_data = "https://images.unsplash.com/photo-1587778082149-bd5b1bf5d3fa?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3"
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.BLACK,
        headerShown: false,
        tabBarStyle: {
          height: 60,
          justifyContent: "center",
          alignItems: "center",
          width: width,
          backgroundColor: theme === "dark" ? Colors.BLACK : Colors.WHITE,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          headerShown: true,
          headerStyle: {
            height: 60,
            backgroundColor: theme === 'dark' ? Colors.BLACK : Colors.WHITE,
          },
          headerRight: () =>
          (
            (uid ? <TouchableOpacity onPress={() => router.push("/Account")} style={{ flexDirection: "row", marginRight: 10, gap: 25 }} >
              <Image source={{ uri: user?.profile_picture ? user?.profile_picture : Image_data }} style={{ resizeMode: "cover", height: 50, width: 50, borderRadius: 25, borderWidth: 1, borderColor: Colors.MAIN_COLOR }} />
            </TouchableOpacity> : <View>
              <Button
                buttonStyle={{ width: 50, height: 40, justifyContent: "center", borderRadius: 8, alignItems: "center", backgroundColor: Colors.MAIN_COLOR, marginRight: 30 }}
                textStyle={{ color: Colors.BLACK, fontFamily: Font.Medium }}
                activeOpacity={0.6}
                press={() => router.push(
                  {
                    pathname: '/Login',
                    params: { from: 'home' }
                  }
                )}
                title='Sign in'
              />
            </View>)
          ),
          headerLeft: () =>
          (
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontFamily: Font.LOGO, fontSize: 25, color: theme === "dark" ? Colors.WHITE : Colors.BLACK }} >Bazaar</Text>
            </View>
          ),
          tabBarIcon: ({ color, focused }) => (
            <View style={{ marginTop: 11, width: 60, justifyContent: 'center', alignItems: "center" }}>
              <Ionicons name={focused ? "home-sharp" : "home-outline"} size={24} color={focused ? Colors.MAIN_COLOR : (theme === "dark" && !focused) ? Colors.WHITE : Colors.BLACK} />
              <Text style={{ color: focused ? Colors.MAIN_COLOR : (theme === "dark" && !focused) ? Colors.WHITE : Colors.BLACK, fontFamily: Font.Medium }}>Home</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Cart"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ marginTop: 11, width: 60, justifyContent: 'center', position: "relative", alignItems: "center" }}>
              <Ionicons name={focused ? "bag" : "bag-outline"} size={24} color={focused ? Colors.MAIN_COLOR : (theme === "dark" && !focused) ? Colors.WHITE : Colors.BLACK} />
              <Text style={{ color: focused ? Colors.MAIN_COLOR : (theme === "dark" && !focused) ? Colors.WHITE : Colors.BLACK, fontFamily: Font.Medium }}>Cart</Text>
              {cartitems && cartitems.length > 0 ?
                <View style={{ position: "absolute", backgroundColor: Colors.MAIN_COLOR, height: 20, width: 20, justifyContent: 'center', alignItems: "center", borderRadius: 20, right: 5, top: -5, }}>
                  <Text style={{ color: Colors.BLACK, fontFamily: Font.Bold }}>{cartitems?.length}</Text>
                </View>
                :
                null
              }
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Order"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ marginTop: 11, width: 60, justifyContent: 'center', alignItems: "center" }}>
              <Ionicons name={focused ? "cart" : "cart-outline"} size={28} color={focused ? Colors.MAIN_COLOR : (theme === "dark" && !focused) ? Colors.WHITE : Colors.BLACK} />
              <Text style={{ color: focused ? Colors.MAIN_COLOR : (theme === "dark" && !focused) ? Colors.WHITE : Colors.BLACK, fontFamily: Font.Medium }}>Orders</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
