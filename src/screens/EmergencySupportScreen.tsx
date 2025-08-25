import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, SHADOWS } from '../constants';
import { NavigationProps, EmergencyContact } from '../types';
import { mockEmergencyContacts } from '../services/mockData';

export default function EmergencySupportScreen({ navigation }: NavigationProps) {
  const [emergencyContacts, setEmergencyContacts] = React.useState<EmergencyContact[]>([]);
  const [userLocation, setUserLocation] = React.useState('Current Location');

  React.useEffect(() => {
    setEmergencyContacts(mockEmergencyContacts);
  }, []);

  const handleCall = (phoneNumber: string, contactName: string) => {
    Alert.alert(
      'Call Emergency Contact',
      `Do you want to call ${contactName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call',
          onPress: () => {
            Linking.openURL(`tel:${phoneNumber}`);
          },
        },
      ]
    );
  };

  const handleGetDirections = (address: string, contactName: string) => {
    const encodedAddress = encodeURIComponent(address);
    const mapsUrl = `https://maps.apple.com/?q=${encodedAddress}`;
    
    Alert.alert(
      'Get Directions',
      `Open directions to ${contactName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Open Maps',
          onPress: () => {
            Linking.openURL(mapsUrl);
          },
        },
      ]
    );
  };

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'hospital':
        return 'medical';
      case 'police':
        return 'shield';
      case 'fire':
        return 'flame';
      case 'embassy':
        return 'business';
      default:
        return 'call';
    }
  };

  const getContactColor = (type: string) => {
    switch (type) {
      case 'hospital':
        return COLORS.error;
      case 'police':
        return COLORS.primary;
      case 'fire':
        return COLORS.warning;
      case 'embassy':
        return COLORS.secondary;
      default:
        return COLORS.text.secondary;
    }
  };

  const groupedContacts = emergencyContacts.reduce((groups, contact) => {
    const type = contact.type;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(contact);
    return groups;
  }, {} as Record<string, EmergencyContact[]>);

  const contactTypeLabels = {
    hospital: 'Medical Emergency',
    police: 'Police',
    fire: 'Fire Department',
    embassy: 'Embassy & Consulates',
  };

  const emergencyTips = [
    {
      icon: 'warning',
      title: 'Stay Calm',
      description: 'Keep calm and assess the situation before taking action.',
    },
    {
      icon: 'location',
      title: 'Know Your Location',
      description: 'Always be aware of your current location and address.',
    },
    {
      icon: 'call',
      title: 'Emergency Numbers',
      description: 'Save local emergency numbers in your phone contacts.',
    },
    {
      icon: 'document-text',
      title: 'Important Documents',
      description: 'Keep copies of passport, ID, and insurance documents.',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Emergency Support</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Emergency Alert */}
        <View style={styles.emergencyAlert}>
          <View style={styles.alertIcon}>
            <Ionicons name="warning" size={24} color={COLORS.white} />
          </View>
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>Emergency Assistance</Text>
            <Text style={styles.alertSubtitle}>
              In case of emergency, contact local authorities immediately
            </Text>
          </View>
        </View>

        {/* Current Location */}
        <View style={styles.locationCard}>
          <View style={styles.locationHeader}>
            <Ionicons name="location" size={20} color={COLORS.primary} />
            <Text style={styles.locationTitle}>Current Location</Text>
          </View>
          <Text style={styles.locationText}>{userLocation}</Text>
          <TouchableOpacity style={styles.updateLocationButton}>
            <Text style={styles.updateLocationText}>Update Location</Text>
          </TouchableOpacity>
        </View>

        {/* Emergency Contacts */}
        {Object.entries(groupedContacts).map(([type, contacts]) => (
          <View key={type} style={styles.contactSection}>
            <Text style={styles.sectionTitle}>
              {contactTypeLabels[type as keyof typeof contactTypeLabels] || type}
            </Text>
            <View style={styles.contactsCard}>
              {contacts.map((contact) => (
                <View key={contact.id} style={styles.contactItem}>
                  <View style={styles.contactLeft}>
                    <View
                      style={[
                        styles.contactIcon,
                        { backgroundColor: getContactColor(contact.type) + '20' },
                      ]}
                    >
                      <Ionicons
                        name={getContactIcon(contact.type) as any}
                        size={20}
                        color={getContactColor(contact.type)}
                      />
                    </View>
                    <View style={styles.contactInfo}>
                      <Text style={styles.contactName}>{contact.name}</Text>
                      <Text style={styles.contactAddress}>{contact.address}</Text>
                      <Text style={styles.contactDistance}>
                        {contact.distance.toFixed(1)} km away
                      </Text>
                    </View>
                  </View>
                  <View style={styles.contactActions}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleCall(contact.phone, contact.name)}
                    >
                      <Ionicons name="call" size={18} color={COLORS.success} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleGetDirections(contact.address, contact.name)}
                    >
                      <Ionicons name="navigate" size={18} color={COLORS.primary} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Emergency Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Emergency Tips</Text>
          <View style={styles.tipsCard}>
            {emergencyTips.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <View style={styles.tipIcon}>
                  <Ionicons name={tip.icon as any} size={20} color={COLORS.primary} />
                </View>
                <View style={styles.tipContent}>
                  <Text style={styles.tipTitle}>{tip.title}</Text>
                  <Text style={styles.tipDescription}>{tip.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity
              style={[styles.quickActionButton, { backgroundColor: COLORS.error + '15' }]}
              onPress={() => handleCall('911', 'Emergency Services')}
            >
              <Ionicons name="call" size={24} color={COLORS.error} />
              <Text style={[styles.quickActionText, { color: COLORS.error }]}>Call 911</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.quickActionButton, { backgroundColor: COLORS.primary + '15' }]}
              onPress={() => {
                Linking.openURL('sms:911?body=Emergency! I need help. My location is: ' + userLocation);
              }}
            >
              <Ionicons name="chatbubble" size={24} color={COLORS.primary} />
              <Text style={[styles.quickActionText, { color: COLORS.primary }]}>Text 911</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.quickActionButton, { backgroundColor: COLORS.warning + '15' }]}
              onPress={() => {
                Alert.alert(
                  'Share Location',
                  'This feature would share your current location with emergency contacts.',
                  [{ text: 'OK' }]
                );
              }}
            >
              <Ionicons name="share" size={24} color={COLORS.warning} />
              <Text style={[styles.quickActionText, { color: COLORS.warning }]}>Share Location</Text>
            </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  emergencyAlert: {
    backgroundColor: COLORS.error,
    borderRadius: 12,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.md,
    ...SHADOWS.md,
  },
  alertIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
  },
  alertSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.white,
    opacity: 0.9,
    marginTop: SPACING.xs,
  },
  locationCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginTop: SPACING.lg,
    ...SHADOWS.sm,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  locationTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text.primary,
    marginLeft: SPACING.sm,
  },
  locationText: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  updateLocationButton: {
    alignSelf: 'flex-start',
  },
  updateLocationText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.medium,
  },
  contactSection: {
    marginTop: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  contactsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[100],
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text.primary,
  },
  contactAddress: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
  },
  contactDistance: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.primary,
    marginTop: SPACING.xs,
    fontWeight: FONT_WEIGHTS.medium,
  },
  contactActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipsSection: {
    marginTop: SPACING.xl,
  },
  tipsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    ...SHADOWS.sm,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[100],
  },
  tipIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text.primary,
  },
  tipDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
    lineHeight: 18,
  },
  quickActionsSection: {
    marginTop: SPACING.xl,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
  quickActionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    borderRadius: 12,
    ...SHADOWS.sm,
  },
  quickActionText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    marginTop: SPACING.sm,
  },
});