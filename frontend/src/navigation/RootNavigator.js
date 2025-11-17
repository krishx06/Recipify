import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      

      <Stack.Screen name="Welcome" component={WelcomeScreen} />


      <Stack.Screen name="Login" component={LoginScreen} />


      <Stack.Screen name="MainTabs" component={TabNavigator} />
    </Stack.Navigator>
  );
}
