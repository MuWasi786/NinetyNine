import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const Quiz5 = () => {
  const router = useRouter();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  const originalQuestions = [
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
      correctAnswer: "The Governor/Friend",
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
      options: ["The Self-Existing One", "The One", "The Caring", "The Giver of Life"],
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
      question: "What is the meaning of Al-Wāḥid?",
      options: ["The One", "The Indivisible, The Absolute One", "The Sustainer", "The All-Strong"],
      correctAnswer: "The One",
    },
    {
      question: "What is the meaning of Al-Aḥad?",
      options: ["The Indivisible, The Absolute One", "The Self-Sufficient", "The Ever-Living", "The Absolute Truth"],
      correctAnswer: "The Indivisible, The Absolute One",
    },
    {
      question: "What is the meaning of As-Ṣamad?",
      options: ["The The Satisfier Of Needs", "The Gloriously Noble", "The Absolute Truth", "The Giver of Life"],
      correctAnswer: "The The Satisfier Of Needs",
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

  // Function to shuffle array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Prepare shuffled questions with shuffled options
  useEffect(() => {
    prepareShuffledQuestions();
  }, []);

  const prepareShuffledQuestions = () => {
    const prepared = originalQuestions.map(q => {
      // Create a copy of the question
      const questionCopy = { ...q };
      
      // Shuffle the options
      questionCopy.options = shuffleArray([...q.options]);
      
      return questionCopy;
    });
    
    setShuffledQuestions(prepared);
  };

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
    // Dismiss all modals and navigate back to quizzes
    router.back();
  };
  
  const handleTryAgain = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
    prepareShuffledQuestions(); // Reshuffle questions when trying again
  };

  // Early return if questions aren't loaded yet
  if (shuffledQuestions.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Loading questions...</Text>
      </View>
    );
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
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              isAnswered && option === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer && styles.incorrect,
              isAnswered && option === currentQuestion.correctAnswer && styles.correct,
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

export default Quiz5;