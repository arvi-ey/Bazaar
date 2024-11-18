import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/Theme';
const { height, width } = Dimensions.get("window")

interface ProductIDProps {
    id: string;
}
const ProductDetails: FC<ProductIDProps> = ({ id }) => {
    const theme = useColorScheme();
    return (
        <View style={{ width, alignItems: 'center', backgroundColor: theme === "dark" ? Colors.BLACK : Colors.WHITE }} >
            <Text>ProductDetails</Text>
        </View>
    )
}

export default ProductDetails

const styles = StyleSheet.create({})