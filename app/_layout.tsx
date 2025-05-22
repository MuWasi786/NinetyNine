import { Slot, Stack } from 'expo-router';
import 'whatwg-fetch';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

//This file tells us how to navigate between screens!

export default function RootLayout() { //root layout component, wraps the navigation


    const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'QuranFont': require('../assets/fonts/Quran-Regular.ttf'), // ✅ Adjust path as needed
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

    return(
        <Stack> {/* this defines navigable screens */}

            {/* User going to the tabs route, dont show hear */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false}}/>
            <Stack.Screen name="index" options={{ headerShown: false}}/>
            <Stack.Screen name="nameDetails/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="quizzesinfo/instructions/[id]" options={{ headerShown: false }} />
            
            <Stack.Screen name="quizzesinfo/questions/quiz1" options={{ headerShown: false }} />
            <Stack.Screen name="quizzesinfo/questions/quiz2" options={{ headerShown: false }} />
            <Stack.Screen name="quizzesinfo/questions/quiz3" options={{ headerShown: false }} />
            <Stack.Screen name="quizzesinfo/questions/quiz4" options={{ headerShown: false }} />
            <Stack.Screen name="quizzesinfo/questions/quiz5" options={{ headerShown: false }} />
        </Stack>
    )
}