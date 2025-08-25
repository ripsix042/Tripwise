import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, SHADOWS } from '../constants';
import { NavigationProps, Destination } from '../types';
import { getDestinationsByBudget } from '../services/mockData';

export default function DestinationResultsScreen({ navigation, route }: NavigationProps) {
  const { budget = 1000, travelers = 1 } = route?.params || {};
  const [searchQuery, setSearchQuery] = React.useState('');
  const [destinations, setDestinations] = React.useState<Destination[]>([]);
  const [filteredDestinations, setFilteredDestinations] = React.useState<Destination[]>([]);

  React.useEffect(() => {
    const fetchDestinations = async () => {
      const results = await getDestinationsByBudget(budget);
      setDestinations(results);
      setFilteredDestinations(results);
    };
    fetchDestinations();
  }, [budget]);

  React.useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredDestinations(destinations);
    } else {
      const filtered = destinations.filter(
        (dest) =>
          dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dest.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDestinations(filtered);
    }
  }, [searchQuery, destinations]);

  const handleDestinationPress = (destination: Destination) => {
    navigation.navigate('TripCostBreakdown', {
      destination,
      budget,
      travelers,
    });
  };

  const renderDestinationCard = (destination: Destination) => (
    <TouchableOpacity
      key={destination.id}
      style={styles.destinationCard}
      onPress={() => handleDestinationPress(destination)}
    >
      <Image source={{ uri: destination.imageUrl }} style={styles.destinationImage} />
      <View style={styles.destinationInfo}>
        <View style={styles.destinationHeader}>
          <Text style={styles.destinationName}>{destination.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color={COLORS.warning} />
            <Text style={styles.rating}>{destination.rating}</Text>
          </View>
        </View>
        <Text style={styles.destinationCountry}>{destination.country}</Text>
        <Text style={styles.destinationDescription} numberOfLines={2}>
          {destination.description}
        </Text>
        <View style={styles.destinationFooter}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>From</Text>
            <Text style={styles.price}>${destination.averageCost}</Text>
            <Text style={styles.priceUnit}>per person</Text>
          </View>
          <View style={styles.budgetFit}>
            <Ionicons
              name={destination.averageCost <= budget ? 'checkmark-circle' : 'alert-circle'}
              size={16}
              color={destination.averageCost <= budget ? COLORS.success : COLORS.warning}
            />
            <Text
              style={[
                styles.budgetText,
                {
                  color: destination.averageCost <= budget ? COLORS.success : COLORS.warning,
                },
              ]}
            >
              {destination.averageCost <= budget ? 'Within Budget' : 'Over Budget'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Destinations</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color={COLORS.text.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search destinations..."
            placeholderTextColor={COLORS.text.secondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.filterInfo}>
        <Text style={styles.filterText}>
          {filteredDestinations.length} destinations for ${budget} budget • {travelers} traveler{travelers > 1 ? 's' : ''}
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map(renderDestinationCard)
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="location-outline" size={64} color={COLORS.text.secondary} />
            <Text style={styles.emptyTitle}>No destinations found</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your search or budget to see more options
            </Text>
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
  searchContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    ...SHADOWS.sm,
  },
  searchInput: {
    flex: 1,
    marginLeft: SPACING.sm,
    fontSize: FONT_SIZES.md,
    color: COLORS.text.primary,
  },
  filterInfo: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  filterText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  destinationCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: SPACING.lg,
    overflow: 'hidden',
    ...SHADOWS.md,
  },
  destinationImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  destinationInfo: {
    padding: SPACING.md,
  },
  destinationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  destinationName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text.primary,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    marginLeft: SPACING.xs,
  },
  destinationCountry: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    marginBottom: SPACING.sm,
  },
  destinationDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  destinationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.text.secondary,
    marginRight: SPACING.xs,
  },
  price: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
    marginRight: SPACING.xs,
  },
  priceUnit: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.text.secondary,
  },
  budgetFit: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  budgetText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.medium,
    marginLeft: SPACING.xs,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxl,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text.primary,
    marginTop: SPACING.md,
  },
  emptySubtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginTop: SPACING.sm,
    paddingHorizontal: SPACING.xl,
  },
});