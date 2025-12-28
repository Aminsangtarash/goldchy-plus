import React, {useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
  Dimensions,
  Share,
  I18nManager,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {InquiryService, WalletService} from '../../services/api';

// Force RTL
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

type InquiryTab = 'shahkar' | 'sabteahval' | 'bank';
type ResultStatus = 'match' | 'no_match' | null;

interface InquiryResult {
  status: ResultStatus;
  nationalCode: string;
  phoneNumber: string;
}

// Convert to Persian numerals
const toPersianNumber = (num: number | string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/\d/g, d => persianDigits[parseInt(d)]);
};

// Format currency
const formatCurrency = (amount: number): string => {
  return toPersianNumber(amount.toLocaleString('en-US'));
};

export function InquiryScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<InquiryTab>('shahkar');
  const [nationalCode, setNationalCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Payment drawer state
  const [showPaymentDrawer, setShowPaymentDrawer] = useState(false);
  const [balance, setBalance] = useState(0);
  const drawerAnimation = useRef(new Animated.Value(0)).current;
  
  // Result modal state
  const [showResultModal, setShowResultModal] = useState(false);
  const [inquiryResult, setInquiryResult] = useState<InquiryResult | null>(null);

  const inquiryFee = 1400;

  const tabs: {key: InquiryTab; label: string}[] = [
    {key: 'shahkar', label: 'سامانه شاهکار'},
    {key: 'sabteahval', label: 'ثبت احوال'},
    {key: 'bank', label: 'استعلام بانکی'},
  ];

  const openPaymentDrawer = useCallback(async () => {
    // Fetch balance using API service
    const walletData = await WalletService.getBalance();
    setBalance(walletData.balance);
    setShowPaymentDrawer(true);
    Animated.spring(drawerAnimation, {
      toValue: 1,
      useNativeDriver: true,
      tension: 65,
      friction: 11,
    }).start();
  }, [drawerAnimation]);

  const closePaymentDrawer = useCallback(() => {
    Animated.timing(drawerAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setShowPaymentDrawer(false));
  }, [drawerAnimation]);

  const handleInquiry = () => {
    if (!nationalCode.trim() || !phoneNumber.trim()) {
      return;
    }
    openPaymentDrawer();
  };

  const handlePayAndInquiry = async () => {
    closePaymentDrawer();
    setLoading(true);
    
    try {
      // Process payment using API service
      await WalletService.processPayment({
        amount: inquiryFee,
        description: 'استعلام شاهکار',
      });
      
      // Perform inquiry using API service
      const response = await InquiryService.shahkarInquiry({
        nationalCode,
        phoneNumber,
      });
      
      setInquiryResult({
        status: response.isMatch ? 'match' : 'no_match',
        nationalCode: response.nationalCode,
        phoneNumber: response.phoneNumber,
      });
      setShowResultModal(true);
    } catch (error) {
      console.error('Inquiry failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!inquiryResult) return;
    
    const message = inquiryResult.status === 'match'
      ? `نتیجه استعلام شاهکار:\nکدملی: ${toPersianNumber(inquiryResult.nationalCode)}\nشماره همراه: ${toPersianNumber(inquiryResult.phoneNumber)}\nوضعیت: کدملی و شماره همراه تطابق دارند!`
      : `نتیجه استعلام شاهکار:\nکدملی: ${toPersianNumber(inquiryResult.nationalCode)}\nشماره همراه: ${toPersianNumber(inquiryResult.phoneNumber)}\nوضعیت: کدملی و شماره همراه تطابق ندارند!`;
    
    try {
      await Share.share({message});
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  const handleBack = () => {
    setShowResultModal(false);
    setInquiryResult(null);
    setNationalCode('');
    setPhoneNumber('');
  };

  const drawerTranslateY = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  return (
    <View className="flex-1 bg-background-dark">
      {/* Header */}
      <View
        className="flex-row items-center justify-between px-5"
        style={{paddingTop: insets.top + 12}}>
        <TouchableOpacity className="p-2">
          <Icon name="menu" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <View className="flex-row items-center">
          <Text className="text-primary-400 text-2xl font-bold">+</Text>
          <Text className="text-white text-2xl font-bold mr-1">گلدچی</Text>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        
        {/* Title */}
        <View className="flex-row items-center justify-center mt-8 mb-6 px-5">
          <View className="flex-1 h-px bg-primary-400/30" />
          <Text className="text-white text-xl font-semibold mx-4">استعلامات</Text>
          <View className="flex-1 h-px bg-primary-400/30" />
        </View>

        {/* Tabs */}
        <View className="flex-row mx-5 mb-6">
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              className={`flex-1 py-3 rounded-xl mx-1 items-center ${
                activeTab === tab.key
                  ? 'bg-primary-400'
                  : 'bg-transparent border border-primary-400/50'
              }`}
              activeOpacity={0.8}>
              <Text
                className={`font-medium ${
                  activeTab === tab.key ? 'text-background-dark' : 'text-primary-400'
                }`}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Card Container */}
        <View className="mx-5 bg-background-card rounded-2xl p-6">
          {/* Fee Notice */}
          <View className="bg-background-input rounded-xl px-4 py-4 mb-6">
            <Text className="text-text-secondary text-sm text-center leading-6">
              هزینه انجام هر استعلام از سامانه شاهکار
            </Text>
            <Text className="text-text-secondary text-sm text-center">
              {toPersianNumber('۱٫۴۰۰')} تومان می باشد!
            </Text>
          </View>

          {/* National Code Input */}
          <View className="mb-4">
            <Text className="text-white text-sm mb-2 text-right">کد ملی</Text>
            <TextInput
              className="bg-background-input border border-border-input rounded-xl px-4 py-4 text-white text-base text-right"
              placeholder="وارد کنید..."
              placeholderTextColor="#5A7A7D"
              keyboardType="number-pad"
              value={nationalCode}
              onChangeText={setNationalCode}
              maxLength={10}
            />
          </View>

          {/* Phone Number Input */}
          <View className="mb-4">
            <Text className="text-white text-sm mb-2 text-right">شماره تلفن</Text>
            <TextInput
              className="bg-background-input border border-border-input rounded-xl px-4 py-4 text-white text-base text-right"
              placeholder="وارد کنید..."
              placeholderTextColor="#5A7A7D"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              maxLength={11}
            />
          </View>
        </View>

        {/* Spacer */}
        <View className="flex-1" />

        {/* Submit Button */}
        <View className="mx-5 mb-6">
          <TouchableOpacity
            className={`bg-primary-400 rounded-xl py-4 items-center ${
              loading ? 'opacity-70' : ''
            }`}
            onPress={handleInquiry}
            disabled={loading || !nationalCode.trim() || !phoneNumber.trim()}
            activeOpacity={0.8}>
            <Text className="text-background-dark text-lg font-semibold">
              {loading ? 'در حال استعلام...' : 'استعلام'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View
        className="flex-row bg-background-card rounded-t-3xl mx-4"
        style={{paddingBottom: insets.bottom + 8, paddingTop: 16}}>
        <TouchableOpacity className="flex-1 items-center">
          <Icon name="pricetag-outline" size={24} color="#A0B4B7" />
          <Text className="text-text-secondary text-xs mt-1">قیمت ها</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 items-center">
          <Icon name="calculator-outline" size={24} color="#A0B4B7" />
          <Text className="text-text-secondary text-xs mt-1">محاسبه</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 items-center">
          <Icon name="document-text" size={24} color="#3ECFB2" />
          <Text className="text-primary-400 text-xs mt-1">استعلام</Text>
        </TouchableOpacity>
      </View>

      {/* Payment Drawer */}
      {showPaymentDrawer && (
        <Modal
          transparent
          visible={showPaymentDrawer}
          animationType="none"
          onRequestClose={closePaymentDrawer}>
          <TouchableOpacity
            className="flex-1 bg-black/50"
            activeOpacity={1}
            onPress={closePaymentDrawer}>
            <View className="flex-1" />
            <Animated.View
              style={{transform: [{translateY: drawerTranslateY}]}}
              className="bg-background-card rounded-t-3xl px-5 pt-6 pb-8">
              <TouchableOpacity activeOpacity={1}>
                {/* Drawer Handle */}
                <View className="w-12 h-1 bg-text-muted rounded-full self-center mb-6" />

                {/* Fee Notice */}
                <View className="mb-6">
                  <Text className="text-text-secondary text-sm text-center leading-6">
                    هزینه انجام هر استعلام از سامانه شاهکار
                  </Text>
                  <Text className="text-text-secondary text-sm text-center">
                    {toPersianNumber('۱٫۴۰۰')} تومان می باشد!
                  </Text>
                </View>

                {/* Balance Card */}
                <View className="flex-row items-center bg-background-input border border-primary-400/30 rounded-xl mb-6">
                  <TouchableOpacity className="bg-background-elevated p-4 rounded-r-xl">
                    <Icon name="add" size={24} color="#3ECFB2" />
                  </TouchableOpacity>
                  <View className="flex-1 flex-row items-center justify-between px-4 py-4">
                    <Text className="text-white text-lg font-semibold">
                      {formatCurrency(balance)} تومان
                    </Text>
                    <View className="flex-row items-center">
                      <Text className="text-text-secondary text-sm mr-2">موجودی</Text>
                      <Icon name="wallet-outline" size={18} color="#A0B4B7" />
                    </View>
                  </View>
                </View>

                {/* Pay Button */}
                <TouchableOpacity
                  className="bg-primary-400 rounded-xl py-4 items-center"
                  onPress={handlePayAndInquiry}
                  activeOpacity={0.8}>
                  <Text className="text-background-dark text-lg font-semibold">
                    پرداخت و استعلام
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </Animated.View>
          </TouchableOpacity>
        </Modal>
      )}

      {/* Result Modal */}
      {showResultModal && inquiryResult && (
        <Modal
          transparent
          visible={showResultModal}
          animationType="fade"
          onRequestClose={handleBack}>
          <View className="flex-1 bg-black/70 justify-center px-5">
            <View className="bg-background-card rounded-2xl overflow-hidden">
              {/* Title */}
              <View className="py-5 border-b border-border-input">
                <Text className="text-white text-xl font-semibold text-center">
                  نتیجه استعلام
                </Text>
              </View>

              {/* Status Banner */}
              <View
                className={`mx-5 mt-5 rounded-xl px-4 py-4 flex-row items-center justify-center ${
                  inquiryResult.status === 'match'
                    ? 'bg-primary-400/15'
                    : 'bg-accent-error/15'
                }`}>
                <Text
                  className={`text-base mr-2 ${
                    inquiryResult.status === 'match'
                      ? 'text-primary-400'
                      : 'text-accent-error'
                  }`}>
                  {inquiryResult.status === 'match'
                    ? 'کدملی و شماره همراه تطابق دارند!'
                    : 'کدملی و شماره همراه تطابق ندارند!'}
                </Text>
                <Icon
                  name="information-circle"
                  size={20}
                  color={inquiryResult.status === 'match' ? '#3ECFB2' : '#FF6B6B'}
                />
              </View>

              {/* National Code */}
              <View className="mx-5 mt-4 bg-background-input rounded-xl px-4 py-4 flex-row items-center justify-between">
                <Text className="text-white text-base">
                  {toPersianNumber(inquiryResult.nationalCode)}
                </Text>
                <Text className="text-text-secondary text-sm">کدملی</Text>
              </View>

              {/* Phone Number */}
              <View className="mx-5 mt-3 bg-background-input rounded-xl px-4 py-4 flex-row items-center justify-between">
                <Text className="text-white text-base">
                  {toPersianNumber(inquiryResult.phoneNumber)}
                </Text>
                <Text className="text-text-secondary text-sm">شماره همراه</Text>
              </View>

              {/* Action Buttons */}
              <View className="flex-row mx-5 mt-6 mb-6">
                <TouchableOpacity
                  className="flex-1 bg-background-input rounded-xl py-4 items-center mr-2"
                  onPress={handleBack}
                  activeOpacity={0.8}>
                  <Text className="text-primary-400 text-base font-semibold">
                    بازگشت
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 bg-background-input rounded-xl py-4 flex-row items-center justify-center ml-2"
                  onPress={handleShare}
                  activeOpacity={0.8}>
                  <Text className="text-primary-400 text-base font-semibold mr-2">
                    اشتراک
                  </Text>
                  <Icon name="share-social-outline" size={20} color="#3ECFB2" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
