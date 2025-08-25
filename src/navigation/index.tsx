import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../constants';
import { RootStackParamList, MainTabParamList } from '../types';

// Import screens
import {
  OnboardingScreen,
  HomeScreen,
  DiscoverScreen,
  HistoryScreen,
  RewardsScreen,
  SettingsScreen,
  DestinationResultsScreen,
  TripCostBreakdownScreen,
  GroupTripPlannerScreen,
  EmergencySupportScreen,
} from '../screens';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Discover') {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === 'Rewards') {
            iconName = focused ? 'gift' : 'gift-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray[400],
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopWidth: 1,
          borderTopColor: COLORS.gray[200],
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen 
        name="Discover" 
        component={DiscoverScreen} 
        options={{ tabBarLabel: 'Discover' }}
      />
      <Tab.Screen 
        name="History" 
        component={HistoryScreen} 
        options={{ tabBarLabel: 'History' }}
      />
      <Tab.Screen 
        name="Rewards" 
        component={RewardsScreen} 
        options={{ tabBarLabel: 'Rewards' }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ tabBarLabel: 'Settings' }}
      />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.white,
        },
        headerTintColor: COLORS.text.primary,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen 
        name="Onboarding" 
        component={OnboardingScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabNavigator} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="DestinationResults" 
        component={DestinationResultsScreen}
        options={{ title: 'Destinations' }}
      />
      <Stack.Screen 
        name="TripCostBreakdown" 
        component={TripCostBreakdownScreen}
        options={{ title: 'Trip Cost Breakdown' }}
      />
      <Stack.Screen 
        name="GroupTripPlanner" 
        component={GroupTripPlannerScreen}
        options={{ title: 'Group Trip Planner' }}
      />
      <Stack.Screen 
        name="EmergencySupport" 
        component={EmergencySupportScreen}
        options={{ title: 'Emergency Support' }}
      />
    </Stack.Navigator>
  );
}

export { MainTabNavigator };
export default RootNavigator;