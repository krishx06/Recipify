import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";

import AuthNavigator from "./AuthNavigator";
import TabNavigator from "./TabNavigator";
import RecipeDetailsScreen from "../screens/RecipeDetailsScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { session, loading } = useAuth();

  if (loading) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {session ? (
        <>
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
        </>
      ) : (
        <Stack.Screen
          name="AuthFlow"
          component={AuthNavigator}
          options={{ animation: "fade" }}
        />
      )}
    </Stack.Navigator>
  );
}
