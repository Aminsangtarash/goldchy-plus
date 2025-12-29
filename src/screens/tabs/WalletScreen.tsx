/**
 * WalletScreen
 * User's wallet with balance, deposit, withdraw, and transaction history
 */

import React, {useState, useEffect} from 'react';
import {View, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Text,
  AppHeader,
  PageTitle,
  TransactionItem,
  DepositModal,
  WithdrawModal,
  BottomTabBar,
} from '../../components';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {borderRadius} from '../../theme/borderRadius';
import {toPersianNumber} from '../../utils';
import {WalletService} from '../../services/api';

interface Transaction {
  id: string;
  amount: number;
  date: string;
  time: string;
  type: 'deposit' | 'withdraw';
}

// Mock transaction data
const MOCK_TRANSACTIONS: Transaction[] = [
  {id: '1', amount: 3256000, date: '۱۴۰۴/۰۷/۲۴', time: '۱۴:۲۳', type: 'deposit'},
  {id: '2', amount: 300000, date: '۱۴۰۴/۰۷/۲۴', time: '۱۴:۲۳', type: 'withdraw'},
  {id: '3', amount: 500000, date: '۱۴۰۴/۰۷/۲۴', time: '۱۴:۲۳', type: 'deposit'},
  {id: '4', amount: 300000, date: '۱۴۰۴/۰۷/۲۴', time: '۱۴:۲۳', type: 'withdraw'},
  {id: '5', amount: 3256000, date: '۱۴۰۴/۰۷/۲۴', time: '۱۴:۲۳', type: 'deposit'},
  {id: '6', amount: 3256000, date: '۱۴۰۴/۰۷/۲۴', time: '۱۴:۲۳', type: 'deposit'},
];

export function WalletScreen() {
  const [balance, setBalance] = useState(3256000);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const data = await WalletService.getBalance();
      setBalance(data.balance);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  };

  const handleDeposit = async (amount: number) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update balance
      setBalance(prev => prev + amount);
      
      // Add transaction
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        amount,
        date: '۱۴۰۴/۰۷/۲۴',
        time: '۱۴:۲۳',
        type: 'deposit',
      };
      setTransactions(prev => [newTransaction, ...prev]);
      
      setShowDepositModal(false);
    } catch (error) {
      console.error('Deposit failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (amount: number, cardNumber: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update balance
      setBalance(prev => prev - amount);
      
      // Add transaction
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        amount,
        date: '۱۴۰۴/۰۷/۲۴',
        time: '۱۴:۲۳',
        type: 'withdraw',
      };
      setTransactions(prev => [newTransaction, ...prev]);
      
      setShowWithdrawModal(false);
    } catch (error) {
      console.error('Withdraw failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        <PageTitle title="کیف پول" />

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text variant="body" color="secondary">موجودی</Text>
          <Text variant="h3" color="white" style={styles.balanceAmount}>
            {toPersianNumber(balance.toLocaleString())} تومان
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setShowWithdrawModal(true)}
            activeOpacity={0.8}>
            <Icon name="remove" size={20} color={colors.primary[400]} />
            <Text variant="body" style={styles.actionButtonText}>
              برداشت موجودی
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setShowDepositModal(true)}
            activeOpacity={0.8}>
            <Icon name="add" size={20} color={colors.primary[400]} />
            <Text variant="body" style={styles.actionButtonText}>
              افزایش موجودی
            </Text>
          </TouchableOpacity>
        </View>

        {/* Transaction History */}
        <View style={styles.historySection}>
          <Text variant="body" color="secondary" align="center" style={styles.historyTitle}>
            تاریخچه انتقالات
          </Text>

          <View style={styles.transactionsList}>
            {transactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                amount={transaction.amount}
                date={transaction.date}
                time={transaction.time}
                type={transaction.type}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <BottomTabBar />

      {/* Deposit Modal */}
      <DepositModal
        visible={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        onSubmit={handleDeposit}
        loading={loading}
      />

      {/* Withdraw Modal */}
      <WithdrawModal
        visible={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        onSubmit={handleWithdraw}
        loading={loading}
        maxAmount={balance}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: spacing['2xl'],
  },

  balanceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius['2xl'],
    marginHorizontal: spacing.screenPadding,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.cardPadding,
    marginBottom: spacing.md,
  },

  balanceAmount: {
    fontWeight: '700',
  },

  actionsRow: {
    flexDirection: 'row',
    marginHorizontal: spacing.screenPadding,
    marginBottom: spacing['3xl'],
  },

  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border.primary,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.md,
    marginHorizontal: spacing.xs,
  },

  actionButtonText: {
    color: colors.primary[400],
    marginLeft: spacing.sm,
  },

  historySection: {
    marginHorizontal: spacing.screenPadding,
  },

  historyTitle: {
    marginBottom: spacing.lg,
  },

  transactionsList: {
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius['2xl'],
    paddingHorizontal: spacing.lg,
  },
});
