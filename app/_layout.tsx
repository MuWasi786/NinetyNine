import { Slot, Stack } from 'expo-router';

//This file tells us how to navigate between screens!

export default function RootLayout() { //root layout component, wraps the navigation
    return(
        <Stack> {/* this defines navigable screens */}

            {/* User going to the tabs route, dont show header */}
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