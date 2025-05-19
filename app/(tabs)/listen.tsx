import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Audio, Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { iconMapping } from "@/constants/iconMapping";
import { Image } from 'react-native';

const ListenAlong = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentIconIndex, setCurrentIconIndex] = useState(1);
    const [showIcons, setShowIcons] = useState(false);
    const videoRef = useRef(null);
    const soundRef = useRef(null);
    const intervalRef = useRef(null);

    // Add text content for each icon
    const iconTextMapping = {
    1: "Ar-Rahman - The Beneficent, The Most Merciful",
    2: "Ar-Rahim - The Merciful",
    3: "Al-Malik - The King, The Owner of All Sovereignty",
    4: "Al-Quddus - The Most Sacred, The Most Pure",
    5: "As-Salam - The Giver Of Peace",
    6: "Al-Mumin - The Infuser Of Faith",
    7: "Al-Muhaymin - The Preserver of Safety",
    8: "Al-Aziz - The Mighty One",
    9: "Al-Jabbar - The Omnipotent One, The Compelling",
    10: "Al-Mutakabbir - The Dominant One",
    11: "Al-Khaliq - The Creator",
    12: "Al-Bari - The Evolver, The Maker",
    13: "Al-Musawwir - The Flawless Shaper",
    14: "Al-Ghaffar - The Great Forgiver",
    15: "Al-Qahhar - The All-Prevailing One",
    16: "Al-Wahhab - The Supreme Bestower",
    17: "Ar-Razzaq - The Total Provider",
    18: "Al-Fattah - The Supreme Solver, The Reliever",
    19: "Al-Alim - The All Knowing",
    20: "Al-Qabid - The Withholder",
    21: "Al-Basit - The Extender",
    22: "Al-Khafid - The Reducer",
    23: "Ar-Rafi - The Exalter",
    24: "Al-Muizz - The Bestower of Honors",
    25: "Al-Muzil - The Humiliator",
    26: "As-Sami - The All-Hearing",
    27: "Al-Baseer - The All-Seeing",
    28: "Al-Hakam - The Judge",
    29: "Al-Adl - The Just",
    30: "Al-Lateef - The Most Gentle",
    31: "Al-Khabir - The All-Aware",
    32: "Al-Haleem - The Forebearing",
    33: "Al-Azeem - The Magnificent, The Supreme",
    34: "Al-Ghafoor - The All-Forgiving",
    35: "Ash-Shakur - The Most Appreciative",
    36: "Al-Aliyy - The Most High, The Exalted",
    37: "Al-Kabeer - The Greatest",
    38: "Al-Hafiz - The Protector",
    39: "Al-Muqeet - The Sustainer",
    40: "Al-Haseeb - The Reckoner",
    41: "Al-Jaleel - The Majestic One",
    42: "Al-Karim - The Most Generous, Gracious One",
    43: "Ar-Raqib - The Watchful One",
    44: "Al-Mujeeb - The Responding One",
    45: "Al-Waasi - The All-Encompassing",
    46: "Al-Hakeem - The All-Wise",
    47: "Al-Wadud - The Most Loving",
    48: "Al-Majeed - The Glorious",
    49: "Al-Baith - The Ressurector",
    50: "Ash-Shaheed - The Observing Witness",
    51: "Al-Haqq - The Absolute Truth",
    52: "Al-Wakeel - The Disposer of Affairs",
    53: "Al-Qawiyy - The Possessor of All Strength",
    54: "Al-Matin - The Forceful One",
    55: "Al-Waliyy - The Governor/Protecting Friend",
    56: "Al-Hameed - The Praiseworthy",
    57: "Al-Muhsi - The All-Enumerating One",
    58: "Al-Mubdi - The Originator",
    59: "Al-Mueid - The Restorer",
    60: "Al-Muhyi - The Giver of Life",
    61: "Al-Mumeit - The Giver of Death",
    62: "Al-Hayy - The Ever-Living",
    63: "Al-Qayyum - The Self-Existing One",
    64: "Al-Wajid - The Perceiver",
    65: "Al-Majid - The Glorious",
    66: "Al-Waahid - The ONE",
    67: "Al-Ahad - The Unique, The Only One",
    68: "As-Samad - The Satisfier Of Needs",
    69: "Al-Qadir - The Omnipotent One",
    70: "Al-Muqtadir - The Powerful",
    71: "Al-Muqaddim - The Promoter, The Expediter",
    72: "Al-Muakhir - The Delayer",
    73: "Al-Awwal - The First",
    74: "Al-Akhir - The Last",
    75: "Az-Zaahir - The Manifest",
    76: "Al-Baatin - The Hidden One, Knower of the Hidden",
    77: "Al-Wali - The Protecting Friend",
    78: "Al-Muta'ali - The Supreme One",
    79: "Al-Barr - The Absolute Truth",
    80: "At-Tawwab - The Ever-Pardoning",
    81: "Al-Muntaqim - The Avenger",
    82: "Al-Afuw - The Forgiver",
    83: "Ar-Rauf - The Most Kind",
    84: "Malikul Mulk - The Owner of All",
    85: "Dhul-Jalaali-Wal-Ikram - The King, The Owner of All Sovereignty",
    86: "Al-Muqsit - The Most Just One, The Equitable",
    87: "Al-Jami - The Gatherer, The Unifier",
    88: "Al-Ghaniy - The Self Sufficient One",
    89: "Al-Mughni - The Enricher",
    90: "Al-Mani - The Withholder",
    91: "Ad-Darr - The Distresser",
    92: "An-Naafi - The Propitious, The Creator of Good",
    93: "An-Noor - The Light",
    94: "Al-Hadi - The Guide",
    95: "Al-Badi - The Originator",
    96: "Al-Baaqi - The Everlasting",
    97: "Al-Warith - The Inheritor of All",
    98: "Ar-Rasheed - The Infallible Teacher, The Right in Guidance",
    99: "As-Saboor - The Patient"
};

    // Get text based on current icon index
    const getCurrentText = () => {
        return iconTextMapping[currentIconIndex] || "Default text if not found";
    };

    const handlePlayPauseAudioAndVideo = async () => {
        if (isPlaying) {
            await soundRef.current?.pauseAsync();
            videoRef.current?.pauseAsync();
            setIsPlaying(false);
            // Don't hide icons or reset position when pausing
            // Just keep the current icon displayed
        } else {
            if (soundRef.current === null) {
                const { sound } = await Audio.Sound.createAsync(
                    require('@/assets/audio/sheesh.mp3'),
                    { progressUpdateIntervalMillis: 1000 },
                    onPlaybackStatusUpdate
                );
                soundRef.current = sound;
            }
            await soundRef.current.playAsync();
            videoRef.current?.playAsync();
            setIsPlaying(true);
            setShowIcons(true);
            startIconTransition();
        }
    };

    const handleStopAudioAndVideo = async () => {
        if (soundRef.current) {
            await soundRef.current.stopAsync();
            await soundRef.current.setPositionAsync(0);
            videoRef.current?.pauseAsync();
            await videoRef.current?.setPositionAsync(0);
        }
        setIsPlaying(false);
        setShowIcons(false);
        setCurrentIconIndex(1);
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    };

    // Monitor audio playback status to handle when audio finishes
    const onPlaybackStatusUpdate = (status) => {
        if (status.didJustFinish) {
            // Audio finished playing
            setIsPlaying(false);
            setShowIcons(false);
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    // Start or resume icon transition
    const startIconTransition = () => {
        // Clear any existing interval first
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        
        // Start a new interval
        intervalRef.current = setInterval(() => {
            setCurrentIconIndex((prevIndex) => (prevIndex < 99 ? prevIndex + 1 : 1));
        }, 1350);
    };

    // Clean up on component unmount
    useEffect(() => {
        return () => {
            clearInterval(intervalRef.current);
            if (soundRef.current) {
                soundRef.current.unloadAsync();
            }
        };
    }, []);

    useEffect(() => {
        // Start icon transition when showIcons becomes true
        if (showIcons && isPlaying && !intervalRef.current) {
            startIconTransition();
        }
        // When not playing, clear the interval
        else if (!isPlaying && intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, [showIcons, isPlaying]);

    return (
        <ImageBackground 
            source={require('@/assets/images/MAINBACKGROUND.png')} 
            style={styles.backgroundImage}
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
            <View style={styles.container}>
                <Text style={styles.header}>Listen And Read Along</Text>
                <Text style={styles.description}>Listening and reading at the same time helps you remember things better! Your brain uses both your eyes and ears to take in the information, making it easier to understand and recall what you've learned. Click Play below to practice the 99 names of Allah سبحانه و تعالى‎ !</Text>
                
                {showIcons && (
                    <View style={styles.iconContainer}>
                    <View style={styles.circleBackground} />
                        <Image source={iconMapping[currentIconIndex]} style={styles.icon} />
                        <View style={styles.textContainer}>
                            <Text style={styles.iconText}>{getCurrentText()}</Text>
                        </View>
                    </View>
                )}
                
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={[styles.button, styles.playButton]} 
                        onPress={handlePlayPauseAudioAndVideo}
                    >
                        <Text style={styles.buttonText}>
                            {isPlaying ? "Pause Audio" : "Play Audio"}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.button, styles.stopButton]} 
                        onPress={handleStopAudioAndVideo}
                    >
                        <Text style={styles.buttonText}>Stop Audio</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    gradientOverlay: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    description: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '300',
        fontFamily: 'Arial',
        marginHorizontal: 23,
        top: 30,
        textAlign: 'center',
        
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 40,
        width: '100%',
    },
    header: {
        fontSize: 28,
        color: '#fff',
        marginBottom: 20,
        top: 20,
        fontWeight: 'bold',
        fontFamily: 'Arial',
    },
    iconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 300,
        height: 300,
        position: 'absolute',
        top: '50%',
        transform: [{ translateY: -150 }], // Half of icon height
    },
    textContainer: {
        marginTop: 370, // Match icon height
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 8,
        maxWidth: '80%',
    },
    iconText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    button: {
        flex: 1,
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 8,
        marginHorizontal: 5,
    },
    playButton: {
        backgroundColor: '#fff',
    },
    stopButton: {
        backgroundColor: '#fff',
    },
    buttonText: {
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold',
    },
    circleBackground: {
        position: 'absolute',
        width: 270,
        height: 270,
        borderRadius: 160,         // make it a circle 
        backgroundColor: '#fff',   // white background 
        top: '55.5%',
        transform: [{ translateY: -160 }],
        justifyContent: 'center',
        alignItems: 'center',
        
    }

});

export default ListenAlong;