import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const Quiz1 = () => {
  const router = useRouter();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  const questions = [
    {
      question: "Which name of Allah means 'The Beneficent, The Most Gracious' ",
      options: ["Ar-Rahman", "Al-Malik", "Al-Quddus", "Al-Aziz"],
      correctAnswer: "Ar-Rahman",
    },
    {
      question: "Which name of Allah means 'The Most Merciful'?",
      options: ["As-Samad", "Ar-Rahim", "Al-Malik", "Al-Mu'min"],
      correctAnswer: "Ar-Rahim",
    },
    {
      question: "Al-Malik means?",
      options: ["The Bestower", "The Most Merciful", "The King", "The Subtle One"],
      correctAnswer: "The King",
    },
    {
      question: "Which name of Allah means 'The Pure, The Holy, The Most Sacred'?",
      options: ["Al-Jabbar", "Ar-Rahman", "Al-Quddus", "Al-Aziz"],
      correctAnswer: "Al-Quddus",
    },
    {
      question: "What does As-Salam mean?",
      options: ["The Provider", "The Creator", "The Source of Peace", "The Omnipotent"],
      correctAnswer: "The Source/Giver of Peace",
    },
    {
      question: "What does As-Mu'min mean?",
      options: ["The King", "The Subtle One", "The Source/Giver of Peace", "The Most Merciful"],
      correctAnswer: "The Source/Giver of Peace",
    },
    {
      question: "Which name of Allah means 'The Gaurdian'?",
      options: ["Al-Wadud", "Al-Latif", "Al-Muhaymin", "Al-Malik"],
      correctAnswer: "Al-Muhaymin",
    },
    {
      question: "Al-Aziz means?",
      options: ["The Almighty", "The Sustainer", "The Patient One", "The All-Knowing"],
      correctAnswer: "The Almighty",
    },
    {
      question: "Which name of Allah means 'The Compeller'?",
      options: ["Ar-Raheem", "Al-Karim", "Al-Jabbar", "Al-Hakim"],
      correctAnswer: "Al-Jabbar",
    },
    {
      question: "What does Al-Mutakabbir mean?",
      options: ["The Dominant One", "The Subtle One", "The Just", "The Generous"],
      correctAnswer: "The Dominant One",
    },
    {
      question: "Which name of Allah means 'The Creator'?",
      options: ["Al-Wadud", "Al-Khaliq", "Al-Karim", "Ar-Razzaq"],
      correctAnswer: "Al-Khaliq",
    },
    {
      question: "Which name of Allah means 'The Evolver'?",
      options: ["Al-Bari", "Ar-Rahim", "Al-Malik", "As-Salam"],
      correctAnswer: "Al-Bari",
    },
    {
      question: "Which name of Allah means 'The Flawless Shaper/Fashioner'?",
      options: ["Al-Musawwir", "Al-Khaliq", "Al-Malik", "Al-Quddus"],
      correctAnswer: "Al-Musawwir",
    },
    {
      question: "What does Al-Ghaffar mean?",
      options: ["The Most Merciful", "The Great Forgiver", "The Bestower", "The Strong"],
      correctAnswer: "The Great Forgiver",
    },
    {
      question: "Which name of Allah means 'The Supreme Bestower'?",
      options: ["Al-Qahhar", "Al-Fattah", "Al-Wahhab", "Al-Mu'min"],
      correctAnswer: "Al-Wahhab",
    },
    {
      question: "Al-Razzaq means?",
      options: ["The Preserver", "The Provider", "The Self-Sufficient", "The All-Knowing"],
      correctAnswer: "The Provider",
    },
    {
      question: "Which name of Allah means 'The All-Prevailing'?",
      options: ["Al-Karim", "Al-Qahhar", "Ar-Rahman", "Al-Wadud"],
      correctAnswer: "Al-Qahhar",
    },
    {
      question: "What does Al-Fattah mean?",
      options: ["The Most Loving", "The Just", "The Fashioner", "The Supreme Solver"],
      correctAnswer: "The Supreme Solver",
    },
    {
      question: "Which name of Allah means 'The All-Knowing'?",
      options: ["Al-Alim", "Al-Aziz", "Al-Hafiz", "As-Sami"],
      correctAnswer: "Al-Alim",
    },
    {
      question: "Al-Qabid means?",
      options: ["The Withholder", "The Witness", "The All-Seeing", "The Generous One"],
      correctAnswer: "The Withholder",
    },
    {
      question: "Which name of Allah means 'The Extender'?",
      options: ["Al-Karim", "Al-Rahim", "Al-Basit", "As-Sabur"],
      correctAnswer: "Al-Basit",
    },
    {
      question: "What does Al-Khafid mean?",
      options: ["The Strong", "The Light", "The Subtle One", "The Reducer"],
      correctAnswer: "The Reducer",
    },
    {
      question: "Which name of Allah means 'The Exalter'?",
      options: ["Ar-Rafi", "Al-Hakam", "Al-Malik", "Al-Jabbar"],
      correctAnswer: "Ar-Rafi",
    },
    {
      question: "Al-Mu'izz means?",
      options: ["The Omnipotent", "The Honourer", "The Preserver", "The Subtle One"],
      correctAnswer: "The Honourer",
    },
  ];

  // Function to shuffle options for each question
  const shuffleOptions = () => {
    const shuffled = questions.map(question => {
      // Create a copy of options array and shuffle it
      const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);
      
      return {
        ...question,
        shuffledOptions: shuffledOptions
      };
    });
    
    setShuffledQuestions(shuffled);
  };

  // Initial setup and when restarting quiz
  useEffect(() => {
    shuffleOptions();
  }, []);

  const handleAnswerSelect = (answer) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    if (answer === shuffledQuestions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const handleReturnToQuizzes = () => {
    router.push(`/quizzes`);
    router.dismissAll();
  };

  const handleTryAgain = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
    shuffleOptions(); // Reshuffle options when trying again
  };

  // Guard for when shuffledQuestions is still empty
  if (shuffledQuestions.length === 0) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  if (showResults) {
    return (
      <View style={styles.container}>
        <MaterialIcons 
          name={score === shuffledQuestions.length ? "emoji-events" : "school"} 
          size={100} 
          color="#ad8b1b"
        />
        
        <Text style={styles.scoreText}>
          Your Score: {score}/{shuffledQuestions.length}
        </Text>
        
        <Text style={styles.percentageText}>
          ({Math.round((score / shuffledQuestions.length) * 100)}%)
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.resultButton, styles.tryAgainButton]} 
            onPress={handleTryAgain}
          >
            <Text style={styles.resultButtonText}>Try Again</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.resultButton, styles.returnButton]} 
            onPress={handleReturnToQuizzes}
          >
            <Text style={styles.resultButtonText}>Return to Quizzes</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{currentQuestion.question}</Text>
      <View style={styles.optionsContainer}>
        {currentQuestion.shuffledOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              isAnswered && (
                option === currentQuestion.correctAnswer
                  ? styles.correct
                  : option === selectedAnswer
                    ? styles.incorrect
                    : null
              ),
            ]}
            onPress={() => handleAnswerSelect(option)}
            disabled={isAnswered}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {isAnswered && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
    backgroundColor: '#fff'
  },
  question: { 
    fontSize: 20, 
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  optionsContainer: { 
    width: '100%',
    marginTop: 20 
  },
  optionButton: { 
    padding: 15,
    backgroundColor: '#eee',
    marginVertical: 8,
    borderRadius: 8,
    width: '100%'
  },
  optionText: { 
    fontSize: 16,
    textAlign: 'center'
  },
  correct: { 
    backgroundColor: '#90EE90' 
  },
  incorrect: { 
    backgroundColor: '#FFB6C1' 
  },
  nextButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ad8b1b',
    borderRadius: 8,
    width: '100%'
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  scoreText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#ad8b1b'
    // original blue: #17457a
  },
  percentageText: {
    fontSize: 24,
    color: '#666',
    marginTop: 10
  },
  buttonContainer: {
    width: '100%',
    marginTop: 40,
    gap: 15
  },
  resultButton: {
    padding: 15,
    borderRadius: 8,
    width: '100%'
  },
  tryAgainButton: {
    backgroundColor: '#ad8b1b'
  },
  returnButton: {
    backgroundColor: '#666'
  },
  resultButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export default Quiz1;
