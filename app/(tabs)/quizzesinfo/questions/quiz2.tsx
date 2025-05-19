import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const Quiz2 = () => {
  const router = useRouter();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  const questions = [
    {
      question: "What is the meaning of Al-Muzil?",
      options: ["The Humiliator", "The Glorious", "The All-Wise", "The Most Generous"],
      correctAnswer: "The Humiliator",
    },
    {
      question: "What is the meaning of As-Samī'?",
      options: ["The All-Seeing", "The All-Hearing", "The Reckoner", "The Watchful"],
      correctAnswer: "The All-Hearing",
    },
    {
      question: "What is the meaning of Al-Basīr?",
      options: ["The All-Wise", "The Most Forbearing", "The All-Seeing", "The Infuser of New Life"],
      correctAnswer: "The All-Seeing",
    },
    {
      question: "What is the meaning of Al-Hakam?",
      options: ["The Watchful", "The Judge", "The Most Loving", "The Great Forgiver"],
      correctAnswer: "The Judge",
    },
    {
      question: "What is the meaning of Al-'Adl?",
      options: ["The Most Generous", "The Utterly Just", "The Majestic", "The Most High"],
      correctAnswer: "The Utterly Just",
    },
    {
      question: "What is the meaning of Al-Latīf?",
      options: ["The Most Gentle", "The Most Loving", "The Glorious", "The Reckoner"],
      correctAnswer: "The Most Gentle",
    },
    {
      question: "What is the meaning of Al-Khabīr?",
      options: ["The Most Wise", "The All-Wise", "The Watchful", "The All-Aware"],
      correctAnswer: "The All-Aware",
    },
    {
      question: "What is the meaning of Al-Halīm?",
      options: ["The Impartial Judge", "The Most Forbearing", "The Most Great", "The Most High"],
      correctAnswer: "The Most Forbearing",
    },
    {
      question: "What is the meaning of Al-'Aẓīm?",
      options: ["The Magnificent", "The Infuser of New Life", "The Great Forgiver", "The Sustainer"],
      correctAnswer: "The Magnificent",
    },
    {
      question: "What is the meaning of Al-Ghafūr?",
      options: ["The All-Forgiving", "The Majestic", "The Most Loving", "The Most High"],
      correctAnswer: "The All-Forgiving",
    },
    {
      question: "What is the meaning of Ash-Shakūr?",
      options: ["The Most Appreciative", "The Watchful", "The Most Loving", "The All-Wise"],
      correctAnswer: "The Most Appreciative",
    },
    {
      question: "What is the meaning of Al-'Aliyy?",
      options: ["The Most High", "The Majestic", "The Glorious", "The All-Encompassing"],
      correctAnswer: "The Most High",
    },
    {
      question: "What is the meaning of Al-Kabīr?",
      options: ["The Most Great", "The All-Aware", "The Infuser of New Life", "The Reckoner"],
      correctAnswer: "The Most Great",
    },
    {
      question: "What is the meaning of Al-Hafīẓ?",
      options: ["The Preserver", "The Most Forbearing", "The Most Generous", "The Great Forgiver"],
      correctAnswer: "The Preserver",
    },
    {
      question: "What is the meaning of Al-Muqīt?",
      options: ["The Sustainer", "The Majestic", "The Most High", "The Glorious"],
      correctAnswer: "The Sustainer",
    },
    {
      question: "What is the meaning of Al-Hasīb?",
      options: ["The Reckoner", "The Watchful", "The Impartial Judge", "The Great Forgiver"],
      correctAnswer: "The Reckoner",
    },
    {
      question: "What is the meaning of Al-Jalīl?",
      options: ["The Majestic", "The Most Generous", "The Watchful", "The Glorious"],
      correctAnswer: "The Majestic",
    },
    {
      question: "What is the meaning of Al-Karīm?",
      options: ["The Most Generous", "The All-Wise", "The Reckoner", "The Infuser of New Life"],
      correctAnswer: "The Most Generous",
    },
    {
      question: "What is the meaning of Ar-Raqīb?",
      options: ["The Watchful", "The Subtle One", "The Most Loving", "The All-Encompassing"],
      correctAnswer: "The Watchful",
    },
    {
      question: "What is the meaning of Al-Mujīb?",
      options: ["The Responsive One", "The Reckoner", "The Most Wise", "The Glorious"],
      correctAnswer: "The Responsive One",
    },
    {
      question: "What is the meaning of Al-Wāsi'?",
      options: ["The All-Encompassing", "The Most Generous", "The Most Forbearing", "The Infuser of New Life"],
      correctAnswer: "The All-Encompassing",
    },
    {
      question: "What is the meaning of Al-Hakīm?",
      options: ["The Most Wise", "The Impartial Judge", "The Most Loving", "The All-Aware"],
      correctAnswer: "The Most Wise",
    },
    {
      question: "What is the meaning of Al-Wadūd?",
      options: ["The Most Loving", "The Most Forbearing", "The Glorious", "The Infuser of New Life"],
      correctAnswer: "The Most Loving",
    },
    {
      question: "What is the meaning of Al-Majīd?",
      options: ["The Glorious", "The Great Forgiver", "The Reckoner", "The Most High"],
      correctAnswer: "The Glorious",
    },
    {
      question: "What is the meaning of Al-Bā'ith?",
      options: ["The Resurrector", "The Reckoner", "The Most Wise", "The All-Aware"],
      correctAnswer: "The Resurrector",
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
    router.back();
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

export default Quiz2;