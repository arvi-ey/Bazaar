import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { FC } from 'react';

interface ButtonProps {
    title?: string;
    press?: () => void;
    loading?: boolean;
    buttonStyle?: object;
    textStyle?: object;
    loaderColor?: string;
    loaderSize?: number;
    activeOpacity?: number;
}

const Button: FC<ButtonProps> = ({
    title,
    press,
    loading,
    buttonStyle,
    textStyle,
    loaderColor,
    loaderSize,
    activeOpacity,
}) => {
    return (
        <TouchableOpacity
            style={buttonStyle}
            onPress={press}
            activeOpacity={activeOpacity}
        >
            {loading ? (
                <ActivityIndicator
                    size={loaderSize || 'small'}
                    color={loaderColor || 'black'}
                />
            ) : (
                <Text style={textStyle}>{title || 'button title'}</Text>
            )}
        </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({});