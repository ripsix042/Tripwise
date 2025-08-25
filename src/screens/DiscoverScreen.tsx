import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, SHADOWS } from '../constants';
import { NavigationProps } from '../types';
import { mockDestinations } from '../services/mockData';

export default function DiscoverScreen({ navigation }: NavigationProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Discover</Text>
          <Text style={styles.subtitle}>Explore amazing destinations</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Destinations</Text>
          {mockDestinations.map((destination) => (
            <TouchableOpacity key={destination.id} style={styles.destinationCard}>
              <Image source={{ uri: destination.imageUrl }} style={styles.destinationImage} />
              <View style={styles.destinationInfo}>
                <Text style={styles.destinationName}>{destination.name}</Text>
                <Text style={styles.destinationCountry}>{destination.country}</Text>
                <Text style={styles.destinationDescription} numberOfLines={2}>
                  {destination.description}
                </Text>
                <View style={styles.destinationMeta}>
                  <View style={styles.rating}>
                    <Ionicons name="star" size={16} color={COLORS.warning} />
                    <Text style={styles.ratingText}>{destination.rating}</Text>
                  </View>
                  <Text style={styles.price}>From ${destination.averageCost}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
    paddingTop: SPACING.md,
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text.primary,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
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
  destinationCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: SPACING.md,
    overflow: 'hidden',
    ...SHADOWS.md,
  },
  destinationImage: {
    width: '100%',
    height: 200,
  },
  destinationInfo: {
    padding: SPACING.md,
  },
  destinationName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text.primary,
  },
  destinationCountry: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  destinationDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    lineHeight: 18,
    marginBottom: SPACING.sm,
  },
  destinationMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.primary,
    marginLeft: SPACING.xs,
    fontWeight: FONT_WEIGHTS.medium,
  },
  price: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.primary,
  },
});