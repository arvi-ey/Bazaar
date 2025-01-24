import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image, Dimensions, FlatListProps, Text, TouchableOpacity } from 'react-native';
import { Colors } from '@/Theme';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Category as category } from '@/Redux/Slice/categorySlicer';
const { width } = Dimensions.get('window');
import { Font } from '@/Font';
import { useRouter } from 'expo-router';

interface CategoryProps {
    data: category[];
}
const Category: React.FC<CategoryProps> = ({ data }) => {
    const router = useRouter()

    const renderItem: FlatListProps<category>['renderItem'] = ({ item }) => (
        <TouchableOpacity style={{ position: "relative", }} onPress={() => router.push({
            pathname: "/CategoryProduct",
            params: { category: item.categoryName }
        })} >
            <Image source={{ uri: item.categoryImage }} style={{ width: 200, borderRadius: 12, height: 300, marginLeft: 10, marginRight: 10 }} resizeMode="cover" />
            <View style={{ position: "absolute", alignSelf: "center", bottom: 20 }}>
                <Text style={{ color: Colors.WHITE, fontSize: 28, fontFamily: Font.Bold }}>{item.categoryName}</Text>
            </View>
        </TouchableOpacity>
    );


    return (
        <View style={{ marginVertical: 10 }}>
            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
            />
        </View>
    )
}

export default Category

const styles = StyleSheet.create({

})