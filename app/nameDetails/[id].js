import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from "react-native";
import React, { useState, useEffect} from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Audio } from 'expo-av';
import { topics } from '@/constants/Data';
import {iconMapping }from '@/constants/iconMapping';
import Ionicons from '@expo/vector-icons/Ionicons';
import audioMapping from '@/constants/audioMapping';
import whiteback from '@/assets/images/whiteback.png';


const NameDetails = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter(); // Add this line - it was missing!
    const numericId = Number(id); // Convert to number
    const topic = topics.find(item => item.id === numericId); // Use strict equality

    if (!topic) {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>Topic not found.</Text>
            </View>
        );
    }
   
    const [sound, setSound] = useState();

    // Set up audio mode when component mounts
    useEffect(() => {
        const setupAudio = async () => {
            try {
                await Audio.setAudioModeAsync({
                    playsInSilentModeIOS: true,
                    shouldDuckAndroid: true,
                    staysActiveInBackground: false,
                });
            } catch (error) {
                console.error('Error setting up audio:', error);
            }
        };

        setupAudio();
    }, []);

    useEffect(() => {
        return sound
            ? () => {
                  console.log('Unloading Sound');
                  sound.unloadAsync();
              }
            : undefined;
    }, [sound]);

    const playSound = async () => {
        console.log('Current id:', id);
        console.log('Numeric id:', numericId);
        
        // Since audioMapping uses numeric keys, use numericId
        const audioFile = audioMapping[numericId];
        
        console.log('Audio mapping for id:', audioFile);
       
        if (!audioFile) {
            console.error('No audio file found for id:', numericId);
            console.log('Available audio mappings:', Object.keys(audioMapping));
            return;
        }
   
        try {
            // Unload existing sound if any
            if (sound) {
                await sound.unloadAsync();
                setSound(undefined);
            }

            console.log('Loading Sound');
            const { sound: newSound } = await Audio.Sound.createAsync(audioFile);
            setSound(newSound);
   
            console.log('Playing Sound');
            await newSound.playAsync();
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    };
   
    const iconSource = iconMapping[id] || iconMapping[numericId] || null;

    return (
        <ImageBackground
            source={whiteback}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.contentContainer}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={35} color="black" />
                </TouchableOpacity>

                {iconSource ? (
                    <Image source={iconSource} style={styles.topIcon} />
                ) : (
                    <Text style={styles.error}>Icon not found</Text>
                )}

                <Text style={styles.title}>{topic.title}</Text>
                <Text style={styles.description}>{topic.description}</Text>

                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.quranicReferenceContainer}>
                        <Text style={styles.quranicReferenceTitle}>Meaning:</Text>
                        <Text style={styles.quranicReferenceText}>{topic.meaning}</Text>
                    </View>

                    <View style={styles.quranicReferenceContainer}>
                        <Text style={styles.quranicReferenceTitle}>Scholarly Analysis:</Text>
                        <Text style={styles.quranicReferenceText}>{topic.scholarlyAnalysis}</Text>
                    </View>

                    <View style={styles.quranicReferenceContainer}>
                        <Text style={styles.quranicReferenceTitle}>Quranic Reference:</Text>
                        <Text style={styles.quran}>{topic.quran}</Text>
                        <Text style={styles.quranicReferenceText2}>{topic.quranicReference}</Text>
                    </View>

                    <View style={styles.hadithContainer}>
                        <Text style={styles.quranicReferenceTitle}>Hadith/Reflection</Text>
                        <Text style={styles.hadithText}>{topic.hadith}</Text>
                        <Text style={styles.hadithRef}>{topic.hadith_reference}</Text>
                    </View>
                </ScrollView>

                <TouchableOpacity onPress={playSound} style={styles.audioButton}>
                    <Text style={styles.audioButtonText}>Listen To Audio</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 10,
    },
    topIcon: {
        marginTop: 30,
        width: 175,
        height: 175,
        marginBottom: 20,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        marginBottom: -12
    },
    subtitle: {
        fontSize: 20,
        color: '#666',
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 23,
        fontStyle: 'italic',
        marginBottom: 10,
    },
    quranicReferenceContainer: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        marginTop: 15,
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 20,
        alignItems: 'center',
    },
    hadithReferenceTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    hadithContainer: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        marginTop: 15,
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    quranicReferenceTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    quranicReferenceText: {
        fontSize: 15,
        textAlign: 'left',
        lineHeight: 22,
        paddingHorizontal: 10,
        textAlign: 'justify',
    },
    quranicReferenceText2: {
        fontSize: 14,
        textAlign: 'center',
        flexWrap: 'wrap',
        lineHeight: 22,
        paddingHorizontal: 10,
    },
    quran: {
        fontSize: 20,
        textAlign: 'center',
        paddingBottom: 15,
        paddingTop: 5,
        flexWrap: 'wrap',
        flexShrink: 1,
        maxWidth: '90%',
        lineHeight: 35,
    },
    hadithText: {
        fontSize: 15,
        paddingBottom: 15,
        paddingTop: 5,
        textAlign: 'justify',
        lineHeight: 22,
    },
    hadithRef: {
        fontSize: 14,
        textAlign: 'center',
        paddingBottom: 14
    },
    audioButton: {
        marginTop: 65,
        backgroundColor: '#ad8b1b',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        bottom: 50
    },
    audioButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    error: {
        fontSize: 20,
        color: 'red',
        textAlign: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingBottom: 30,
    },
});

export default NameDetails;