# Goldchy Plus

A React Native app for gold trading and investment, built with bare React Native (no Expo).

## 🚀 Features

- **Gold Trading**: Buy and sell gold with real-time prices
- **Portfolio Management**: Track your gold investments
- **Wallet**: Manage your cash and gold assets
- **Market Data**: Live gold, coin, and currency prices
- **Secure Authentication**: Login, register with social auth options

## 📱 Platforms

- ✅ Android
- ✅ iOS
- ✅ Web (via react-native-web)

## 🛠 Tech Stack

- **Framework**: React Native 0.76.5 (Bare/CLI)
- **Navigation**: React Navigation 7
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Icons**: react-native-vector-icons
- **Language**: TypeScript

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/goldchy-plus.git
cd goldchy-plus

# Install dependencies
npm install

# Install iOS pods (macOS only)
cd ios && pod install && cd ..
```

## 🏃‍♂️ Running the App

```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## 📦 Build APK

### Debug APK
```bash
npm run build:android:debug
# Output: android/app/build/outputs/apk/debug/app-debug.apk
```

### Release APK
```bash
# First, set up signing (see below)
npm run build:android:release
# Output: android/app/build/outputs/apk/release/app-release.apk
```

### Release Bundle (AAB) for Play Store
```bash
npm run build:android:bundle
# Output: android/app/build/outputs/bundle/release/app-release.aab
```

## 🔐 Release Signing Setup

1. Generate a keystore:
```bash
keytool -genkeypair -v -storetype PKCS12 -keystore goldchy-plus.keystore -alias goldchy-plus -keyalg RSA -keysize 2048 -validity 10000
```

2. Add to `android/gradle.properties`:
```properties
MYAPP_UPLOAD_STORE_FILE=goldchy-plus.keystore
MYAPP_UPLOAD_KEY_ALIAS=goldchy-plus
MYAPP_UPLOAD_STORE_PASSWORD=your_password
MYAPP_UPLOAD_KEY_PASSWORD=your_password
```

3. Place the keystore file in `android/app/`

## 📁 Project Structure

```
goldchy-plus/
├── android/               # Android native code
├── ios/                   # iOS native code
├── src/
│   ├── components/        # Reusable UI components
│   ├── screens/           # App screens
│   │   ├── auth/         # Login, Register
│   │   └── tabs/         # Home, Market, Trade, Wallet, Profile
│   ├── navigation/        # React Navigation setup
│   ├── constants/         # Theme, colors
│   ├── hooks/             # Custom hooks
│   ├── services/          # API services
│   └── utils/             # Helper functions
├── App.tsx                # Main app component
├── index.js               # Entry point
└── package.json
```

## 🎨 Design System

### Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Primary (Gold) | `#FFB800` | Buttons, highlights |
| Background Dark | `#0D0D1A` | Main background |
| Card Background | `#1A1A2E` | Card surfaces |
| Text Primary | `#FFFFFF` | Main text |

## 📄 License

MIT License
