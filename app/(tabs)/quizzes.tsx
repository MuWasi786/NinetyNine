import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import MainImage from '@/assets/images/MAINBACKGROUND.png';

// this is an array! holds the unique id of each equiz, image, and the title
const quizButtons = [
  { id: 1, image: require('@/assets/images/1.png'), title: 'Quiz 1' },
  { id: 2, image: require('@/assets/images/2.png'), title: 'Quiz 2' },
  { id: 3, image: require('@/assets/images/3.png'), title: 'Quiz 3' },
  { id: 4, image: require('@/assets/images/4.png'), title: 'Quiz 4' },
  { id: 5, image: require('@/assets/images/fullquiz2.png'), title: 'Full Quiz' },
];

// Main screen component
const Quizzes = () => {
  const router = useRouter();


  // navigation, takes you to the push 
  const handleQuizPress = (id: number) => {
    router.push(`/(tabs)/quizzesinfo/instructions/${id}`);
  };

  return ( //UI!
      <ImageBackground source={MainImage} style={styles.backgroundImage}>
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
            <Text style={styles.header}>Choose Your Quiz!</Text>
            <View style={styles.quizContainer}>
              {quizButtons.map((quiz) => (
                <TouchableOpacity
                  key={quiz.id}
                  style={quiz.id === 5 ? styles.longQuizButton : styles.quizButton}
                  onPress={() => handleQuizPress(quiz.id)}
                  accessibilityLabel={`Start ${quiz.title}`}
                  accessibilityRole="button"
                >
                  <Image source={quiz.image} style={quiz.id === 5 ? styles.longQuizImage : styles.quizImage} />
                  <Text style={quiz.id === 5 ? styles.longQuizText : styles.quizText}>
                    {quiz.title}
                  </Text>
                </TouchableOpacity>
              ))}
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
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 70,
    marginBottom: 20,
    top: 20,
  },
  quizContainer: {
    paddingTop: 30, 
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  quizButton: {
    width: '48%', 
    marginBottom: 20, 
    alignItems: 'center',
  },
  quizImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 10,
  },
  quizText: {
    marginTop: 10,
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  longQuizButton: {
    width: '100%', 
    marginBottom: 20,
    alignItems: 'center',
  },
  longQuizImage: {
    width: '100%',
    height: 140,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  longQuizText: {
    marginTop: 10,
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  
});

export default Quizzes;
