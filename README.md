# Goldchy Plus

A modern React Native app for gold trading and investment, built with Expo and NativeWind (Tailwind CSS).

## 🚀 Features

- **Gold Trading**: Buy and sell gold with real-time prices
- **Portfolio Management**: Track your gold investments
- **Wallet**: Manage your cash and gold assets
- **Market Data**: Live gold, coin, and currency prices
- **Secure Authentication**: Login, register with social auth options

## 📱 Platforms

- ✅ Android
- ✅ iOS
- ✅ Web

## 🛠 Tech Stack

- **Framework**: [Expo](https://expo.dev) (SDK 52)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **State Management**: React Hooks
- **Icons**: [@expo/vector-icons](https://icons.expo.fyi/)
- **Language**: TypeScript

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/goldchy-plus.git
cd goldchy-plus

# Install dependencies
npm install

# Start the development server
npm start
```

## 🏃‍♂️ Running the App

```bash
# Start Expo development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web
```

## 📁 Project Structure

```
goldchy-plus/
├── app/                    # Expo Router screens
│   ├── (auth)/            # Authentication screens
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (tabs)/            # Main tab screens
│   │   ├── index.tsx      # Home
│   │   ├── market.tsx     # Market prices
│   │   ├── trade.tsx      # Buy/Sell
│   │   ├── wallet.tsx     # Wallet
│   │   └── profile.tsx    # Profile
│   ├── _layout.tsx        # Root layout
│   └── welcome.tsx        # Onboarding
├── src/
│   ├── components/        # Reusable UI components
│   ├── constants/         # Theme, colors, etc.
│   ├── hooks/             # Custom hooks
│   ├── services/          # API services
│   ├── utils/             # Helper functions
│   └── assets/            # Images, fonts
├── tailwind.config.js     # Tailwind/NativeWind config
├── app.json               # Expo config
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
| Text Secondary | `#B0B0C0` | Subtitle text |

### Components

- `Button` - Primary, secondary, outline, ghost variants
- `Card` - Default, elevated, outlined, gold variants
- `Input` - With icons and validation
- `Avatar` - With initials and badges
- `PriceCard` - For displaying prices with changes
- `TransactionItem` - Transaction history items
- `Header` - Screen headers with back button
- `BottomTabBar` - Custom tab navigation

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
EXPO_PUBLIC_API_URL=your_api_url
```

### Building for Production

```bash
# Android APK/AAB
eas build -p android

# iOS
eas build -p ios

# Web
expo export:web
```

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
