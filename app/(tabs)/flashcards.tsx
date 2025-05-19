import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  Alert,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from 'react-native';
import MainImage from "@/assets/images/MAINBACKGROUND.png";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { NameType, topics } from '@/constants/Data';
import { iconMapping }      from '@/constants/iconMapping';

const { width } = Dimensions.get('window');

export default function Flashcards() {
  const router    = useRouter();
  const params    = useLocalSearchParams();
  const range     = (params.range as string) || '1-1';
  const [start, end] = range
    .split('-')
    .map(n => parseInt(n, 10) - 1);

  const [displayCards, setDisplayCards] = useState<NameType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped]       = useState(false);
  const [knownCards, setKnownCards]     = useState<number[]>([]);
  const [unknownCards, setUnknownCards] = useState<number[]>([]);
  const [completed, setCompleted]       = useState(false);

  const flipAnim = useState(new Animated.Value(0))[0];
  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  useEffect(() => {
    // pull directly from your real Data.ts
    const slice = topics.slice(start, end + 1);
    setDisplayCards(slice);
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownCards([]);
    setUnknownCards([]);
    setCompleted(false);
    flipAnim.setValue(0);
  }, [start, end]);

  const resetFlip = () => {
    setIsFlipped(false);
    flipAnim.setValue(0);
  };

  const flipCard = () => {
    Animated.timing(flipAnim, {
      toValue: isFlipped ? 0 : 180,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsFlipped(!isFlipped);
  };

  const nextCard = () => {
  // 1) If we're on the last card AND either:
  //    • no unknowns to review, OR
  //    • already in review mode → done, show alert and reset
  if (
    currentIndex === displayCards.length - 1 &&
    (unknownCards.length === 0 || completed)
  ) {
    Alert.alert(
      'Completed!',
      "You've finished all the cards!",
      [
        {
          text: 'Exit',
          onPress: () => {
            const original = topics.slice(start, end + 1);
            setDisplayCards(original);
            setCurrentIndex(0);
            setKnownCards([]);
            setUnknownCards([]);
            setCompleted(false);
            resetFlip();
            // Optional: router.back(); if you want to exit the screen
          }
        },
        {
          text: 'Start Over',
          onPress: () => {
            const original = topics.slice(start, end + 1);
            setDisplayCards(original);
            setCurrentIndex(0);
            setKnownCards([]);
            setUnknownCards([]);
            setCompleted(false);
            resetFlip();
          }
        }
      ]
    );
    return;
  }

  // 2) If not in review mode and unknowns exist → go to review mode
  if (
    currentIndex === displayCards.length - 1 &&
    unknownCards.length > 0 &&
    !completed
  ) {
    const review = topics.filter((_, idx) => unknownCards.includes(idx));
    setDisplayCards(review);
    setCurrentIndex(0);
    setCompleted(true);
    resetFlip();
    Alert.alert('Review Time!', "Let's review the cards you marked as unknown.");
    return;
  }

  // 3) Otherwise, just go to the next card
  if (currentIndex < displayCards.length - 1) {
    setCurrentIndex(i => i + 1);
    resetFlip();
  }
};

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(idx => idx - 1);
      resetFlip();
    }
  };

  const markKnown = () => {
    const globalIdx = start + currentIndex;
    setKnownCards(k => Array.from(new Set([...k, globalIdx])));
    setUnknownCards(u => u.filter(i => i !== globalIdx));
    nextCard();
  };

  const markUnknown = () => {
    const globalIdx = start + currentIndex;
    setUnknownCards(u => Array.from(new Set([...u, globalIdx])));
    setKnownCards(k => k.filter(i => i !== globalIdx));
    nextCard();
  };

  if (!displayCards.length) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: '#fff' }}>Loading…</Text>
      </SafeAreaView>
    );
  }

  const currentCard = displayCards[currentIndex];
  const prog = (currentIndex + 1) / displayCards.length;
  const progWidth = prog * (width - 80);
  const iconKey = currentCard.id; // must match your iconMapping keys

  return (
    <ImageBackground source={MainImage} style={styles.backgroundImage}>
    <LinearGradient
        colors={['#101746', '#142f60', '#17457a', '#1a5a91']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
    />
    <SafeAreaView style={styles.container}>
      {/* Progress */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: progWidth }]} />
        </View>
        <Text style={styles.progressText}>
          {currentIndex + 1}/{displayCards.length}
          {completed && ' (Review)'}
        </Text>
      </View>

      {/* Card */}
      <View style={styles.cardWrapper}>
        <TouchableOpacity
          style={styles.cardContainer}
          activeOpacity={0.9}
          onPress={flipCard}
        >
          {/* front */}
          <Animated.View
            style={[
              styles.card,
              { transform: [{ rotateY: frontInterpolate }] },
              { opacity: isFlipped ? 0 : 1 },
            ]}
          >
            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                {iconMapping[iconKey] ? (
                  <Image
                    source={iconMapping[iconKey]}
                    style={styles.cardIcon}
                  />
                ) : (
                  <Text style={styles.missingIcon}>?</Text>
                )}
              </View>
              <Text style={styles.cardTitle}>
                {currentCard.title}
              </Text>
            </View>
          </Animated.View>

          {/* back */}
          <Animated.View 
          style={[
          styles.card,
            styles.cardBack,
            { transform: [{ rotateY: backInterpolate }] },
            {   opacity: isFlipped ? 1 : 0 },
        ]}>
            
  <View style={styles.cardContentBack}>
    <Text style={styles.cardTitleBack}>
      {currentCard.title}
    </Text>
    
    <ScrollView 
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.cardMeaning}>
        {currentCard.description}
      </Text>
      <Text style={styles.cardDescription}>
        {currentCard.meaning}
      </Text>
    </ScrollView>
    
    <View style={styles.cardActions}>
      <TouchableOpacity
        style={[styles.actionButton, styles.crossButton]}
        onPress={markUnknown}
      >
        <Text style={styles.actionText}>✗</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, styles.checkButton]}
        onPress={markKnown}
      >
        <Text style={styles.actionText}>✓</Text>
      </TouchableOpacity>
    </View>
  </View>
