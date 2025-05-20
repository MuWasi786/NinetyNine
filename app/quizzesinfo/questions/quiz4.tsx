import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const Quiz4 = () => {
  const router = useRouter();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  const questions = [
    {
      question: "What is the meaning of Aẓ-Ẓāhir?",
      options: ["The Hidden One", "The Protecting Friend", "The Manifest", "The Supreme One"],
      correctAnswer: "The Manifest",
    },
    {
      question: "What is the meaning of Al-Bāṭin?",
      options: ["The Hidden One", "The Source/ Doer of All Goodness", "The Ever-Pardoning", "The Manifest"],
      correctAnswer: "The Hidden One",
    },
    {
      question: "What is the meaning of Al-Wālī?",
      options: ["The Supreme One", "The Protecting Friend", "The Light", "The Enricher"],
      correctAnswer: "The Protecting Friend",
    },
    {
      question: "What is the meaning of Al-Muta'ālī?",
      options: ["The Most Kind", "The Supreme One", "The Ever-Pardoning", "The Just One"],
      correctAnswer: "The Supreme One",
    },
    {
      question: "What is the meaning of Al-Barr?",
      options: ["The Source/ Doer of All Goodness", "The Inheritor of All", "The Benefactor", "The Guide"],
      correctAnswer: "The Source/ Doer of All Goodness",
    },
    {
      question: "What is the meaning of At-Tawwāb?",
      options: ["The Ever-Pardoning", "The Withholder", "The Most Patient", "The Omnipotent"],
      correctAnswer: "The Ever-Pardoning",
    },
    {
      question: "What is the meaning of Al-Muntaqim?",
      options: ["The Most Patient", "The Avenger", "The Hidden One", "The Originator"],
      correctAnswer: "The Avenger",
    },
    {
      question: "What is the meaning of Al-'Afuww?",
      options: ["The Forgiver", "The Omnipotent", "The Creator of Death", "The Absolute Truth"],
      correctAnswer: "The Forgiver",
    },
    {
      question: "What is the meaning of Ar-Ra'ūf?",
      options: ["The Guide", "The Most Kind", "The One", "The Avenger"],
      correctAnswer: "The Most Kind",
    },
    {
      question: "What is the meaning of Mālik-ul-Mulk?",
      options: ["Master of the Kingdom/Owner of All", "The Inheritor of All", "The Gloriously Noble", "The Expediter"],
      correctAnswer: "Master of the Kingdom/Owner of All",
    },
    {
      question: "What is the meaning of Dhū-l-Jalāli wa-l-Ikrām?",
      options: ["The Lord of Majesty and Bounty", "The Self-Sufficient", "The Most Kind", "The One"],
      correctAnswer: "The Lord of Majesty and Bounty",
    },
    {
      question: "What is the meaning of Al-Muqsiṭ?",
      options: ["The Just One", "The Omnipotent", "The Perceiver", "The Restorer"],
      correctAnswer: "The Just One",
    },
    {
      question: "What is the meaning of Al-Jāmi'?",
      options: ["The Giver of Life", "The Gatherer", "The All-Strong", "The Absolute Truth"],
      correctAnswer: "The Gatherer",
    },
    {
      question: "What is the meaning of Al-Ghanīyy?",
      options: ["The Self-Sufficient", "The Firm One", "The Restorer", "The Sustainer"],
      correctAnswer: "The Self-Sufficient",
    },
    {
      question: "What is the meaning of Al-Mughni?",
      options: ["The Enricher", "The Light", "The Perceiver", "The Withholder"],
      correctAnswer: "The Enricher",
    },
    {
      question: "What is the meaning of Al-Māni'?",
      options: ["The Withholder", "The One", "The Absolute Truth", "The Sustainer"],
      correctAnswer: "The Withholder",
    },
    {
      question: "What is the meaning of Aḍ-Ḍārr?",
      options: ["The Distresser", "The Creator of Death", "The Light", "The Gloriously Noble"],
      correctAnswer: "The Distresser",
    },
    {
      question: "What is the meaning of An-Nāfi'?",
      options: ["The Propitious/ Benefactor", "The Ever-Living", "The Expediter", "The Delayer"],
      correctAnswer: "The Propitious/ Benefactor",
    },
    {
      question: "What is the meaning of An-Nūr?",
      options: ["The Guide", "The Light", "The Inheritor of All", "The Just One"],
      correctAnswer: "The Light",
    },
    {
      question: "What is the meaning of Al-Hādī?",
      options: ["The Guide", "The Originator", "The First", "The Creator of All Power"],
      correctAnswer: "The Guide",
    },
    {
      question: "What is the meaning of Al-Badī'?",
      options: ["The Originator", "The One", "The Last", "The Supreme One"],
      correctAnswer: "The Originator",
    },
    {
      question: "What is the meaning of Al-Bāqī?",
      options: ["The Everlasting", "The Firm One", "The Perceiver", "The Indivisible, The Absolute One"],
      correctAnswer: "The Everlasting",
    },
    {
      question: "What is the meaning of Al-Wārith?",
      options: ["The Inheritor of All", "The Most Kind", "The Gatherer", "The Most Praiseworthy"],
      correctAnswer: "The Inheritor of All",
    },
    {
      question: "What is the meaning of Ar-Rashīd?",
      options: ["The Guide, Infallible Teacher", "The Ever-Pardoning", "The One", "The Indivisible, The Absolute One"],
      correctAnswer: "The Guide, Infallible Teacher",
    },
    {
      question: "What is the meaning of Aṣ-Ṣabūr?",
      options: ["The Most Patient", "The Self-Sufficient", "The Omnipotent", "The Creator of Death"],
      correctAnswer: "The Most Patient",
    },
  ];

  // Function to shuffle array (Fisher-Yates algorithm)
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Shuffle options when question changes or quiz restarts
  useEffect(() => {
    if (questions[currentQuestionIndex]) {
      setShuffledOptions(shuffleArray(questions[currentQuestionIndex].options));
    }
  }, [currentQuestionIndex, showResults]);

  const handleAnswerSelect = (answer) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
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
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (showResults) {
    return (
      <View style={styles.container}>
        <MaterialIcons 
          name={score === questions.length ? "emoji-events" : "school"} 
          size={100} 
          color="#ad8b1b"
        />
        
        <Text style={styles.scoreText}>
          Your Score: {score}/{questions.length}
        </Text>
        
        <Text style={styles.percentageText}>
          ({Math.round((score / questions.length) * 100)}%)
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
        {shuffledOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              isAnswered && option === selectedAnswer && option !== currentQuestion.correctAnswer && styles.incorrect,
              isAnswered && option === currentQuestion.correctAnswer && styles.correct
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

export default Quiz4;