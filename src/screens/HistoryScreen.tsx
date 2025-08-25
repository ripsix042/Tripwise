import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, SHADOWS } from '../constants';
import { NavigationProps } from '../types';
import { mockTrips } from '../services/mockData';

export default function HistoryScreen({ navigation }: NavigationProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return COLORS.success;
      case 'planning': return COLORS.warning;
      case 'booked': return COLORS.primary;
      default: return COLORS.gray[400];
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return 'checkmark-circle';
      case 'planning': return 'time';
      case 'booked': return 'calendar';
      default: return 'help-circle';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Trip History</Text>
          <Text style={styles.subtitle}>Your travel memories and plans</Text>
        </View>

        <View style={styles.section}>
          {mockTrips.map((trip) => (
            <TouchableOpacity key={trip.id} style={styles.tripCard}>
              <View style={styles.tripHeader}>
                <View style={styles.tripInfo}>
                  <Text style={styles.tripDestination}>{trip.destination.name}</Text>
                  <Text style={styles.tripCountry}>{trip.destination.country}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(trip.status) + '20' }]}>
                  <Ionicons 
                    name={getStatusIcon(trip.status)} 
                    size={16} 
                    color={getStatusColor(trip.status)} 
                  />
                  <Text style={[styles.statusText, { color: getStatusColor(trip.status) }]}>
                    {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                  </Text>
                </View>
              </View>
              
              <View style={styles.tripDetails}>
                <View style={styles.tripDetail}>
                  <Ionicons name="calendar-outline" size={16} color={COLORS.text.secondary} />
                  <Text style={styles.tripDetailText}>
                    {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                  </Text>
                </View>
                
                <View style={styles.tripDetail}>
                  <Ionicons name="people-outline" size={16} color={COLORS.text.secondary} />
                  <Text style={styles.tripDetailText}>
                    {trip.travelers} {trip.travelers === 1 ? 'traveler' : 'travelers'}
                  </Text>
                </View>
                
                <View style={styles.tripDetail}>
                  <Ionicons name="wallet-outline" size={16} color={COLORS.text.secondary} />
                  <Text style={styles.tripDetailText}>Budget: ${trip.budget}</Text>
                </View>
              </View>
              
              <View style={styles.tripFooter}>
                <Text style={styles.totalCost}>Total: ${trip.costs.total}</Text>
                <Ionicons name="chevron-forward" size={20} color={COLORS.text.secondary} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {mockTrips.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="airplane-outline" size={64} color={COLORS.gray[300]} />
            <Text style={styles.emptyTitle}>No trips yet</Text>
            <Text style={styles.emptySubtitle}>Start planning your first adventure!</Text>
          </View>
        )}
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
  tripCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.md,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  tripInfo: {
    flex: 1,
  },
  tripDestination: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text.primary,
  },
  tripCountry: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 16,
  },
  statusText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.medium,
    marginLeft: SPACING.xs,
  },
  tripDetails: {
    marginBottom: SPACING.md,
  },
  tripDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  tripDetailText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    marginLeft: SPACING.sm,
  },
  tripFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
  },
  totalCost: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.primary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text.primary,
    marginTop: SPACING.md,
  },
  emptySubtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
  },
});