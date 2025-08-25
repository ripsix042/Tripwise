import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, SHADOWS } from '../constants';
import { NavigationProps, TripMember, Expense } from '../types';

export default function GroupTripPlannerScreen({ navigation, route }: NavigationProps) {
  const { destination, tripCost, duration = 7, travelers = 1 } = route?.params || {};
  const [tripName, setTripName] = React.useState('');
  const [members, setMembers] = React.useState<TripMember[]>([]);
  const [expenses, setExpenses] = React.useState<Expense[]>([]);
  const [newMemberEmail, setNewMemberEmail] = React.useState('');
  const [newExpenseTitle, setNewExpenseTitle] = React.useState('');
  const [newExpenseAmount, setNewExpenseAmount] = React.useState('');
  const [showAddMember, setShowAddMember] = React.useState(false);
  const [showAddExpense, setShowAddExpense] = React.useState(false);

  React.useEffect(() => {
    if (destination) {
      setTripName(`${destination.name} Trip`);
      // Initialize with basic trip costs if available
      if (tripCost) {
        const initialExpenses: Expense[] = [
          {
            id: '1',
            title: 'Flights',
            description: 'Flight tickets for the trip',
            amount: tripCost.flights,
            paidBy: 'current-user',
            splitBetween: ['current-user'],
            category: 'flight' as const,
            date: new Date().toISOString(),
          },
          {
            id: '2',
            title: 'Accommodation',
            description: 'Hotel and lodging expenses',
            amount: tripCost.accommodation,
            paidBy: 'current-user',
            splitBetween: ['current-user'],
            category: 'hotel' as const,
            date: new Date().toISOString(),
          },
        ];
        setExpenses(initialExpenses);
      }
    }
  }, [destination, tripCost]);

  const addMember = () => {
    if (newMemberEmail.trim()) {
      const newMember: TripMember = {
        id: Date.now().toString(),
        name: newMemberEmail.split('@')[0],
        email: newMemberEmail.trim(),
        avatar: '',
        status: 'pending' as const,
        amountPaid: 0,
        amountOwed: 0,
      };
      setMembers([...members, newMember]);
      setNewMemberEmail('');
      setShowAddMember(false);
    }
  };

  const addExpense = () => {
    if (newExpenseTitle.trim() && newExpenseAmount.trim()) {
      const amount = parseFloat(newExpenseAmount);
      if (isNaN(amount) || amount <= 0) {
        Alert.alert('Invalid Amount', 'Please enter a valid amount');
        return;
      }

      const newExpense: Expense = {
        id: Date.now().toString(),
        title: newExpenseTitle.trim(),
        description: newExpenseTitle.trim(),
        amount,
        paidBy: 'current-user',
        splitBetween: ['current-user', ...members.map(m => m.id)],
        category: 'other' as const,
        date: new Date().toISOString(),
      };
      setExpenses([...expenses, newExpense]);
      setNewExpenseTitle('');
      setNewExpenseAmount('');
      setShowAddExpense(false);
    }
  };

  const removeMember = (memberId: string) => {
    setMembers(members.filter(m => m.id !== memberId));
  };

  const removeExpense = (expenseId: string) => {
    setExpenses(expenses.filter(e => e.id !== expenseId));
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const perPersonCost = members.length > 0 ? totalExpenses / (members.length + 1) : totalExpenses;

  const handleCreateTrip = () => {
    if (!tripName.trim()) {
      Alert.alert('Trip Name Required', 'Please enter a name for your trip');
      return;
    }

    Alert.alert(
      'Trip Created!',
      `Your group trip "${tripName}" has been created. Invitations will be sent to all members.`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('History'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Group Trip</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleCreateTrip}>
          <Text style={styles.saveButtonText}>Create</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Trip Name */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trip Name</Text>
          <TextInput
            style={styles.tripNameInput}
            value={tripName}
            onChangeText={setTripName}
            placeholder="Enter trip name"
            placeholderTextColor={COLORS.text.secondary}
          />
        </View>

        {/* Trip Summary */}
        {destination && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trip Summary</Text>
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Ionicons name="location" size={20} color={COLORS.primary} />
                <Text style={styles.summaryText}>{destination.name}, {destination.country}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Ionicons name="calendar" size={20} color={COLORS.primary} />
                <Text style={styles.summaryText}>{duration} days</Text>
              </View>
              <View style={styles.summaryRow}>
                <Ionicons name="people" size={20} color={COLORS.primary} />
                <Text style={styles.summaryText}>{members.length + 1} travelers</Text>
              </View>
            </View>
          </View>
        )}

        {/* Group Members */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Group Members ({members.length + 1})</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddMember(true)}
            >
              <Ionicons name="add" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.membersCard}>
            {/* Current User */}
            <View style={styles.memberItem}>
              <View style={styles.memberAvatar}>
                <Text style={styles.memberAvatarText}>You</Text>
              </View>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>You (Trip Organizer)</Text>
                <Text style={styles.memberStatus}>Confirmed</Text>
              </View>
              <View style={styles.memberBadge}>
                <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
              </View>
            </View>

            {/* Added Members */}
            {members.map((member) => (
              <View key={member.id} style={styles.memberItem}>
                <View style={styles.memberAvatar}>
                  <Text style={styles.memberAvatarText}>{member.name.charAt(0).toUpperCase()}</Text>
                </View>
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberEmail}>{member.email}</Text>
                  <Text style={[
                    styles.memberStatus,
                    { color: member.status === 'confirmed' ? COLORS.success : COLORS.warning }
                  ]}>
                    {member.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeMember(member.id)}
                >
                  <Ionicons name="close" size={16} color={COLORS.error} />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Add Member Form */}
          {showAddMember && (
            <View style={styles.addForm}>
              <TextInput
                style={styles.addInput}
                value={newMemberEmail}
                onChangeText={setNewMemberEmail}
                placeholder="Enter email address"
                placeholderTextColor={COLORS.text.secondary}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <View style={styles.addFormButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setShowAddMember(false);
                    setNewMemberEmail('');
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmButton} onPress={addMember}>
                  <Text style={styles.confirmButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Expenses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Expenses</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddExpense(true)}
            >
              <Ionicons name="add" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.expensesCard}>
            {expenses.map((expense) => (
              <View key={expense.id} style={styles.expenseItem}>
                <View style={styles.expenseInfo}>
                  <Text style={styles.expenseTitle}>{expense.title}</Text>
                  <Text style={styles.expenseAmount}>${expense.amount}</Text>
                  <Text style={styles.expenseDetails}>
                    Split between {expense.splitBetween.length} people
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeExpense(expense.id)}
                >
                  <Ionicons name="close" size={16} color={COLORS.error} />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Add Expense Form */}
          {showAddExpense && (
            <View style={styles.addForm}>
              <TextInput
                style={styles.addInput}
                value={newExpenseTitle}
                onChangeText={setNewExpenseTitle}
                placeholder="Expense title"
                placeholderTextColor={COLORS.text.secondary}
              />
              <TextInput
                style={styles.addInput}
                value={newExpenseAmount}
                onChangeText={setNewExpenseAmount}
                placeholder="Amount"
                placeholderTextColor={COLORS.text.secondary}
                keyboardType="numeric"
              />
              <View style={styles.addFormButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setShowAddExpense(false);
                    setNewExpenseTitle('');
                    setNewExpenseAmount('');
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmButton} onPress={addExpense}>
                  <Text style={styles.confirmButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Cost Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cost Summary</Text>
          <View style={styles.costSummaryCard}>
            <View style={styles.costRow}>
              <Text style={styles.costLabel}>Total Expenses</Text>
              <Text style={styles.costValue}>${totalExpenses}</Text>
            </View>
            <View style={styles.costRow}>
              <Text style={styles.costLabel}>Per Person</Text>
              <Text style={styles.costValue}>${perPersonCost.toFixed(2)}</Text>
            </View>
            <View style={styles.costDivider} />
            <View style={styles.costRow}>
              <Text style={styles.totalLabel}>Your Share</Text>
              <Text style={styles.totalValue}>${perPersonCost.toFixed(2)}</Text>
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
  saveButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  saveButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  section: {
    marginTop: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text.primary,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tripNameInput: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.text.primary,
    ...SHADOWS.sm,
  },
  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    ...SHADOWS.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  summaryText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.primary,
    marginLeft: SPACING.sm,
  },
  membersCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    ...SHADOWS.sm,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[100],
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  memberAvatarText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.text.primary,
  },
  memberEmail: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
  },
  memberStatus: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.medium,
    marginTop: SPACING.xs,
  },
  memberBadge: {
    marginLeft: SPACING.sm,
  },
  removeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.error + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expensesCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    ...SHADOWS.sm,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[100],
  },
  expenseInfo: {
    flex: 1,
  },
  expenseTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.text.primary,
  },
  expenseAmount: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
  },
  expenseDetails: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
  },
  addForm: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginTop: SPACING.md,
    ...SHADOWS.sm,
  },
  addInput: {
    borderWidth: 1,
    borderColor: COLORS.gray[300],
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: FONT_SIZES.md,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  addFormButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: SPACING.sm,
  },
  cancelButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  cancelButtonText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  confirmButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.white,
  },
  costSummaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    ...SHADOWS.sm,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  costLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
  },
  costValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text.primary,
  },
  costDivider: {
    height: 1,
    backgroundColor: COLORS.gray[200],
    marginVertical: SPACING.sm,
  },
  totalLabel: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text.primary,
  },
  totalValue: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
  },
});