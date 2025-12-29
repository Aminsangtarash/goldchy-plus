/**
 * Utility Functions
 */

// Persian numerals conversion
const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export const toPersianNumber = (num: number | string): string => {
  return String(num).replace(/\d/g, (d) => persianDigits[parseInt(d)]);
};

export const toEnglishNumber = (str: string): string => {
  return str.replace(/[۰-۹]/g, (d) => String(persianDigits.indexOf(d)));
};

// Format currency (Iranian Toman)
export const formatCurrency = (amount: number): string => {
  const formatted = amount.toLocaleString('en-US');
  return toPersianNumber(formatted);
};

// Format phone number
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  return phone;
};

// Validate Iranian phone number
export const isValidIranianPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  return /^09\d{9}$/.test(cleaned);
};

// Validate Iranian national code
export const isValidNationalCode = (code: string): boolean => {
  const cleaned = code.replace(/\D/g, '');
  if (cleaned.length !== 10) return false;
  
  // Check for repeated digits
  if (/^(.)\1{9}$/.test(cleaned)) return false;
  
  // Checksum validation
  const check = parseInt(cleaned[9]);
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned[i]) * (10 - i);
  }
  const remainder = sum % 11;
  return (remainder < 2 && check === remainder) || 
         (remainder >= 2 && check === 11 - remainder);
};

// Truncate text
export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Get initials from name
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Format IBAN
export const formatIBAN = (iban: string): string => {
  const cleaned = iban.replace(/\s/g, '');
  return cleaned.replace(/(.{4})/g, '$1 ').trim();
};

// Mask card number
export const maskCardNumber = (card: string): string => {
  const cleaned = card.replace(/\D/g, '');
  if (cleaned.length !== 16) return card;
  return `${cleaned.slice(0, 4)} **** **** ${cleaned.slice(-4)}`;
};
