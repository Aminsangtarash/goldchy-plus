/**
 * GoldCalculatorScreen
 * Calculate gold price based on weight, labor cost, tax, etc.
 */

import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity, StyleSheet, Share} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Text,
  AppHeader,
  PageTitle,
  Input,
  Button,
  BottomTabBar,
} from '../../components';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {borderRadius} from '../../theme/borderRadius';
import {toPersianNumber} from '../../utils';

interface CalculationResult {
  rawGoldPrice: number;
  laborCost: number;
  retailProfit: number;
  tax: number;
  stone: number;
  finalPrice: number;
}

export function GoldCalculatorScreen() {
  // Current gold price (mock)
  const currentGoldPrice = 3256000;
  const goldPricePerGram = 10381800;

  // Form state
  const [laborCost, setLaborCost] = useState('');
  const [weight, setWeight] = useState('');
  const [stone, setStone] = useState('');
  const [taxPercent, setTaxPercent] = useState('');
  const [profitPercent, setProfitPercent] = useState('');

  // Result state
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleCalculate = () => {
    const weightNum = parseFloat(weight) || 0;
    const laborNum = parseFloat(laborCost) || 0;
    const stoneNum = parseFloat(stone) || 0;
    const taxNum = parseFloat(taxPercent) || 0;
    const profitNum = parseFloat(profitPercent) || 0;

    if (weightNum === 0) return;

    // Calculate raw gold price
    const rawGoldPrice = goldPricePerGram * weightNum;

    // Calculate labor cost (percentage of raw gold price)
    const laborCostValue = (rawGoldPrice * laborNum) / 100;

    // Calculate retail profit
    const retailProfit = (rawGoldPrice + laborCostValue + stoneNum) * (profitNum / 100);

    // Calculate tax
    const taxValue = (retailProfit + laborCostValue + stoneNum) * (taxNum / 100);

    // Final price
    const finalPrice = rawGoldPrice + laborCostValue + retailProfit + taxValue + stoneNum;

    setResult({
      rawGoldPrice,
      laborCost: laborCostValue,
      retailProfit,
      tax: taxValue,
      stone: stoneNum,
      finalPrice,
    });
    setShowResult(true);
  };

  const handleShare = async () => {
    if (!result) return;

    const message = `محاسبه قیمت طلا\n\nمبلغ طلای خام: ${toPersianNumber(result.rawGoldPrice.toLocaleString())} تومان\nاجرت طلایی: ${toPersianNumber(result.laborCost.toLocaleString())} تومان\nسود تکفروشی: ${toPersianNumber(result.retailProfit.toLocaleString())} تومان\nمالیات: ${toPersianNumber(result.tax.toLocaleString())} تومان\nسنگ: ${toPersianNumber(result.stone.toLocaleString())} تومان\n\nمبلغ نهایی: ${toPersianNumber(result.finalPrice.toLocaleString())} تومان`;

    try {
      await Share.share({message});
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  const handleBack = () => {
    setShowResult(false);
    setResult(null);
  };

  // Result View
  if (showResult && result) {
    return (
      <View style={styles.container}>
        <AppHeader />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          
          {/* Result Rows */}
          <View style={styles.resultContainer}>
            {/* Raw Gold Price */}
            <ResultRow
              label="مبلغ طلای خام"
              value={result.rawGoldPrice}
              formula={`وزن ${toPersianNumber(weight)} × قیمت طلا گرم ۷۵۰ ${toPersianNumber(goldPricePerGram.toLocaleString())}`}
            />

            {/* Labor Cost */}
            <ResultRow
              label="اجرت طلایی"
              value={result.laborCost}
              formula={`وزن ${toPersianNumber(weight)} × قیمت طلا گرم ۷۵۰ × %${toPersianNumber(laborCost || '0')}`}
              showPlus
            />

            {/* Retail Profit */}
            <ResultRow
              label="سود تکفروشی"
              value={result.retailProfit}
              formula={`سنگ ${toPersianNumber(stone || '0')} + اجرت طلایی ${toPersianNumber(result.laborCost.toLocaleString())} + مبلغ طلای خام`}
              showPlus
            />

            {/* Tax */}
            <ResultRow
              label="مالیات"
              value={result.tax}
              formula={`تکفروشی ${toPersianNumber(result.retailProfit.toLocaleString())} + سنگ + اجرت طلایی`}
              showPlus
            />

            {/* Stone */}
            <ResultRow
              label="سنگ"
              value={result.stone}
              showPlus
            />

            {/* Final Price */}
            <View style={styles.equalSign}>
              <Icon name="remove" size={24} color={colors.status.error} />
            </View>
            <View style={styles.finalPriceRow}>
              <Text variant="labelSmall" color="secondary">مبلغ نهایی</Text>
              <View style={styles.finalPriceValue}>
                <Text variant="h4" style={{color: colors.status.error}}>
                  بد  {toPersianNumber(result.finalPrice.toLocaleString())}
                </Text>
              </View>
            </View>
          </View>

          {/* Warning Banner */}
          <View style={styles.warningBanner}>
            <Text variant="body" style={{color: colors.status.error}}>
              قیمت طلا به روز نمی باشد!
            </Text>
            <Icon name="information-circle" size={20} color={colors.status.error} style={styles.warningIcon} />
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBack}
              activeOpacity={0.8}>
              <Text variant="button" style={{color: colors.primary[400]}}>بازگشت</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={handleShare}
              activeOpacity={0.8}>
              <Text variant="button" style={{color: colors.primary[400]}}>اشتراک</Text>
              <Icon name="share-social-outline" size={20} color={colors.primary[400]} style={styles.shareIcon} />
            </TouchableOpacity>
          </View>
        </ScrollView>

        <BottomTabBar activeTab="calculator" />
      </View>
    );
  }

  // Input Form View
  return (
    <View style={styles.container}>
      <AppHeader />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        
        <PageTitle title="محاسبه گر قیمت طلا" />

        {/* Current Gold Price Card */}
        <View style={styles.currentPriceCard}>
          <Text variant="body" style={{color: colors.primary[400]}}>قیمت این لحظه طلا</Text>
          <Text variant="h4" color="white">
            {toPersianNumber(currentGoldPrice.toLocaleString())} تومان
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Gold Price Per Gram (Read-only) */}
          <Text variant="bodySmall" color="secondary" style={styles.inputLabel}>
            قیمت ۱ گرم طلای ۷۵۰ عیار
          </Text>
          <View style={styles.readOnlyInput}>
            <Text variant="body" color="secondary">تومان</Text>
            <Text variant="body" color="white">
              {toPersianNumber(goldPricePerGram.toLocaleString())}
            </Text>
          </View>

          {/* Labor Cost */}
          <Input
            label="اجرت"
            value={laborCost}
            onChangeText={setLaborCost}
            placeholder="وارد کنید..."
            keyboardType="numeric"
            leftIcon="تومان"
          />

          {/* Weight */}
          <Input
            label="وزن"
            value={weight}
            onChangeText={setWeight}
            placeholder="وارد کنید..."
            keyboardType="numeric"
            leftIcon="گرم"
          />

          {/* Stone (Extras) */}
          <Input
            label="اضافات (سنگ)"
            value={stone}
            onChangeText={setStone}
            placeholder="وارد کنید..."
            keyboardType="numeric"
            leftIcon="گرم"
          />

          {/* Tax and Profit Row */}
          <View style={styles.twoColumnRow}>
            <View style={styles.halfInput}>
              <Input
                label="سود"
                value={profitPercent}
                onChangeText={setProfitPercent}
                placeholder="وارد کنید..."
                keyboardType="numeric"
                leftIcon="درصد"
              />
            </View>
            <View style={styles.halfInput}>
              <Input
                label="مالیات"
                value={taxPercent}
                onChangeText={setTaxPercent}
                placeholder="وارد کنید..."
                keyboardType="numeric"
                leftIcon="درصد"
              />
            </View>
          </View>
        </View>

        {/* Warning Banner */}
        <View style={styles.warningBanner}>
          <Text variant="body" style={{color: colors.status.error}}>
            قیمت طلا به روز نمی باشد!
          </Text>
          <Icon name="information-circle" size={20} color={colors.status.error} style={styles.warningIcon} />
        </View>

        {/* Calculate Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="محاسبه قیمت"
            onPress={handleCalculate}
            disabled={!weight}
          />
        </View>
      </ScrollView>

      <BottomTabBar activeTab="calculator" />
    </View>
  );
}

// Result Row Component
function ResultRow({
  label,
  value,
  formula,
  showPlus = false,
}: {
  label: string;
  value: number;
  formula?: string;
  showPlus?: boolean;
}) {
  return (
    <>
      {showPlus && (
        <View style={styles.plusSign}>
          <Icon name="add" size={20} color={colors.status.error} />
        </View>
      )}
      <View style={styles.resultRow}>
        {formula && (
          <View style={styles.formulaBox}>
            <Text variant="bodySmall" color="secondary" align="center">
              {formula}
            </Text>
          </View>
        )}
        <View style={styles.resultValueBox}>
          <Text variant="labelSmall" color="secondary">{label}</Text>
          <Text variant="body" style={{color: colors.status.error}}>
            بد  {toPersianNumber(value.toLocaleString())}
          </Text>
        </View>
      </View>
    </>
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

  currentPriceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius['2xl'],
    marginHorizontal: spacing.screenPadding,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.cardPadding,
    marginBottom: spacing.xl,
  },

  form: {
    marginHorizontal: spacing.screenPadding,
  },

  inputLabel: {
    textAlign: 'right',
    marginBottom: spacing.sm,
  },

  readOnlyInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },

  twoColumnRow: {
    flexDirection: 'row',
  },

  halfInput: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },

  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.transparent.error15,
    marginHorizontal: spacing.screenPadding,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    marginTop: spacing.xl,
  },

  warningIcon: {
    marginLeft: spacing.sm,
  },

  buttonContainer: {
    marginHorizontal: spacing.screenPadding,
    marginTop: spacing.lg,
  },

  // Result styles
  resultContainer: {
    marginHorizontal: spacing.screenPadding,
    marginTop: spacing.xl,
  },

  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  formulaBox: {
    flex: 1,
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    marginRight: spacing.md,
  },

  resultValueBox: {
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.status.error,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    minWidth: 140,
    alignItems: 'center',
  },

  plusSign: {
    alignItems: 'flex-end',
    marginRight: spacing['3xl'],
    marginBottom: spacing.xs,
  },

  equalSign: {
    alignItems: 'flex-end',
    marginRight: spacing['3xl'],
    marginVertical: spacing.sm,
  },

  finalPriceRow: {
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.status.error,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },

  finalPriceValue: {
    marginTop: spacing.sm,
  },

  actions: {
    flexDirection: 'row',
    marginHorizontal: spacing.screenPadding,
    marginTop: spacing.xl,
  },

  backButton: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border.primary,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.lg,
    marginRight: spacing.sm,
  },

  shareButton: {
    flex: 0.6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border.primary,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.lg,
  },

  shareIcon: {
    marginLeft: spacing.sm,
  },
});
