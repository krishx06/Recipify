import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import { PaperProvider, MD3LightTheme, configureFonts } from 'react-native-paper';
import Login from './screens/Login';
import Signup from './screens/Signup';

const fontConfig = {
  bodyLarge: { fontFamily: 'System', fontWeight: '400', fontSize: 16 },
};

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#2E7D32',
    secondary: '#66BB6A',
    surface: '#ffffff',
    background: '#EAF6E9',
  },
  fonts: configureFonts({ config: fontConfig }),
};

export default function App() {
  const [screen, setScreen] = useState('login');
  const opacity = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const animateIn = () => {
    opacity.setValue(0);
    translateY.setValue(10);
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 220, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 220, easing: Easing.out(Easing.quad), useNativeDriver: true }),
    ]).start();
  };

  const handleSwitch = (next) => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 0, duration: 160, easing: Easing.in(Easing.quad), useNativeDriver: true }),
      Animated.timing(translateY, { toValue: -10, duration: 160, easing: Easing.in(Easing.quad), useNativeDriver: true }),
    ]).start(() => {
      setScreen(next);
      animateIn();
    });
  };
  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Animated.View style={{ flex: 1, opacity, transform: [{ translateY }] }}>
          {screen === 'login' ? (
            <Login onSwitch={handleSwitch} />
          ) : (
            <Signup onSwitch={handleSwitch} />
          )}
        </Animated.View>
        <StatusBar style="dark" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
