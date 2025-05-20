import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import MainImage from '@/assets/images/MAINBACKGROUND.png';

const quizInstructions = {
  "1": {
    title: "Allah's Names (1-24)",
    instructions: [
      "This quiz covers the first 24 names of Allah.",
      "Select the correct answer from four options.",
      "Your score will be shown at the end.",
      "Take your time and reflect on each name's meaning."
    ]
  },
  "2": {
    title: "Allah's Names (25-49)",
    instructions: [
      "This quiz covers names 25-49 of Allah.",
      "Choose carefully from the provided options.",
      "Your final score will be displayed when complete.",
      "Remember to focus on understanding each name."
    ]
  },
  "3": {
    title: "Allah's Names (50-74)",
    instructions: [
      "This quiz tests your knowledge of names 50-74.",
      "Select one answer from the given choices.",
      "View your results after completing all questions.",
      "Take time to appreciate each name's significance."
    ]
  },
  "4": {
    title: "Allah's Names (75-99)",
    instructions: [
      "This quiz covers the final set of Allah's names (75-99).",
      "Pick the correct option for each question.",
      "See your score upon completion.",
      "Reflect on the beauty of each name."
    ]
  },
  "5": {
    title: "Complete Quiz (Names 1-99)",
    instructions: [
      "This comprehensive quiz covers all 99 names of Allah.",
      "Answer carefully and thoughtfully.",
      "Review your total score at the end.",
      "Take your time to consider each name's meaning."
    ]
  }
};

const Instructions = () => {
  const params = useLocalSearchParams();
  const { id } = params;
  const router = useRouter();

  const currentQuiz = quizInstructions[id] || {
    title: "Quiz Instructions",
    instructions: ["Instructions not available for this quiz."]
  };

  const handleStartQuiz = () => {
    // Navigate to the actual quiz questions page
    // Make sure this route exists and is correct
    router.push(`/(tabs)/quizzesinfo/questions/quiz${id}`);
  };

  const handleBack = () => {
    // Use router.back() instead of router.replace() to go back properly
    router.push('/(tabs)/quizzes');
  };

  return (
    <ImageBackground source={MainImage} style={styles.backgroundImage}>
      <LinearGradient
        colors={['#101746', '#142f60', '#17457a', '#1a5a91']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>

          <View style={styles.contentContainer}>
            <Text style={styles.header}>{currentQuiz.title}</Text>
            
            <View style={styles.instructionsContainer}>
              {currentQuiz.instructions.map((instruction, index) => (
                <View key={index} style={styles.instructionItem}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.instructionText}>{instruction}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity 
              style={styles.startButton} 
              onPress={handleStartQuiz}
              accessibilityLabel="Start Quiz"
              accessibilityRole="button"
            >
              <Text style={styles.startButtonText}>Start Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
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
    opacity: 0.9,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 80,
    left: 40,
    zIndex: 1,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
  },
  instructionsContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 40,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-start',
  },
  bulletPoint: {
    color: 'white',
    fontSize: 18,
    marginRight: 10,
    marginTop: -2,
  },
  instructionText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
  },
  startButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  startButtonText: {
    color: '#17457a',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Instructions;