</Animated.View>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          Known: {knownCards.length} | Unknown: {unknownCards.length}
        </Text>
      </View>

      {/* Nav */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[
            styles.navigationButton,
            currentIndex === 0 && styles.disabledButton,
          ]}
          onPress={prevCard}
          disabled={currentIndex === 0}
        >
          <Text style={styles.navigationText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={nextCard}
        >
          <Text style={styles.navigationText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Exit */}
      <TouchableOpacity style={styles.exitButton} onPress={() => {
  router.replace('/testyourself'); // or use the correct path if different
}}>
        <Text style={styles.exitText}>Exit</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  progressContainer: {
    alignItems: 'center',
    marginTop: 25,
  },
  progressBarContainer: {
    width: width - 80,
    height: 20,
    backgroundColor: '#6b7280',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#ad8b1b',
    borderRadius: 10,
  },
  progressText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  cardWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: width - 80,
    height: 400,
    position: 'relative',
    perspective: 1000,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    backfaceVisibility: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardBack: {
    backfaceVisibility: 'hidden',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardContentBack: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 20,
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  missingIcon: {
    fontSize: 48,
    color: '#ccc',
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  cardTitleBack: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000',
  },
  cardMeaning: {
    fontSize: 18,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 10,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 16,
    lineHeight: 22,
    color: '#6b7280',
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  cardActions: {
  flexDirection: 'row',
  marginTop: 'auto', // This will push the actions to bottom
  width: '60%',
  justifyContent: 'space-between',
  paddingBottom: 10, // Add some padding
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossButton: {
    backgroundColor: '#ef4444',
  },
  checkButton: {
    backgroundColor: '#22c55e',
  },
  actionText: {
    fontSize: 24,
    color: '#fff',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    marginRight: 40,
    marginLeft: 40, 
  },
  navigationButton: {
    backgroundColor: '#ad8b1b',
    paddingVertical: 20,
    paddingHorizontal: 56,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#aaa',
    opacity: 0.6,
  },
  navigationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  exitButton: {
    alignItems: 'center',
    marginBottom: 13,
    bottom: 6,
  },
  exitText: {
    color: '#fff',
    fontSize: 16,
  },
  statsContainer: {
    alignItems: 'center',
    bottom: 24,
  },
  statsText: {
    color: '#fff',
    fontSize: 14,
  },
  scrollContainer: {
  flex: 1,
  width: '100%',
  marginBottom: 10,
  },
  scrollContent: {
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  cardContentBack: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start', // Changed from 'center'
  },
  cardMeaning: {
    fontSize: 18,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 10,
    textAlign: 'center',
    width: '100%', // Added
  },
  cardDescription: {
    fontSize: 16,
    lineHeight: 22,
    color: '#6b7280',
    textAlign: 'center',
    width: '100%', // Added
  },
  gradient: {
      ...StyleSheet.absoluteFillObject, // covers whole screen
      opacity: 0.9, // adjust opacity as needed
    },

    
});
