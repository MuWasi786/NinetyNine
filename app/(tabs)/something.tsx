import { View, Text, ImageBackground, FlatList, Pressable, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MainImage from "@/assets/images/MAINBACKGROUND.png";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from 'expo-linear-gradient';
import { topics } from '@/constants/Data';
import ninetynineimages from '@/constants/99_images';
import { useRouter } from "expo-router";


const { width } = Dimensions.get('window');


const Something = () => {
    const router = useRouter();


    return (
        <ImageBackground
            source={MainImage}
            resizeMode="cover"
            className="flex-1"
        >
            <LinearGradient
                colors={['#101746', '#142f60', '#17457a', '#1a5a91']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                className="flex-1"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.7
                }}
            />


            <View className="flex-1">
                <SafeAreaView>
                    <View className="mb-2">
                        <Text style={{ color: 'white', marginBottom: 12, fontSize: 50, textAlign: 'center', marginTop: 16 }}>
                            أسماء الله الحسنى
                        </Text>
                    </View>

                    <View>
                        <FlatList
                            data={topics}
                            className="mb-20"
                            keyExtractor={(item) => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 350 }}
                            renderItem={({ item }) => (
                                <Pressable
                                    onPress={() => router.push({
                                        pathname: '/nameDetails/[id]',
                                        params: { id: item.id }
                                    })}
                                    style={{
                                        height: 100,
                                        marginVertical: 12,
                                        borderRadius: 12,
                                        overflow: 'hidden',
                                        width: width - 30,
                                        alignSelf: 'center',
                                    }}
                                >
                                    <ImageBackground
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 12,
                                        }}
                                        source={ninetynineimages[item.id - 1]}
                                        resizeMode="cover"
                                        className="flex-1 rounded-lg justify-center"
                                    >
                                    </ImageBackground>
                                </Pressable>
                            )}
                        />
                    </View>
                </SafeAreaView>
                <StatusBar style="light" />
            </View>
        </ImageBackground>
    );
};

export default Something;
