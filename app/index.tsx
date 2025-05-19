import { Image, View, Text, ImageBackground, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import starImage from "@/assets/images/BACKGROUND.png";
import { SafeAreaView } from 'react-native-safe-area-context'; //keeps content in screen boundaries 
import CustomButton from "@/components/CustomButton";
import logoImage from "@/assets/images/KnowYourLordLogo.png";
import { useRouter } from 'expo-router';
import HadithImage from '@/assets/images/Hadith99.png'; //@ simplifies paths

// In react, we have these things like components, 
// where we do const ___ = () => {
//                here we add logic
//                       return (
//                           and here we had JSX, the layout);};


const App = () => { //basically, the screen component
  const router = useRouter(); //allows for swapping screens

  return (
    <View style={styles.container}>
      <ImageBackground
        source={starImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.4)", "rgba(0,0,0,0.8)"]}
          style={styles.gradient}
        >
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.logoContainer}>
              <Image
                source={logoImage}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <View style={styles.hadithContainer}>
              <Image
                source={HadithImage}
                style={styles.hadithImage}
                resizeMode="contain"
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.text}>
                Learn the beautiful names of الله
              </Text>
            </View>

            <Pressable
              style={styles.buttonContainer}
              onPress={() => router.push("/something")}>
              <Text style={styles.buttonText}>Get Started!</Text>
            </Pressable>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({  //styling
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',    
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: -13,
    alignItems: 'center',
    width: '100%', 
  },
  logo: {
    width: 600,
    height: 350,
  },
  hadithContainer: {
    marginBottom: 20,
    top: 100,
    
  },
  hadithImage: {
    width: 630,
    height: 370,
    
  },
  textContainer: {
    position: 'absolute',
    bottom: 180, 
    alignItems: 'center',
  },
  text: {
    fontSize: 25.5,
    color: 'white', 
    fontFamily: 'Baskerville',
    bottom: -40
  },
  buttonContainer: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 45,
    paddingVertical: 15, 
    paddingHorizontal: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 10, 
    width: '80%',
    marginBottom: 30, 
  },
  buttonText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  }
});

export default App;
