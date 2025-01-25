import React, { useRef, useEffect, useState } from 'react';
import { View, FlatList, Image, Dimensions, FlatListProps, Text } from 'react-native';
import { Colors } from '@/Theme';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Banner } from '@/Redux/Slice/bannerSlicer';
import index from '../../web/src/components/Analytics/index';
interface SliderProps {
    data: Banner[];
}

const { width } = Dimensions.get('window');

const Slider: React.FC<SliderProps> = ({ data }) => {
    const flatListRef = useRef<FlatList<Banner>>(null);
    const theme = useColorScheme();
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex === data.length - 1 ? 0 : prevIndex + 1;
                flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
                return nextIndex;
            });
        }, 2000);
        return () => clearInterval(interval);
    }, [data]);
    const renderItem: FlatListProps<Banner>['renderItem'] = ({ item }) => (
        <View style={{ width, alignItems: 'center', }}>
            <Image source={{ uri: item.image }} style={{ width: width - 20, borderRadius: 12, height: 450 }} resizeMode="cover" />
        </View>
    );


    // useEffect(() => {
    //     const interVal = setInterval(() => {

    //         if (currentIndex < data.length - 1) {
    //             // setCurrentIndex(currentIndex + 1)
    //             const nextIndex = currentIndex + 1
    //             flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    //         }
    //         else {
    //             const nextIndex = 1
    //             flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });

    //         }
    //     }, 2000)

    // }, [data, currentIndex])

    const HandleSCroll = (event: any) => {
        const offset = event.nativeEvent.contentOffset.x
        // console.log(offset)
        const index = parseInt((offset / width).toFixed())
        setCurrentIndex(index)
        // console.log("Index_____Trigerring", index)

    }
    const getItemLayout = (data, currentIndex) => ({
        length: width,
        offset: width * currentIndex,
        index: currentIndex,
    });

    return (
        <View style={{ marginVertical: 10 }} >
            {data?.length > 0 ? (
                <>
                    <FlatList
                        ref={flatListRef}
                        data={data}
                        renderItem={renderItem}
                        getItemLayout={getItemLayout}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        onScroll={HandleSCroll}
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                    />
                    <View
                        style={{
                            width: width - 20,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            gap: 10,
                            marginVertical: 5,
                        }}
                    >
                        {data.map((_, index) => (
                            <View
                                key={index}
                                style={{
                                    opacity: index === currentIndex ? 1 : 0.5,
                                    height: 3,
                                    width: index === currentIndex ? 20 : 15,
                                    borderRadius: 30,
                                    backgroundColor: '#C3C3C3',
                                }}
                            />
                        ))}
                    </View>
                </>
            ) : (
                <Text style={{ textAlign: 'center', color: '#999' }}>No data available</Text>
            )}
        </View>
    );
};

export default Slider;
