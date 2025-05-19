import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MainImage from '@/assets/images/MAINBACKGROUND.png';

const { width } = Dimensions.get('window');

const TestYourself = () => {
  const router = useRouter();

  const handleCategoryPress = (range: string) => {
    router.push(`/flashcards?range=${range}`);
  };

  return (
    <ImageBackground
    source={require('../../assets/images/MAINBACKGROUND.png')}
    resizeMode="cover"
    style={{ flex: 1 }}
    >
        <LinearGradient
        colors={['#101746', '#142f60', '#17457a', '#1a5a91']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.7,
        }}
        />
        <SafeAreaView style={styles.container}>
            
        <Text style={styles.headerText}>Test Yourself!</Text>

        <Text style={styles.subheaderText}>Choose a set of names to practice with Flashcards!👇</Text>
        
        <View style={styles.buttonsContainer}>
            <TouchableOpacity 
            style={styles.categoryButton}
            onPress={() => handleCategoryPress('1-24')}
            >
            <Image 
                source={require('../../assets/flash/flash1.png')} 
                style={styles.buttonImage}
                resizeMode="cover"
            />
            </TouchableOpacity>
            
            <TouchableOpacity 
            style={styles.categoryButton}
            onPress={() => handleCategoryPress('25-49')}
            >
            <Image 
                source={require('../../assets/flash/flash2.png')} 
                style={styles.buttonImage}
                resizeMode="cover"
            />
            </TouchableOpacity>
            
            <TouchableOpacity 
            style={styles.categoryButton}
            onPress={() => handleCategoryPress('50-74')}
            >
            <Image 
                source={require('../../assets/flash/flash3.png')} 
                style={styles.buttonImage}
                resizeMode="cover"
            />
            </TouchableOpacity>
            
            <TouchableOpacity 
            style={styles.categoryButton}
            onPress={() => handleCategoryPress('75-99')}
            >
            <Image 
                source={require('../../assets/flash/flash4.png')} 
                style={styles.buttonImage}
                resizeMode="cover"
            />
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    top: 20,
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-evenly',
    paddingVertical: 20,
  },
  categoryButton: {
    width: width - 80,
    height: 120,
    borderRadius: 25,
    backgroundColor: '#fff',
    overflow: 'hidden',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonImage: {
    width: '100%',
    height: '100%',
  },
  subheaderText: {
  fontSize: 18,
  color: '#fff',
  textAlign: 'center',
  marginBottom: -14,
  paddingHorizontal: 20,
  lineHeight: 24,
}
});

export default TestYourself;