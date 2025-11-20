import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert
} from "react-native";

import { useAuth } from "../context/AuthContext";
import RandomRecipeCard from "../components/RandomRecipeCard";
import PopularSection from "../components/PopularSection";
import FeatureCards from "../components/FeatureCards";
import RecipifyFooter from "../components/RecipifyFooter";

export default function HomeScreen({ navigation }) {
  const { session, signOut } = useAuth();

  const user = {
    name: session?.user?.user_metadata?.full_name || "Friend",
    avatar: session?.user?.user_metadata?.avatar_url || null,
  };

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  function handleLogout() {
    Alert.alert(
      "Logout",
      "Are you sure you want to Signout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Signout",
          style: "destructive",
          onPress: () => signOut(),
        },
      ]
    );
  }
  function spinAndPick() {
    const randomRecipe = {
      id: "spin1",
      title: "Pasta",
      time: "20 Min",
      category: "Featured Dish",
      image:
        "https://images.unsplash.com/photo-1603133872878-684f5a7f7b53?w=1200&q=80",
    };
    setSelectedRecipe(randomRecipe);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 80 }}
      showsVerticalScrollIndicator={false}
    >

      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          {user.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.placeholderAvatar}>
              <Text style={styles.initial}>
                {user.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.welcome}>Welcome {user.name.split(" ")[0]}</Text>
          <Text style={styles.subtext}>What do you want to cook today?</Text>
        </View>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Signout</Text>
        </TouchableOpacity>
      </View>


      <FeatureCards navigation={navigation} />
      <RandomRecipeCard
        selected={selectedRecipe}
        spinAndPick={spinAndPick}
        navigation={navigation}
      />
      <PopularSection navigation={navigation} />
      <RecipifyFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 40 : 60,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
    marginTop: 10,
    gap: 12,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 40,
    overflow: "hidden",
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  placeholderAvatar: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  initial: {
    fontFamily: "TransformaSemiBold",
    fontSize: 22,
    color: "#444",
  },
  welcome: {
    fontSize: 22,
    fontFamily: "TransformaSemiBold",
    color: "#e11932",
  },
  subtext: {
    fontSize: 14,
    fontFamily: "LatoRegular",
    color: "#212121",
    marginTop: 2,
  },
  logoutButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  logoutText: {
    color: "#e11932",
    fontFamily: "LatoBold",
    fontSize: 14,
  },
});
