# گلدچی+ (Goldchy Plus)

Persian Gold Trading Mobile Application

## Tech Stack

- **Framework**: React Native 0.76.5 (Bare CLI)
- **Language**: TypeScript
- **Styling**: StyleSheet + Design Tokens (No NativeWind)
- **Navigation**: React Navigation 7
- **Icons**: react-native-vector-icons

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Text.tsx         # Typography component
│   ├── Button.tsx       # Primary button
│   ├── Input.tsx        # Form input
│   ├── Card.tsx         # Card container
│   ├── AppHeader.tsx    # App header with logo
│   ├── PageTitle.tsx    # Title with decorative lines
│   ├── TabSelector.tsx  # Horizontal tabs
│   ├── SubTabSelector.tsx # Bank inquiry sub-tabs
│   ├── FeeNotice.tsx    # Fee information banner
│   ├── BottomTabBar.tsx # Bottom navigation
│   ├── PaymentDrawer.tsx # Payment bottom sheet
│   └── ResultModal.tsx  # Inquiry result modal
│
├── screens/
│   ├── auth/            # Authentication screens
│   │   ├── PhoneLoginScreen.tsx
│   │   └── OTPVerificationScreen.tsx
│   └── tabs/            # Main app screens
│       ├── HomeScreen.tsx
│       ├── CalculatorScreen.tsx
│       └── InquiryScreen.tsx
│
├── navigation/          # Navigation configuration
│
├── services/            # API services
│   └── api.ts           # Auth, Inquiry, Wallet services
│
├── theme/               # Design Tokens
│   ├── colors.ts        # Color palette
│   ├── spacing.ts       # Spacing scale
│   ├── typography.ts    # Font sizes, weights, text styles
│   ├── borderRadius.ts  # Border radius scale
│   └── shadows.ts       # Shadow definitions
│
└── utils/               # Utility functions
    └── index.ts         # Persian numerals, validation, formatting
```

## Design Tokens

### Colors
- Primary: Teal/Turquoise (#3ECFB2)
- Background: Dark navy (#0B1A1C)
- Card: Dark teal (#162A2D)
- Error: Coral (#FF6B6B)

### Spacing
- xs: 4, sm: 8, md: 12, lg: 16, xl: 20, 2xl: 24, 3xl: 32

### Typography
- Variants: h1, h2, h3, h4, bodyLarge, body, bodySmall, label, button

## Getting Started

```bash
# Install dependencies
npm install

# Start Metro bundler
npm start

# Run on Android
npm run android

# Build Debug APK
npm run build:android:debug
```

## Features

### Authentication
- Phone number login
- OTP verification
- Persian RTL layout

### Inquiry (استعلامات)
1. **سامانه شاهکار** - Shahkar system
2. **ثبت احوال** - Civil registration
3. **استعلام بانکی** - Bank inquiry
   - تبدیل کارت به شبا (Card to IBAN)
   - استعلام شبا یا کارت (IBAN/Card inquiry)
   - تطابق شبا یا کارت با کدملی (Match with National Code)

## RTL Support

The app is configured for Persian (Farsi) RTL layout:
- I18nManager.forceRTL(true)
- Text alignment: right
- Navigation: RTL

## API Integration

Mock API services are included for development. Replace with actual endpoints in `src/services/api.ts`.
