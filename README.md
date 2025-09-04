# PasskeysRN

A React Native Expo app that embeds a WebView to load the Moodle learning platform for Hochschule München (HM).

## Features

- Built tabbed UI with Home/Profile icons and safe area handling
- Embedded WebView loads https://moodle.hm.edu/
- Added Android hardware back support for WebView navigation
- Home tab resets to main page on reselect
- Clean, maintainable code with concise comments
- Pure WebView implementation (passkey login disabled per WebView limitations)

## Tech Stack

- **Framework**: Expo SDK 53
- **Navigation**: Expo Router with tabs
- **WebView**: react-native-webview
- **Icons**: @expo/vector-icons (FontAwesome)
- **Safe Areas**: react-native-safe-area-context
- **Language**: TypeScript

## Project Structure

```
PasskeysRN/
├── app/
│   ├── _layout.tsx          # Root layout with tabs and safe area provider
│   ├── index.tsx            # Home screen with WebView
│   └── profile.tsx          # Profile screen
├── components/              # Reusable components
├── constants/               # App constants and colors
├── assets/                  # Images, fonts, and static files
└── package.json             # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mustafayoussef-commits/PasskeysRN.git
cd PasskeysRN
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Usage

- **Home Tab**: Displays the Moodle HM website in a WebView
- **Profile Tab**: Shows a placeholder profile screen
- **Navigation**: Use the tab bar to switch between screens
- **Back Navigation**: On Android, use the hardware back button to navigate within the WebView

## Limitations

- **Passkey Authentication**: WebAuthn/passkeys are not supported in WKWebView/Android WebView, so the "Login with passkey" button remains disabled
- **Session Management**: The WebView operates independently of system browser sessions

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- Repository: [https://github.com/mustafayoussef-commits/PasskeysRN](https://github.com/mustafayoussef-commits/PasskeysRN)
