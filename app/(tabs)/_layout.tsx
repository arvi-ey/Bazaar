import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/Redux/Store';
import { GetBanners } from '@/Redux/Slice/bannerSlicer';
import { GetAllCategory } from '@/Redux/Slice/categorySlicer';
import { Dimensions, Text, View } from 'react-native';
const { height, width } = Dimensions.get("window")
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/Theme';
import { Font } from '@/Font';
import { GetUserOnce } from '@/Redux/Slice/authSlicer';

export default function TabLayout() {
  const theme = useColorScheme();
  const dispatch = useDispatch<AppDispatch>();
  const { uid } = useSelector((state: RootState) => state.auth)


  useEffect(() => {
    dispatch(GetBanners());
    dispatch(GetUserOnce());
    dispatch(GetAllCategory());
  }, [dispatch]);

  console.log("In INdes", uid)

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
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View style={{ marginTop: 11, justifyContent: 'center', alignItems: "center" }}>
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
            <View style={{ marginTop: 11, justifyContent: 'center', alignItems: "center" }}>
              <Ionicons name={focused ? "bag" : "bag-outline"} size={24} color={focused ? Colors.MAIN_COLOR : (theme === "dark" && !focused) ? Colors.WHITE : Colors.BLACK} />
              <Text style={{ color: focused ? Colors.MAIN_COLOR : (theme === "dark" && !focused) ? Colors.WHITE : Colors.BLACK, fontFamily: Font.Medium }}>Cart</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Account"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ marginTop: 11, justifyContent: 'center', alignItems: "center" }}>
              <FontAwesome5 name={focused ? "user-alt" : "user"} size={22} color={focused ? Colors.MAIN_COLOR : (theme === "dark" && !focused) ? Colors.WHITE : Colors.BLACK} />
              <Text style={{ color: focused ? Colors.MAIN_COLOR : (theme === "dark" && !focused) ? Colors.WHITE : Colors.BLACK, fontFamily: Font.Medium }}>Account</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
