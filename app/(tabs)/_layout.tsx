import React from 'react'
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.test,
        tabBarInactiveTintColor: Colors.grey,            
      }}
    >
      <Tabs.Screen
        name="something"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />

      

      <Tabs.Screen
        name="testyourself"
        options={{
          tabBarLabel: "Flashcards",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="card-multiple-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="quizzes"
        options={{
          tabBarLabel: "Quizzes",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="quiz" size={24} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="listen"
        options={{
          tabBarLabel: "Listen Along",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="assistive-listening-systems" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="quizzesinfo"
        options={{
          href: null,
          headerShown: false,
        }}
      />

      

      <Tabs.Screen
        name="flashcards"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
