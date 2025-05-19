import { Slot, Stack } from 'expo-router';

export default function RootLayout() {
    return(
        <Stack>
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