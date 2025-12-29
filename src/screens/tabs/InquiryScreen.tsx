/**
 * InquiryScreen
 */

import React, {useState, useCallback} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {
  Text,
  AppHeader,
  PageTitle,
  TabSelector,
  SubTabSelector,
  FeeNotice,
  Input,
  Button,
  PaymentDrawer,
  ResultModal,
  BottomTabBar,
} from '../../components';
import type {InquiryResultData} from '../../components';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {borderRadius} from '../../theme/borderRadius';
import {InquiryService, WalletService} from '../../services/api';

type InquiryTab = 'shahkar' | 'sabteahval' | 'bank';
type BankSubTab = 'convert' | 'inquiry' | 'match';

const INQUIRY_TABS = [
  {key: 'shahkar', label: 'سامانه شاهکار'},
  {key: 'sabteahval', label: 'ثبت احوال'},
  {key: 'bank', label: 'استعلام بانکی'},
];

const BANK_SUB_TABS = [
  {key: 'convert', label: 'تبدیل کارت به شبا'},
  {key: 'inquiry', label: 'استعلام شبا یا کارت'},
  {key: 'match', label: 'تطابق شبا یا کارت با کدملی'},
];

const FEES = {
  shahkar: 1400,
  sabteahval: 1500,
  bank: 1200,
};

const FEE_DESCRIPTIONS = {
  shahkar: 'هزینه انجام هر استعلام از سامانه شاهکار',
  sabteahval: 'هزینه انجام هر استعلام از سامانه ثبت احوال',
  bank: 'هزینه انجام هر استعلام از بانک',
};

