import { BackHandler, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

export default function IndexScreen() {
  const webRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  // Centralize the root URL used across resets
  const HOME_URL = 'https://moodle.hm.edu/';
  const [url, setUrl] = useState(HOME_URL);
  const navigation = useNavigation();
  const router = useRouter();

  // Pure WebView mode: no special handling

  // Android-only: make hardware back navigate the WebView history
  useEffect(() => {
    const onBackPress = () => {
      if (canGoBack && webRef.current) {
        webRef.current.goBack();
        return true;
      }
      return false;
    };
    const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => sub.remove();
  }, [canGoBack]);

  // When Home tab is pressed (even if we're already on it), reload the root.
  // The timestamp avoids cached redirects keeping us on subpages.
  useEffect(() => {
    const unsubscribe = (navigation as any).addListener('tabPress', () => {
      setUrl(`${HOME_URL}?refresh=${Date.now()}`);
    });
    return unsubscribe;
  }, [navigation]);

  // No deep-link or system auth handling in pure WebView mode

  return (
    <SafeAreaView style={styles.container} edges={["top"]}> 
      <View style={styles.container}>
        <WebView
          ref={webRef}
          source={{ uri: url }}
          javaScriptEnabled
          domStorageEnabled
          sharedCookiesEnabled
          originWhitelist={["*"]}
          allowsInlineMediaPlayback
          setSupportMultipleWindows
          // Track if the WebView can go back so we can handle hardware back
          onNavigationStateChange={(nav) => setCanGoBack(nav.canGoBack)}
          onShouldStartLoadWithRequest={() => true}
          style={styles.webview}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});


