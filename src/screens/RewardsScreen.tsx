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
import { mockRewards, mockUser } from '../services/mockData';

export default function RewardsScreen({ navigation }: NavigationProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hotel': return 'bed-outline';
      case 'flight': return 'airplane-outline';
      case 'activity': return 'ticket-outline';
      default: return 'gift-outline';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'hotel': return COLORS.secondary;
      case 'flight': return COLORS.primary;
      case 'activity': return COLORS.success;
      default: return COLORS.warning;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Rewards</Text>
          <Text style={styles.subtitle}>Earn points and save on your travels</Text>
        </View>

        {/* Points Balance */}
        <View style={styles.pointsCard}>
          <View style={styles.pointsHeader}>
            <Ionicons name="diamond" size={32} color={COLORS.warning} />
            <View style={styles.pointsInfo}>
              <Text style={styles.pointsLabel}>Your Points</Text>
              <Text style={styles.pointsValue}>{mockUser.loyaltyPoints.toLocaleString()}</Text>
            </View>
          </View>
          <Text style={styles.pointsSubtext}>Keep traveling to earn more points!</Text>
        </View>

        {/* Available Rewards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Rewards</Text>
          {mockRewards.map((reward) => (
            <TouchableOpacity key={reward.id} style={styles.rewardCard}>
              <View style={styles.rewardHeader}>
                <View style={[
                  styles.rewardIcon, 
                  { backgroundColor: getCategoryColor(reward.category) + '20' }
                ]}>
                  <Ionicons 
                    name={getCategoryIcon(reward.category)} 
                    size={24} 
                    color={getCategoryColor(reward.category)} 
                  />
                </View>
                <View style={styles.rewardInfo}>
                  <Text style={styles.rewardTitle}>{reward.title}</Text>
                  <Text style={styles.rewardDescription} numberOfLines={2}>
                    {reward.description}
                  </Text>
                </View>
              </View>
              
              <View style={styles.rewardFooter}>
                <View style={styles.rewardMeta}>
                  <View style={styles.pointsRequired}>
                    <Ionicons name="diamond-outline" size={16} color={COLORS.warning} />
                    <Text style={styles.pointsRequiredText}>
                      {reward.pointsRequired} points
                    </Text>
                  </View>
                  <Text style={styles.expiryDate}>
                    Expires: {new Date(reward.expiryDate).toLocaleDateString()}
                  </Text>
                </View>
                
                <TouchableOpacity 
                  style={[
                    styles.redeemButton,
                    mockUser.loyaltyPoints < reward.pointsRequired && styles.redeemButtonDisabled
                  ]}
                  disabled={mockUser.loyaltyPoints < reward.pointsRequired}
                >
                  <Text style={[
                    styles.redeemButtonText,
                    mockUser.loyaltyPoints < reward.pointsRequired && styles.redeemButtonTextDisabled
                  ]}>
                    {mockUser.loyaltyPoints >= reward.pointsRequired ? 'Redeem' : 'Not enough points'}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* How to Earn Points */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Earn Points</Text>
          <View style={styles.earnPointsCard}>
            <View style={styles.earnPointItem}>
              <Ionicons name="airplane" size={20} color={COLORS.primary} />
              <Text style={styles.earnPointText}>Book flights: 10 points per $1</Text>
            </View>
            <View style={styles.earnPointItem}>
              <Ionicons name="bed" size={20} color={COLORS.secondary} />
              <Text style={styles.earnPointText}>Book hotels: 5 points per $1</Text>
            </View>
            <View style={styles.earnPointItem}>
              <Ionicons name="star" size={20} color={COLORS.warning} />
              <Text style={styles.earnPointText}>Leave reviews: 50 points each</Text>
            </View>
            <View style={styles.earnPointItem}>
              <Ionicons name="people" size={20} color={COLORS.success} />
              <Text style={styles.earnPointText}>Refer friends: 500 points each</Text>
            </View>
          </View>
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
  pointsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    ...SHADOWS.md,
  },
  pointsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  pointsInfo: {
    marginLeft: SPACING.md,
  },
  pointsLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
  },
  pointsValue: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text.primary,
  },
  pointsSubtext: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
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
  rewardCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  rewardHeader: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  rewardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text.primary,
  },
  rewardDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
    lineHeight: 18,
  },
  rewardFooter: {
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
    paddingTop: SPACING.sm,
  },
  rewardMeta: {
    marginBottom: SPACING.sm,
  },
  pointsRequired: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  pointsRequiredText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.primary,
    marginLeft: SPACING.xs,
    fontWeight: FONT_WEIGHTS.medium,
  },
  expiryDate: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.text.secondary,
  },
  redeemButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  redeemButtonDisabled: {
    backgroundColor: COLORS.gray[300],
  },
  redeemButtonText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.white,
  },
  redeemButtonTextDisabled: {
    color: COLORS.gray[500],
  },
  earnPointsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    ...SHADOWS.sm,
  },
  earnPointItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  earnPointText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.primary,
    marginLeft: SPACING.md,
  },
});