export function InquiryScreen() {
  const [activeTab, setActiveTab] = useState<InquiryTab>('shahkar');
  const [bankSubTab, setBankSubTab] = useState<BankSubTab>('match');

  // Shahkar form
  const [shahkarNationalCode, setShahkarNationalCode] = useState('');
  const [shahkarPhone, setShahkarPhone] = useState('');

  // Sabte Ahval form
  const [sabteNationalCode, setSabteNationalCode] = useState('');
  const [sabteBirthDate, setSabteBirthDate] = useState('');
  const [sabteName, setSabteName] = useState('');
  const [sabteLastName, setSabteLastName] = useState('');
  const [sabteFatherName, setSabteFatherName] = useState('');

  // Bank form
  const [bankMatchNationalCode, setBankMatchNationalCode] = useState('');
  const [bankMatchBirthDate, setBankMatchBirthDate] = useState('');
  const [bankMatchIban, setBankMatchIban] = useState('');
  const [bankConvertCard, setBankConvertCard] = useState('');
  const [bankInquiryIban, setBankInquiryIban] = useState('');

  // Common state
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [showPaymentDrawer, setShowPaymentDrawer] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [inquiryResult, setInquiryResult] = useState<InquiryResultData | null>(null);

  const currentFee = FEES[activeTab];
  const currentFeeDescription = FEE_DESCRIPTIONS[activeTab];

  const isFormValid = useCallback(() => {
    switch (activeTab) {
      case 'shahkar':
        return shahkarNationalCode.trim().length > 0 && shahkarPhone.trim().length > 0;
      case 'sabteahval':
        return (
          sabteNationalCode.trim().length > 0 &&
          sabteBirthDate.trim().length > 0 &&
          sabteName.trim().length > 0 &&
          sabteLastName.trim().length > 0 &&
          sabteFatherName.trim().length > 0
        );
      case 'bank':
        switch (bankSubTab) {
          case 'match':
            return (
              bankMatchNationalCode.trim().length > 0 &&
              bankMatchBirthDate.trim().length > 0 &&
              bankMatchIban.trim().length > 0
            );
          case 'convert':
            return bankConvertCard.trim().length > 0;
          case 'inquiry':
            return bankInquiryIban.trim().length > 0;
          default:
            return false;
        }
      default:
        return false;
    }
  }, [
    activeTab,
    bankSubTab,
    shahkarNationalCode,
    shahkarPhone,
    sabteNationalCode,
    sabteBirthDate,
    sabteName,
    sabteLastName,
    sabteFatherName,
    bankMatchNationalCode,
    bankMatchBirthDate,
    bankMatchIban,
    bankConvertCard,
    bankInquiryIban,
  ]);

  const handleInquiry = async () => {
    if (!isFormValid()) return;

    // Convert card to IBAN is FREE - no payment needed
    if (activeTab === 'bank' && bankSubTab === 'convert') {
      await handleConvertCard();
      return;
    }

    // Other services require payment
    try {
      const walletData = await WalletService.getBalance();
      setBalance(walletData.balance);
      setShowPaymentDrawer(true);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  };

  // Free service - Convert card to IBAN
  const handleConvertCard = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Format card number with spaces
      const formattedCard = bankConvertCard.replace(/(\d{4})/g, '$1 ').trim();
      
      const result: InquiryResultData = {
        type: 'bank',
        subType: 'convert',
        cardNumber: bankConvertCard,
        convertedIban: 'IR702500000000569877258​42',
      };

      setInquiryResult(result);
      setShowResultModal(true);
    } catch (error) {
      console.error('Convert failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayAndInquiry = async () => {
    setShowPaymentDrawer(false);
    setLoading(true);

    try {
      await WalletService.processPayment({
        amount: currentFee,
        description: `استعلام ${INQUIRY_TABS.find(t => t.key === activeTab)?.label}`,
      });

      let result: InquiryResultData;

      switch (activeTab) {
        case 'shahkar':
          const shahkarResponse = await InquiryService.shahkarInquiry({
            nationalCode: shahkarNationalCode,
            phoneNumber: shahkarPhone,
          });
          result = {
            type: 'shahkar',
            isMatch: shahkarResponse.isMatch,
            nationalCode: shahkarNationalCode,
            phoneNumber: shahkarPhone,
          };
          break;

        case 'sabteahval':
          await new Promise(resolve => setTimeout(resolve, 1500));
          result = {
            type: 'sabteahval',
            nameMatch: Math.floor(Math.random() * 50) + 50,
            lastNameMatch: 100,
            fullNameMatch: Math.floor(Math.random() * 30) + 70,
            fatherNameMatch: 100,
          };
          break;

        case 'bank':
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          if (bankSubTab === 'match') {
            result = {
              type: 'bank',
              subType: 'match',
              isMatch: Math.random() > 0.3,
              nationalCode: bankMatchNationalCode,
              birthDate: bankMatchBirthDate || '۱۳۷۷/۰۴/۰۲',
              iban: bankMatchIban.startsWith('IR') 
                ? bankMatchIban 
                : `IR${bankMatchIban}`,
            };
          } else if (bankSubTab === 'inquiry') {
            // IBAN/Card inquiry - returns card number and IBAN like convert
            const inputValue = bankInquiryIban.replace(/\s/g, '');
            const isCard = inputValue.length === 16 && !inputValue.startsWith('IR');
            result = {
              type: 'bank',
              subType: 'inquiry',
              cardNumber: isCard ? inputValue : '۷۴۵۶ ۶۸۹۵ ۱۵۷۴ ۵۸۵۲',
              convertedIban: isCard ? 'IR702500000000569877258​42' : inputValue,
            };
          } else {
            throw new Error('Invalid bank sub-tab');
          }
          break;

        default:
          throw new Error('Invalid tab');
      }

      setInquiryResult(result);
      setShowResultModal(true);
    } catch (error) {
      console.error('Inquiry failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseResult = () => {
    setShowResultModal(false);
    setInquiryResult(null);
    // Reset forms
    setShahkarNationalCode('');
    setShahkarPhone('');
    setSabteNationalCode('');
    setSabteBirthDate('');
    setSabteName('');
    setSabteLastName('');
    setSabteFatherName('');
    setBankMatchNationalCode('');
    setBankMatchBirthDate('');
    setBankMatchIban('');
    setBankConvertCard('');
    setBankInquiryIban('');
  };

  const renderShahkarForm = () => (
    <>
      <Input
        label="کد ملی"
        value={shahkarNationalCode}
        onChangeText={setShahkarNationalCode}
        keyboardType="number-pad"
        maxLength={10}
      />
      <Input
        label="شماره تلفن"
        value={shahkarPhone}
        onChangeText={setShahkarPhone}
        keyboardType="phone-pad"
        maxLength={11}
      />
    </>
  );

  const renderSabteAhvalForm = () => (
    <>
      <Input
        label="کد ملی"
        value={sabteNationalCode}
        onChangeText={setSabteNationalCode}
        keyboardType="number-pad"
        maxLength={10}
      />
      <Input
        label="تاریخ تولد"
        value={sabteBirthDate}
        onChangeText={setSabteBirthDate}
        rightIcon="calendar-outline"
        keyboardType="number-pad"
      />
      <Input label="نام" value={sabteName} onChangeText={setSabteName} />
      <Input label="نام خانوادگی" value={sabteLastName} onChangeText={setSabteLastName} />
      <Input label="نام پدر" value={sabteFatherName} onChangeText={setSabteFatherName} />
    </>
  );

  const renderBankForm = () => {
    if (bankSubTab === 'match') {
      return (
        <>
          <Input
            label="کد ملی"
            value={bankMatchNationalCode}
            onChangeText={setBankMatchNationalCode}
            keyboardType="number-pad"
            maxLength={10}
          />
          <Input
            label="تاریخ تولد"
            value={bankMatchBirthDate}
            onChangeText={setBankMatchBirthDate}
            rightIcon="calendar-outline"
            keyboardType="number-pad"
          />
          <Input
            label="شماره شبا یا کارت"
            value={bankMatchIban}
            onChangeText={setBankMatchIban}
          />
        </>
      );
    }

    if (bankSubTab === 'convert') {
      return (
        <Input
          label="شماره کارت"
          value={bankConvertCard}
          onChangeText={setBankConvertCard}
          keyboardType="number-pad"
          maxLength={16}
        />
      );
    }

    if (bankSubTab === 'inquiry') {
      return (
        <Input
          label="شماره شبا یا کارت"
          value={bankInquiryIban}
          onChangeText={setBankInquiryIban}
        />
      );
    }

    return null;
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'shahkar':
        return renderShahkarForm();
      case 'sabteahval':
        return renderSabteAhvalForm();
      case 'bank':
        return (
          <>
            <SubTabSelector
              tabs={BANK_SUB_TABS}
              activeTab={bankSubTab}
              onTabChange={(key) => setBankSubTab(key as BankSubTab)}
            />
            {/* Show description for convert, fee notice for others */}
            {bankSubTab === 'convert' ? (
              <Text variant="body" color="secondary" align="center" style={{marginBottom: spacing['2xl']}}>
                برای تبدیل شماره کارت را وارد کنید
              </Text>
            ) : (
              <FeeNotice serviceName="بانک" fee={FEES.bank} />
            )}
            {renderBankForm()}
          </>
        );
      default:
        return null;
    }
  };

  const getButtonTitle = () => {
    if (loading) return 'در حال استعلام...';
    if (activeTab === 'bank' && bankSubTab === 'convert') return 'تبدیل';
    return 'استعلام';
  };

  return (
    <View style={styles.container}>
      <AppHeader />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        
        <PageTitle title="استعلامات" />

        <TabSelector
          tabs={INQUIRY_TABS}
          activeTab={activeTab}
          onTabChange={(key) => setActiveTab(key as InquiryTab)}
        />

        {/* Card Container */}
        <View style={styles.card}>
          {activeTab !== 'bank' && (
            <FeeNotice
              serviceName={
                activeTab === 'shahkar' ? 'سامانه شاهکار' : 'سامانه ثبت احوال'
              }
              fee={currentFee}
            />
          )}
          {renderForm()}
        </View>

        {/* Spacer */}
        <View style={styles.spacer} />

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <Button
            title={getButtonTitle()}
            loading={loading}
            disabled={!isFormValid()}
            onPress={handleInquiry}
          />
        </View>
      </ScrollView>

      <BottomTabBar activeTab="inquiry" />

      {/* Payment Drawer */}
      <PaymentDrawer
        visible={showPaymentDrawer}
        onClose={() => setShowPaymentDrawer(false)}
        onPayment={handlePayAndInquiry}
        balance={balance}
        fee={currentFee}
        feeDescription={currentFeeDescription}
        loading={loading}
      />

      {/* Result Modal */}
      <ResultModal
        visible={showResultModal}
        onClose={handleCloseResult}
        result={inquiryResult}
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
    flexGrow: 1,
  },

  card: {
    marginHorizontal: spacing.screenPadding,
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius['2xl'],
    padding: spacing.cardPadding,
  },

  spacer: {
    flex: 1,
    minHeight: spacing.xl,
  },

  buttonContainer: {
    marginHorizontal: spacing.screenPadding,
    marginBottom: spacing['2xl'],
  },
});
