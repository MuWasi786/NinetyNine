import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const Quiz3 = () => {
  const router = useRouter();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  const questions = [
    {
      question: "What is the meaning of Ash-Shahīd?",
      options: ["The Ever-Living", "The All-Observing Witness", "The Most Praiseworthy", "The One"],
      correctAnswer: "The All-Observing Witness",
    },
    {
      question: "What is the meaning of Al-Ḥaqq?",
      options: ["The Absolute Truth", "The Creator of Death", "The Solely Loyal", "The Gloriously Noble"],
      correctAnswer: "The Absolute Truth",
    },
    {
      question: "What is the meaning of Al-Wakīl?",
      options: ["The Disposer of Affairs", "The All-Strong", "The Sustainer", "The Most Praiseworthy"],
      correctAnswer: "The Disposer of Affairs",
    },
    {
      question: "What is the meaning of Al-Qawwī?",
      options: ["The Firm One", "The All-Strong", "The Creator of All Power", "The Ever-Living"],
      correctAnswer: "The All-Strong",
    },
    {
      question: "What is the meaning of Al-Matīn?",
      options: ["The Forceful One", "The Sustainer", "The All-and-Ever Witnessing", "The One"],
      correctAnswer: "The Forceful One",
    },
    {
      question: "What is the meaning of Al-Waliyy?",
      options: ["The Governor/Friend", "The Creator of Death", "The All-Enumerating", "The Originator"],
      correctAnswer: "The Governor",
    },
    {
      question: "What is the meaning of Al-Ḥamīd?",
      options: ["The Most Praiseworthy", "The One", "The Gloriously Noble", "The Absolute Truth"],
      correctAnswer: "The Most Praiseworthy",
    },
    {
      question: "What is the meaning of Al-Muḥṣī?",
      options: ["The All-Enumerating", "The Most Praiseworthy", "The Gloriously Noble", "The Creator of All Power"],
      correctAnswer: "The All-Enumerating",
    },
    {
      question: "What is the meaning of Al-Mubdi'?",
      options: ["The Originator", "The Most Praiseworthy", "The Firm One", "The All-Strong"],
      correctAnswer: "The Originator",
    },
    {
      question: "What is the meaning of Al-Mu'īd?",
      options: ["The Restorer", "The Ever-Living", "The Absolute Truth", "The One"],
      correctAnswer: "The Restorer",
    },
    {
      question: "What is the meaning of Al-Muḥyī?",
      options: ["The Giver of Life", "The All-Enumerating", "The Sustainer", "The Most Praiseworthy"],
      correctAnswer: "The Giver of Life",
    },
    {
      question: "What is the meaning of Al-Mumīt?",
      options: ["The Inflicter of Death", "The Restorer", "The Perceiver", "The All-Strong"],
      correctAnswer: "The Inflicter of Death",
    },
    {
      question: "What is the meaning of Al-Ḥayy?",
      options: ["The Ever-Living", "The Gloriously Noble", "The Sustainer", "The Originator"],
      correctAnswer: "The Ever-Living",
    },
    {
      question: "What is the meaning of Al-Qayyūm?",
      options: ["The All Knowing", "The One", "The Self-Existing One", "The Giver of Life"],
      correctAnswer: "The Self-Existing One",
    },
    {
      question: "What is the meaning of Al-Wājid?",
      options: ["The Perceiver", "The First", "The Gloriously Noble", "The Self-Sufficient"],
      correctAnswer: "The Perceiver",
    },
    {
      question: "What is the meaning of Al-Mājid?",
      options: ["The Glorious", "The Self-Sufficient", "The Creator of Death", "The All-Strong"],
      correctAnswer: "The Glorious",
    },
    {
      question: "What is the meaning of Al-Wahid?",
      options: ["The Self-Existing", "The Indivisible, The Absolute One", "The Sustainer", "The All-Strong"],
      correctAnswer: "The One",
    },
    {
      question: "What is the meaning of Al-Aḥad?",
      options: ["The Indivisible, The Absolute One", "The Self-Sufficient", "The Ever-Living", "The Absolute Truth"],
      correctAnswer: "The Indivisible, The Absolute One",
    },
    {
      question: "What is the meaning of As-Ṣamad?",
      options: ["The Satisfier Of Needs", "The Gloriously Noble", "The Absolute Truth", "The Giver of Life"],
      correctAnswer: "The Satisfier Of Needs",
    },
    {
      question: "What is the meaning of Al-Qādir?",
      options: ["The Omnipotent", "The Restorer", "The One", "The Absolute Truth"],
      correctAnswer: "The Omnipotent",
    },
    {
      question: "What is the meaning of Al-Muqtadir?",
      options: ["The Powerful", "The Perceiver", "The All-Enumerating", "The Giver of Life"],
      correctAnswer: "The Powerful",
    },
    {
      question: "What is the meaning of Al-Muqaddim?",
      options: ["The Promoter", "The Gloriously Noble", "The All-and-Ever Witnessing", "The Firm One"],
      correctAnswer: "The Promoter",
    },
    {
      question: "What is the meaning of Al-Mu'akhkhir?",
      options: ["The Delayer", "The Creator of All Power", "The Giver of Life", "The Most Praiseworthy"],
      correctAnswer: "The Delayer",
    },
    {
      question: "What is the meaning of Al-Awwal?",
      options: ["The First", "The Self-Sufficient", "The Gloriously Noble", "The One"],
      correctAnswer: "The First",
    },
    {
      question: "What is the meaning of Al-Ākhir?",
      options: ["The Last", "The Perceiver", "The Restorer", "The Gloriously Noble"],
      correctAnswer: "The Last",
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

export default Quiz3;