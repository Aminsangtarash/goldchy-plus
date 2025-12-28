/**
 * Format number to Persian digits with thousands separator
 */
export function formatPersianNumber(num: number | string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const numStr = typeof num === 'number' ? num.toLocaleString() : num;
  return numStr.replace(/\d/g, (d) => persianDigits[parseInt(d)]);
}

/**
 * Format currency with proper separators
 */
export function formatCurrency(
  amount: number,
  currency: 'IRR' | 'USD' = 'IRR',
  locale: 'fa' | 'en' = 'fa'
): string {
  if (locale === 'fa') {
    return formatPersianNumber(amount) + (currency === 'IRR' ? ' تومان' : ' دلار');
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency === 'IRR' ? 'IRR' : 'USD',
  }).format(amount);
}

/**
 * Format weight (grams)
 */
export function formatWeight(grams: number, locale: 'fa' | 'en' = 'fa'): string {
  if (locale === 'fa') {
    return formatPersianNumber(grams) + ' گرم';
  }
  return `${grams}g`;
}

/**
 * Calculate percentage change
 */
export function calculateChange(current: number, previous: number): {
  change: number;
  percent: number;
  isPositive: boolean;
} {
  const change = current - previous;
  const percent = previous !== 0 ? (change / previous) * 100 : 0;
  return {
    change,
    percent: Math.round(percent * 100) / 100,
    isPositive: change >= 0,
  };
}

/**
 * Validate Iranian phone number
 */
export function isValidIranianPhone(phone: string): boolean {
  const cleanPhone = phone.replace(/\D/g, '');
  return /^09\d{9}$/.test(cleanPhone);
}

/**
 * Validate email
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Format relative time
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString();
}
