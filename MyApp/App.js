import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { PaperProvider, MD3LightTheme, configureFonts } from 'react-native-paper';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import Explore from './screens/Explore';
import IngredientSearch from './screens/IngredientSearch';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Explore" component={Explore} />
          <Stack.Screen name="IngredientSearch" component={IngredientSearch} />
        </Stack.Navigator>
        <StatusBar style="dark" />
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
