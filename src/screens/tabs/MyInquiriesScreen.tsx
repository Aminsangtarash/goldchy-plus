/**
 * MyInquiriesScreen
 * Shows history of user's inquiries
 */

import React, {useState, useMemo} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {
  AppHeader,
  PageTitle,
  SearchInput,
  TabSelector,
  InquiryHistoryCard,
  BottomTabBar,
} from '../../components';
import type {InquiryHistoryData} from '../../components';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';

type FilterTab = 'all' | 'bank' | 'sabteahval' | 'shahkar';

const FILTER_TABS = [
  {key: 'all', label: 'همه'},
  {key: 'bank', label: 'استعلام بانکی'},
  {key: 'sabteahval', label: 'استعلام ثبت احوال'},
  {key: 'shahkar', label: 'استعلام سامانه شاهکار'},
];

interface InquiryHistoryItem {
  id: string;
  date: string;
  time: string;
  data: InquiryHistoryData;
}

// Mock data
const MOCK_HISTORY: InquiryHistoryItem[] = [
  {
    id: '1',
    date: '۱۴۰۴/۰۷/۲۴',
    time: '۱۴:۲۳',
    data: {
      type: 'shahkar',
      isMatch: true,
      nationalCode: '۰۳۷۲۵۴۸۹۷۸',
      phoneNumber: '۰۹۰۱۲۶۵۴۸۴۷',
    },
  },
  {
    id: '2',
    date: '۱۴۰۴/۰۷/۲۴',
    time: '۱۴:۲۳',
    data: {
      type: 'sabteahval',
      nameMatch: 15,
      lastNameMatch: 100,
      fullNameMatch: 78,
      fatherNameMatch: 100,
    },
  },
  {
    id: '3',
    date: '۱۴۰۴/۰۷/۲۴',
    time: '۱۴:۲۳',
    data: {
      type: 'bank_match',
      isMatch: true,
      nationalCode: '۰۳۷۲۵۴۸۹۷۸',
      birthDate: '۱۳۷۷/۰۴/۰۲',
      iban: 'IR۷۰۲۵۰۰۰۰۰۰۰۰۵۶۹۸۷۷۲۵۸۴۲',
    },
  },
  {
    id: '4',
    date: '۱۴۰۴/۰۷/۲۴',
    time: '۱۴:۲۳',
    data: {
      type: 'shahkar',
      isMatch: true,
      nationalCode: '۰۳۷۲۵۴۸۹۷۸',
      phoneNumber: '۰۹۰۱۲۶۵۴۸۴۷',
    },
  },
  {
    id: '5',
    date: '۱۴۰۴/۰۷/۲۴',
    time: '۱۴:۲۳',
    data: {
      type: 'sabteahval',
      nameMatch: 15,
      lastNameMatch: 100,
      fullNameMatch: 78,
      fatherNameMatch: 100,
    },
  },
];

export function MyInquiriesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  const filteredHistory = useMemo(() => {
    let filtered = MOCK_HISTORY;

    // Filter by tab
    if (activeFilter !== 'all') {
      filtered = filtered.filter((item) => {
        if (activeFilter === 'bank') {
          return item.data.type === 'bank_match' || item.data.type === 'bank_inquiry';
        }
        return item.data.type === activeFilter;
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter((item) => {
        const data = item.data;
        if (data.type === 'shahkar') {
          return data.nationalCode.includes(searchQuery) || data.phoneNumber.includes(searchQuery);
        }
        if (data.type === 'bank_match') {
          return data.nationalCode.includes(searchQuery) || data.iban.includes(searchQuery);
        }
        return false;
      });
    }

    return filtered;
  }, [activeFilter, searchQuery]);

  return (
    <View style={styles.container}>
      <AppHeader />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        <PageTitle title="استعلام های من" />

        {/* Search Input */}
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="جستجو کنید..."
        />

        {/* Filter Tabs */}
        <View style={styles.tabsContainer}>
          <TabSelector
            tabs={FILTER_TABS}
            activeTab={activeFilter}
            onTabChange={(key) => setActiveFilter(key as FilterTab)}
          />
        </View>

        {/* History List */}
        <View style={styles.historyList}>
          {filteredHistory.map((item) => (
            <InquiryHistoryCard
              key={item.id}
              date={item.date}
              time={item.time}
              data={item.data}
            />
          ))}
        </View>
      </ScrollView>

      <BottomTabBar activeTab="inquiry" />
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

  tabsContainer: {
    marginBottom: spacing.lg,
  },

  historyList: {
    backgroundColor: colors.background.secondary,
  },
});
