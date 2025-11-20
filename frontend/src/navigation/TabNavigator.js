
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import ExploreScreen from "../screens/ExploreScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import AIChefScreen from "../screens/AIChefScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 0,
          height: Platform.OS === "ios" ? 85 : 70,
          paddingBottom: Platform.OS === "ios" ? 25 : 10,
          paddingTop: 8,
        },

        tabBarActiveTintColor: "#e11932",
        tabBarInactiveTintColor: "#000",

        tabBarIcon: ({ color, size, focused }) => {
          let iconName = "home-outline";

          if (route.name === "Home")
            iconName = focused ? "home" : "home-outline";

          if (route.name === "Explore")
            iconName = focused ? "grid" : "grid-outline";

          if (route.name === "AIChef")
            iconName = focused ? "sparkles" : "sparkles-outline";

          if (route.name === "Favorites")
            iconName = focused ? "heart" : "heart-outline";

          return <Ionicons name={iconName} size={26} color={color} />;
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "LatoRegular",
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="AIChef" component={AIChefScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
}
