import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface StarProps {
    ratingValue?: number; // Current rating value
    maxRatingCount?: number; // Maximum number of stars
    size?: number; // Size of the stars
    selectedRatingColor?: string; // Color of selected stars
    unSelectedRatingColor?: string;// Color of unselected stars
}

interface RatingState {
    value: boolean; // Whether the star is selected
}

const Rating: React.FC<StarProps> = ({
    ratingValue = 2,
    maxRatingCount = 5,
    size = 24,
    selectedRatingColor = "black",
    unSelectedRatingColor = "black",
}) => {
    const [state, setState] = useState<RatingState[]>([]);

    useEffect(() => {
        const arr: RatingState[] = [];
        if (ratingValue && maxRatingCount) {
            const rating = Math.round(ratingValue);
            for (let i = 0; i < maxRatingCount; i++) {
                const obj: RatingState = { value: false };
                arr.push(obj);
            }
            for (let i = 0; i < rating; i++) {
                arr[i].value = true;
            }
            setState(arr);
        }
    }, [ratingValue, maxRatingCount]);

    return (
        <View style={{ flexDirection: "row" }}>
            {state.map((val, key) => (
                <View key={key}>
                    {val.value === true ? (
                        <FontAwesome name="star" size={size} color={selectedRatingColor} />
                    ) : (
                        <FontAwesome name="star-o" size={size} color={unSelectedRatingColor} />
                    )}
                </View>
            ))}
        </View>
    );
};

export default Rating;

const styles = StyleSheet.create({});
