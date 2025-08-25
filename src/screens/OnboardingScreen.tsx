import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS } from '../constants';
import { NavigationProps } from '../types';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen({ navigation }: NavigationProps) {
  const handleGetStarted = () => {
    navigation.replace('MainTabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.iconContainer}>
            <Ionicons name="airplane" size={60} color={COLORS.primary} />
          </View>
          <Text style={styles.title}>Welcome to Tripwise</Text>
          <Text style={styles.subtitle}>
            Your smart vacation planner that helps you discover amazing destinations within your budget
          </Text>
        </View>

        {/* Features */}
        <View style={styles.featuresSection}>
          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Ionicons name="wallet-outline" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Budget Planning</Text>
              <Text style={styles.featureDescription}>
                Enter your budget and get personalized destination recommendations
              </Text>
            </View>
          </View>

          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Ionicons name="sparkles-outline" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>AI Recommendations</Text>
              <Text style={styles.featureDescription}>
                Get smart suggestions based on your preferences and travel style
              </Text>
            </View>
          </View>

          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Ionicons name="people-outline" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Group Planning</Text>
              <Text style={styles.featureDescription}>
                Plan trips with friends and split costs easily
              </Text>
            </View>
          </View>
        </View>

        {/* CTA Button */}
        <View style={styles.ctaSection}>
          <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
            <Text style={styles.getStartedText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    justifyContent: 'space-between',
  },
  heroSection: {
    alignItems: 'center',
    paddingTop: height * 0.1,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  subtitle: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: SPACING.md,
  },
  featuresSection: {
    paddingVertical: SPACING.xl,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  featureDescription: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    lineHeight: 20,
  },
  ctaSection: {
    paddingBottom: SPACING.xl,
  },
  getStartedButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  getStartedText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.white,
    marginRight: SPACING.sm,
  },
});