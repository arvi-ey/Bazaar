import { StyleSheet, Text, View, Dimensions, Image, FlatList, TouchableOpacity, TextInput } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { Font } from '@/Font'
import { Colors } from '@/Theme'
import { useColorScheme } from '@/hooks/useColorScheme';
import LottieView from 'lottie-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Redux/Store';
import { cartData } from '@/Redux/Slice/cartSlicer';
const { width, height } = Dimensions.get('window')
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { RemoveFromCart } from '@/Redux/Slice/cartSlicer';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import Button from './Components/Button';
import { SimpleLineIcons } from '@expo/vector-icons';
import { UpdateAddress } from '@/Redux/Slice/addressSlicer';
import { AddAddress, Address as AddresData, GetAddress } from '@/Redux/Slice/addressSlicer';
interface ErrorText {
    value: string,
    message: string;
}

const Address = () => {
    const theme = useColorScheme();
    const { address } = useSelector((state: RootState) => state.address)
    const { uid } = useSelector((state: RootState) => state.auth)
    const [errorText, setErrortext] = useState<ErrorText>({ value: "", message: "" })
    const Dark = theme === "dark" ? true : false
    const Background = Dark ? Colors.BLACK : Colors.WHITE
    const FontColor = Dark ? Colors.WHITE : Colors.BLACK
    const InPutHeight = 60
    const InputColor = Dark ? Colors.WHITE : Colors.BLACK
    const InputBG = Dark ? "#393C41" : "#F3F3F6"
    const InputFont = Font.Medium
    const InputFontSize = 18
    const PlaceHolderColor = Dark ? "#b3b3b3" : "#628699"
    const [data, setData] = useState<AddresData>({
        street: "",
        label: "",
        city: "",
        state: "",
        pinCode: "",
        landmark: "",
        addressType: ''
    }
    )
    const dispatch = useDispatch<AppDispatch>();
    const AddressType = ["Home", "Office", "Others"]
    const { item } = useLocalSearchParams()
    const parsedItem = typeof item === 'string' ? JSON.parse(item) : null;

    useEffect(() => {
        if (item && parsedItem) {
            setData({
                street: parsedItem.street,
                label: parsedItem.label,
                city: parsedItem.city,
                state: parsedItem.state,
                pinCode: parsedItem.pinCode.toString(),
                landmark: parsedItem.landmark,
                addressType: parsedItem.addressType,
            })
        }
    }, [item])

    const HandleSaveAddress = async () => {
        const { street, city, label, landmark, pinCode, state, addressType } = data
        if (!label) {
            setErrortext({ value: "label", message: "Address line1 is required" })
            return
        }
        if (!street) {
            setErrortext({ value: "street", message: "Street name is required" })
            return
        }
        if (!pinCode) {
            setErrortext({ value: "pinCode", message: "Enter pincode" })
            return
        }
        if (!state) {
            setErrortext({ value: "state", message: "State name is required" })
            return
        }
        if (!city) {
            setErrortext({ value: "city", message: "City name is required" })
            return
        }
        if (!addressType) {
            setErrortext({ value: "addressType", message: "Address type is required" })
            return
        }
        if (pinCode.length < 6) {
            setErrortext({ value: "pinCode", message: "invalid Pincode" })
            return
        }
        const addressdata = { ...data, userId: uid || "", pinCode: data.pinCode.toString() }
        if (item && parsedItem && parsedItem._id) {
            const result = await dispatch(UpdateAddress({ id: parsedItem._id, data: addressdata }))
            if (result.payload._id && uid) {
                router.back()
                return
            }
        }
        else {

            const result = await dispatch(AddAddress(addressdata))
            if (result.payload._id && uid) {
                router.back()
                return
            }
        }
    }


    async function getStateByPincode(pincode: string) {
        try {
            const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
            const data = await response.json();
            if (data[0].Status === "Success") {
                const state = data[0].PostOffice[0].State;
                const city = data[0].PostOffice[1].Name
                setData(prev => ({ ...prev, state }))
                setData(prev => ({ ...prev, city }))
                return
            } else {
                setErrortext({ value: "pinCode", message: "invalid Pincode" });
                return null;
            }
        } catch (error) {
            console.error("Error fetching state:", error);
        }
    }



    return (
        <View style={{ flex: 1, alignItems: "center", width, backgroundColor: Background }}>
            <View style={{ width, height: 50, flexDirection: 'row', paddingLeft: 20, gap: 20, marginTop: 10, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back-outline" size={30} color={FontColor} />
                </TouchableOpacity>
                <Text style={{ fontFamily: Font.Medium, color: FontColor, fontSize: 25 }}>Address</Text>
            </View>

            <View style={{ position: "relative", marginTop: 30, width: width - 20, backgroundColor: InputBG, borderRadius: 8, height: InPutHeight, flexDirection: "row", alignItems: 'center' }}>
                <TextInput
                    style={{ marginLeft: 10, height: "100%", color: InputColor, fontFamily: InputFont, width: "85%", alignItems: 'center', fontSize: InputFontSize }}
                    placeholder="Address line 1"
                    placeholderTextColor={PlaceHolderColor} value={data?.label}
                    onChangeText={(text) => setData({ ...data, label: text })}
                />
                {errorText.value === "label" ?
                    <View style={{ width: "100%", position: "absolute", bottom: -20 }}>
                        <Text style={{ color: Colors.MAIN_COLOR, fontFamily: Font.Light, paddingLeft: 20 }}>{errorText.message}</Text>
                    </View> : null
                }
            </View>
            <View style={{ position: "relative", marginTop: 30, width: width - 20, backgroundColor: InputBG, borderRadius: 8, height: InPutHeight, flexDirection: "row", alignItems: 'center' }}>
                <TextInput
                    style={{ marginLeft: 10, height: "100%", color: InputColor, fontFamily: InputFont, width: "85%", alignItems: 'center', fontSize: InputFontSize }}
                    placeholder="Street name"
                    placeholderTextColor={PlaceHolderColor} value={data?.street}
                    onChangeText={(text) => setData({ ...data, street: text })}
                />
                {errorText.value === "street" ?
                    <View style={{ width: "100%", position: "absolute", bottom: -20 }}>
                        <Text style={{ color: Colors.MAIN_COLOR, fontFamily: Font.Light, paddingLeft: 20 }}>{errorText.message}</Text>
                    </View> : null
                }
            </View>
            <View style={{ position: "relative", marginTop: 30, width: width - 20, backgroundColor: InputBG, borderRadius: 8, height: InPutHeight, flexDirection: "row", alignItems: 'center' }}>
                <TextInput
                    style={{ marginLeft: 10, height: "100%", color: InputColor, fontFamily: InputFont, width: "85%", alignItems: 'center', fontSize: InputFontSize }}
                    placeholder="Landmark"
                    placeholderTextColor={PlaceHolderColor} value={data?.landmark}
                    onChangeText={(text) => setData({ ...data, landmark: text })}
                />
                {errorText.value === "landmark" ?
                    <View style={{ width: "100%", position: "absolute", bottom: -20 }}>
                        <Text style={{ color: Colors.MAIN_COLOR, fontFamily: Font.Light, paddingLeft: 20 }}>{errorText.message}</Text>
                    </View> : null
                }
            </View>
            <View style={{ width: width - 10, justifyContent: 'space-around', flexDirection: 'row' }}>
                <View style={{ position: "relative", marginTop: 30, width: "30%", backgroundColor: InputBG, borderRadius: 8, height: InPutHeight, flexDirection: "row", alignItems: 'center' }}>
                    <TextInput
                        style={{ marginLeft: 10, height: "100%", color: InputColor, fontFamily: InputFont, width: "85%", alignItems: 'center', fontSize: InputFontSize }}
                        placeholder="pincode"
                        placeholderTextColor={PlaceHolderColor}
                        value={data?.pinCode}
                        inputMode='numeric'
                        onChangeText={(text) => {
                            if (text.length === 6) {
                                getStateByPincode(text)
                            }
                            setData({ ...data, pinCode: text })
                        }}
                    />
                    {errorText.value === "pinCode" ?
                        <View style={{ width: "100%", position: "absolute", bottom: -20 }}>
                            <Text style={{ color: Colors.MAIN_COLOR, fontFamily: Font.Light, paddingLeft: 20 }}>{errorText.message}</Text>
                        </View> : null
                    }
                </View>
                <View style={{ position: "relative", marginTop: 30, width: "65%", backgroundColor: InputBG, borderRadius: 8, height: InPutHeight, flexDirection: "row", alignItems: 'center' }}>
                    <TextInput
                        style={{ marginLeft: 10, height: "100%", color: InputColor, fontFamily: InputFont, width: "85%", alignItems: 'center', fontSize: InputFontSize }}
                        placeholder="state"
                        placeholderTextColor={PlaceHolderColor}
                        value={data?.state}
                        onChangeText={(text) => setData({ ...data, state: text })}
                    />
                    {errorText.value === "state" ?
                        <View style={{ width: "100%", position: "absolute", bottom: -20 }}>
                            <Text style={{ color: Colors.MAIN_COLOR, fontFamily: Font.Light, paddingLeft: 20 }}>{errorText.message}</Text>
                        </View> : null
                    }
                </View>
            </View>
            <View style={{ position: "relative", marginTop: 30, width: width - 20, backgroundColor: InputBG, borderRadius: 8, height: InPutHeight, flexDirection: "row", alignItems: 'center' }}>
                <TextInput
                    style={{ marginLeft: 10, height: "100%", color: InputColor, fontFamily: InputFont, width: "85%", alignItems: 'center', fontSize: InputFontSize }}
                    placeholder="City name"
                    placeholderTextColor={PlaceHolderColor} value={data?.city}
                    onChangeText={(text) => setData({ ...data, city: text })}
                />
                {errorText.value === "name" ?
                    <View style={{ width: "100%", position: "absolute", bottom: -20 }}>
                        <Text style={{ color: Colors.MAIN_COLOR, fontFamily: Font.Light, paddingLeft: 20 }}>{errorText.message}</Text>
                    </View> : null
                }
            </View>
            <View style={{ position: "relative", marginTop: 30, width: width - 20 }}>
                <Text style={{ color: FontColor, fontFamily: InputFont }}>Select address type</Text>
                <View style={{ width, flexDirection: 'row', gap: 20 }}>
                    {AddressType?.map((value, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => setData({ ...data, addressType: value })}
                                key={index}
                                style={{ marginTop: 10, backgroundColor: InputBG, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5 }}>
                                <Text style={{ color: data.addressType === value ? Colors.MAIN_COLOR : FontColor, fontFamily: data.addressType === value ? Font.Bold : Font.Regular }}>{value}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
            <Button
                title={item ? "Update" : "Save"}
                press={HandleSaveAddress}
                activeOpacity={0.5}
                buttonStyle={{ marginTop: 20, width: 250, height: 50, borderRadius: 7, backgroundColor: Colors.MAIN_COLOR, justifyContent: "center", alignItems: "center" }}
                textStyle={{ fontFamily: Font.Bold, fontSize: 18 }}
            />


        </View>
    )
}

export default Address

const styles = StyleSheet.create({})