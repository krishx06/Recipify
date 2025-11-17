
import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

import WelcomeScreen from "./src/screens/WelcomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import TabNavigator from "./src/navigation/TabNavigator";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    TransformaBlack: require("./assets/fonts/TransformaSans_Trial-Black-BF660ca8e05d182.otf"),
    TransformaLight: require("./assets/fonts/TransformaMix_Trial-Light-BF660ca8e1ac32b.otf"),
    TransformaSemiBold: require("./assets/fonts/TransformaMix_Trial-SemiBold-BF660ca8e1a26a1.otf"),
    LatoLight: require("./assets/fonts/Lato-Light.ttf"),
    LatoRegular: require("./assets/fonts/Lato-Regular.ttf"),
    LatoBold: require("./assets/fonts/Lato-Bold.ttf"),
    LatoBlack: require("./assets/fonts/Lato-Black.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen name="MainTabs" component={TabNavigator} />

        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />

      </Stack.Navigator>

      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
