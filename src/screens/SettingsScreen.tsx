import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, SHADOWS } from '../constants';
import { NavigationProps } from '../types';
import { mockUser } from '../services/mockData';

export default function SettingsScreen({ navigation }: NavigationProps) {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  const settingsGroups = [
    {
      title: 'Account',
      items: [
        {
          icon: 'person-outline',
          title: 'Profile',
          subtitle: 'Edit your personal information',
          onPress: () => {},
        },
        {
          icon: 'card-outline',
          title: 'Payment Methods',
          subtitle: 'Manage your payment options',
          onPress: () => {},
        },
        {
          icon: 'shield-outline',
          title: 'Privacy & Security',
          subtitle: 'Control your privacy settings',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: 'notifications-outline',
          title: 'Notifications',
          subtitle: 'Push notifications for deals and updates',
          rightComponent: (
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: COLORS.gray[300], true: COLORS.primary + '40' }}
              thumbColor={notificationsEnabled ? COLORS.primary : COLORS.gray[400]}
            />
          ),
        },
        {
          icon: 'moon-outline',
          title: 'Dark Mode',
          subtitle: 'Switch to dark theme',
          rightComponent: (
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: COLORS.gray[300], true: COLORS.primary + '40' }}
              thumbColor={darkModeEnabled ? COLORS.primary : COLORS.gray[400]}
            />
          ),
        },
        {
          icon: 'language-outline',
          title: 'Language',
          subtitle: 'English',
          onPress: () => {},
        },
        {
          icon: 'location-outline',
          title: 'Currency',
          subtitle: 'USD ($)',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: 'help-circle-outline',
          title: 'Help Center',
          subtitle: 'Get help and support',
          onPress: () => {},
        },
        {
          icon: 'chatbubble-outline',
          title: 'Contact Us',
          subtitle: 'Send us a message',
          onPress: () => {},
        },
        {
          icon: 'star-outline',
          title: 'Rate App',
          subtitle: 'Rate us on the App Store',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Legal',
      items: [
        {
          icon: 'document-text-outline',
          title: 'Terms of Service',
          subtitle: 'Read our terms and conditions',
          onPress: () => {},
        },
        {
          icon: 'lock-closed-outline',
          title: 'Privacy Policy',
          subtitle: 'How we handle your data',
          onPress: () => {},
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        {/* User Profile Card */}
        <TouchableOpacity style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{mockUser.name.charAt(0)}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{mockUser.name}</Text>
            <Text style={styles.profileEmail}>{mockUser.email}</Text>
            <View style={styles.loyaltyBadge}>
              <Ionicons name="diamond" size={16} color={COLORS.warning} />
              <Text style={styles.loyaltyText}>
                {mockUser.loyaltyPoints} points
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.text.secondary} />
        </TouchableOpacity>

        {/* Settings Groups */}
        {settingsGroups.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.settingsGroup}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <View style={styles.groupCard}>
              {group.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.settingsItem,
                    itemIndex < group.items.length - 1 && styles.settingsItemBorder,
                  ]}
                  onPress={item.onPress}
                  disabled={!item.onPress}
                >
                  <View style={styles.settingsItemLeft}>
                    <View style={styles.settingsIcon}>
                      <Ionicons name={item.icon as any} size={20} color={COLORS.primary} />
                    </View>
                    <View style={styles.settingsText}>
                      <Text style={styles.settingsTitle}>{item.title}</Text>
                      <Text style={styles.settingsSubtitle}>{item.subtitle}</Text>
                    </View>
                  </View>
                  {item.rightComponent || (
                    <Ionicons name="chevron-forward" size={16} color={COLORS.text.secondary} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Sign Out Button */}
        <TouchableOpacity style={styles.signOutButton}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={styles.versionText}>Version 1.0.0</Text>
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
  profileCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    ...SHADOWS.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  avatarText: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text.primary,
  },
  profileEmail: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
  },
  loyaltyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  loyaltyText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.warning,
    marginLeft: SPACING.xs,
    fontWeight: FONT_WEIGHTS.medium,
  },
  settingsGroup: {
    marginBottom: SPACING.xl,
  },
  groupTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  groupCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
  },
  settingsItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  settingsText: {
    flex: 1,
  },
  settingsTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.text.primary,
  },
  settingsSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingVertical: SPACING.md,
    marginBottom: SPACING.lg,
    ...SHADOWS.sm,
  },
  signOutText: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.error,
    marginLeft: SPACING.sm,
  },
  versionText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
});