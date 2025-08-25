import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, TRAVEL_CATEGORIES } from '../constants';
import { NavigationProps } from '../types';
import { mockUser } from '../services/mockData';

export default function HomeScreen({ navigation }: NavigationProps) {
  const [budget, setBudget] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [travelers, setTravelers] = useState('1');

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleFindDestinations = () => {
    if (!budget || parseFloat(budget) <= 0) {
      Alert.alert('Invalid Budget', 'Please enter a valid budget amount.');
      return;
    }

    if (selectedCategories.length === 0) {
      Alert.alert('Select Interests', 'Please select at least one travel interest.');
      return;
    }

    navigation.navigate('DestinationResults', {
      budget: parseFloat(budget),
      preferences: {
        ...mockUser.preferences,
        interests: selectedCategories,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {mockUser.name}! 👋</Text>
            <Text style={styles.subtitle}>Where would you like to go?</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle-outline" size={32} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Budget Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What's your budget?</Text>
          <View style={styles.budgetContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.budgetInput}
              value={budget}
              onChangeText={setBudget}
              placeholder="Enter your budget"
              keyboardType="numeric"
              placeholderTextColor={COLORS.gray[400]}
            />
          </View>
          <Text style={styles.budgetHint}>This includes flights, accommodation, food, and activities</Text>
        </View>

        {/* Travelers Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Number of travelers</Text>
          <View style={styles.travelersContainer}>
            <TouchableOpacity 
              style={styles.travelerButton}
              onPress={() => setTravelers(Math.max(1, parseInt(travelers) - 1).toString())}
            >
              <Ionicons name="remove" size={20} color={COLORS.primary} />
            </TouchableOpacity>
            <Text style={styles.travelersCount}>{travelers}</Text>
            <TouchableOpacity 
              style={styles.travelerButton}
              onPress={() => setTravelers((parseInt(travelers) + 1).toString())}
            >
              <Ionicons name="add" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Interests Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What interests you?</Text>
          <View style={styles.categoriesContainer}>
            {TRAVEL_CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategories.includes(category) && styles.categoryChipSelected,
                ]}
                onPress={() => handleCategoryToggle(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategories.includes(category) && styles.categoryTextSelected,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => navigation.navigate('GroupTripPlanner', {})}
            >
              <Ionicons name="people" size={24} color={COLORS.primary} />
              <Text style={styles.quickActionText}>Group Trip</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => navigation.navigate('EmergencySupport')}
            >
              <Ionicons name="medical" size={24} color={COLORS.error} />
              <Text style={styles.quickActionText}>Emergency</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Find Destinations Button */}
        <TouchableOpacity style={styles.findButton} onPress={handleFindDestinations}>
          <Text style={styles.findButtonText}>Find Destinations</Text>
          <Ionicons name="search" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.md,
    marginBottom: SPACING.xl,
  },
  greeting: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text.primary,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
  },
  profileButton: {
    padding: SPACING.xs,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  budgetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  currencySymbol: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text.primary,
    marginRight: SPACING.xs,
  },
  budgetInput: {
    flex: 1,
    fontSize: FONT_SIZES.lg,
    color: COLORS.text.primary,
    paddingVertical: SPACING.sm,
  },
  budgetHint: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
  },
  travelersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingVertical: SPACING.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  travelerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  travelersCount: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text.primary,
    marginHorizontal: SPACING.xl,
    minWidth: 40,
    textAlign: 'center',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  categoryChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
  },
  categoryChipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
  },
  categoryTextSelected: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.medium,
  },
  quickActions: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  quickAction: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  quickActionText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.primary,
    marginTop: SPACING.xs,
    fontWeight: FONT_WEIGHTS.medium,
  },
  findButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.xl,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  findButtonText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.white,
    marginRight: SPACING.sm,
  },
});