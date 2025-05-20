import { Stack } from 'expo-router';

export default function QuizzesInfoLayout() {
    return (
        <Stack>
            <Stack.Screen 
                name="instructions/[id]" 
                options={{ headerShown: false,}} 
            />
            <Stack.Screen 
                name="questions/quiz1" 
                options={{ headerShown: false, presentation: 'modal'  }} 
            />
            <Stack.Screen 
                name="questions/quiz2" 
                options={{ headerShown: false, presentation: 'modal'  }} 
            />
            <Stack.Screen 
                name="questions/quiz3" 
                options={{ headerShown: false, presentation: 'modal'  }} 
            />
            <Stack.Screen 
                name="questions/quiz4" 
                options={{ headerShown: false, presentation: 'modal'  }} 
            />
            <Stack.Screen 
                name="questions/quiz5" 
                options={{ headerShown: false, presentation: 'modal'  }} 
            />
        </Stack>
    );
}