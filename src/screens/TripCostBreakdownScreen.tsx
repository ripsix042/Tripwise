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
import { NavigationProps, Destination, TripCost } from '../types';
import { calculateTripCost } from '../services/mockData';

export default function TripCostBreakdownScreen({ navigation, route }: NavigationProps) {
  const { destination, budget = 1000, travelers = 1 } = route?.params || {};
  const [tripCost, setTripCost] = React.useState<TripCost | null>(null);
  const [selectedDuration, setSelectedDuration] = React.useState(7);

  React.useEffect(() => {
    if (destination) {
      const fetchCosts = async () => {
        const costs = await calculateTripCost(destination.id, selectedDuration, travelers);
        setTripCost(costs);
      };
      fetchCosts();
    }
  }, [destination, selectedDuration, travelers]);

  const durations = [3, 5, 7, 10, 14];

  const costItems = tripCost
    ? [
        {
          icon: 'airplane',
          title: 'Flights',
          amount: tripCost.flights,
          color: COLORS.primary,
        },
        {
          icon: 'bed',
          title: 'Accommodation',
          amount: tripCost.accommodation,
          color: COLORS.secondary,
        },
        {
          icon: 'restaurant',
          title: 'Food & Dining',
          amount: tripCost.food,
          color: COLORS.success,
        },
        {
          icon: 'car',
          title: 'Transportation',
          amount: tripCost.transport,
          color: COLORS.warning,
        },
        {
          icon: 'camera',
          title: 'Activities',
          amount: tripCost.activities,
          color: COLORS.error,
        },
      ]
    : [];

  const handleBookTrip = () => {
    navigation.navigate('GroupTripPlanner', {
      destination,
      tripCost,
      duration: selectedDuration,
      travelers,
    });
  };

  if (!destination || !tripCost) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Calculating costs...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isWithinBudget = tripCost.total <= budget;
  const budgetDifference = Math.abs(tripCost.total - budget);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Trip Cost</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Destination Header */}
        <View style={styles.destinationCard}>
          <Image source={{ uri: destination.imageUrl }} style={styles.destinationImage} />
          <View style={styles.destinationOverlay}>
            <Text style={styles.destinationName}>{destination.name}</Text>
            <Text style={styles.destinationCountry}>{destination.country}</Text>
          </View>
        </View>

        {/* Duration Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trip Duration</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.durationContainer}>
              {durations.map((duration) => (
                <TouchableOpacity
                  key={duration}
                  style={[
                    styles.durationButton,
                    selectedDuration === duration && styles.durationButtonActive,
                  ]}
                  onPress={() => setSelectedDuration(duration)}
                >
                  <Text
                    style={[
                      styles.durationText,
                      selectedDuration === duration && styles.durationTextActive,
                    ]}
                  >
                    {duration} days
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Cost Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cost Breakdown</Text>
          <View style={styles.costCard}>
            {costItems.map((item, index) => (
              <View key={index} style={styles.costItem}>
                <View style={styles.costItemLeft}>
                  <View style={[styles.costIcon, { backgroundColor: item.color + '20' }]}>
                    <Ionicons name={item.icon as any} size={20} color={item.color} />
                  </View>
                  <Text style={styles.costTitle}>{item.title}</Text>
                </View>
                <Text style={styles.costAmount}>${item.amount}</Text>
              </View>
            ))}
            <View style={styles.totalDivider} />
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Cost</Text>
              <Text style={styles.totalAmount}>${tripCost.total}</Text>
            </View>
          </View>
        </View>

        {/* Budget Comparison */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Budget Analysis</Text>
          <View style={styles.budgetCard}>
            <View style={styles.budgetRow}>
              <Text style={styles.budgetLabel}>Your Budget</Text>
              <Text style={styles.budgetAmount}>${budget}</Text>
            </View>
            <View style={styles.budgetRow}>
              <Text style={styles.budgetLabel}>Trip Cost</Text>
              <Text style={styles.budgetAmount}>${tripCost.total}</Text>
            </View>
            <View style={styles.budgetDivider} />
            <View style={styles.budgetRow}>
              <Text style={[styles.budgetLabel, styles.budgetResultLabel]}>
                {isWithinBudget ? 'Under Budget' : 'Over Budget'}
              </Text>
              <Text
                style={[
                  styles.budgetAmount,
                  styles.budgetResultAmount,
                  { color: isWithinBudget ? COLORS.success : COLORS.error },
                ]}
              >
                {isWithinBudget ? '-' : '+'}${budgetDifference}
              </Text>
            </View>
            {!isWithinBudget && (
              <View style={styles.budgetWarning}>
                <Ionicons name="warning" size={16} color={COLORS.warning} />
                <Text style={styles.budgetWarningText}>
                  Consider adjusting your trip duration or preferences to fit your budget.
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Trip Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trip Details</Text>
          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Ionicons name="people" size={20} color={COLORS.text.secondary} />
              <Text style={styles.detailText}>{travelers} traveler{travelers > 1 ? 's' : ''}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="calendar" size={20} color={COLORS.text.secondary} />
              <Text style={styles.detailText}>{selectedDuration} days</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="star" size={20} color={COLORS.text.secondary} />
              <Text style={styles.detailText}>Rating: {destination.rating}/5</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Book Trip Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookTrip}>
          <Text style={styles.bookButtonText}>Plan This Trip</Text>
          <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  backButton: {
    padding: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text.primary,
  },
  placeholder: {
    width: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.text.secondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  destinationCard: {
    height: 200,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    borderRadius: 16,
    overflow: 'hidden',
    ...SHADOWS.md,
  },
  destinationImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  destinationOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: SPACING.md,
  },
  destinationName: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
  },
  destinationCountry: {
    fontSize: FONT_SIZES.md,
    color: COLORS.white,
    opacity: 0.9,
  },
  section: {
    marginTop: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  durationContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  durationButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray[300],
  },
  durationButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  durationText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.primary,
    fontWeight: FONT_WEIGHTS.medium,
  },
  durationTextActive: {
    color: COLORS.white,
  },
  costCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.md,
    ...SHADOWS.md,
  },
  costItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  costItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  costIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  costTitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.primary,
  },
  costAmount: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text.primary,
  },
  totalDivider: {
    height: 1,
    backgroundColor: COLORS.gray[200],
    marginVertical: SPACING.sm,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  totalLabel: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text.primary,
  },
  totalAmount: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
  },
  budgetCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.md,
    ...SHADOWS.md,
  },
  budgetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  budgetLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
  },
  budgetAmount: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text.primary,
  },
  budgetDivider: {
    height: 1,
    backgroundColor: COLORS.gray[200],
    marginVertical: SPACING.sm,
  },
  budgetResultLabel: {
    fontWeight: FONT_WEIGHTS.semibold,
  },
  budgetResultAmount: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
  },
  budgetWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.warning + '15',
    padding: SPACING.sm,
    borderRadius: 8,
    marginTop: SPACING.sm,
  },
  budgetWarningText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.warning,
    marginLeft: SPACING.sm,
    flex: 1,
  },
  detailsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.md,
    ...SHADOWS.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  detailText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.primary,
    marginLeft: SPACING.md,
  },
  footer: {
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.md,
  },
  bookButtonText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.white,
    marginRight: SPACING.sm,
  },
});