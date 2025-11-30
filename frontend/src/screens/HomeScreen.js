import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
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
    Alert.alert("Logout", "Are you sure you want to Signout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Signout", style: "destructive", onPress: () => signOut() },
    ]);
  }

  function extractIngredients(item) {
    const list = [];
    for (let i = 1; i <= 20; i++) {
      const ing = item[`strIngredient${i}`];
      const measure = item[`strMeasure${i}`];

      if (ing && ing.trim() !== "") {
        list.push(`${measure} ${ing}`.trim());
      }
    }
    return list;
  }

  async function spinAndPick() {
    try {
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      const data = await res.json();

      if (data.meals && data.meals[0]) {
        const item = data.meals[0];

        const recipe = {
          id: item.idMeal,
          title: item.strMeal,
          image: item.strMealThumb,
          ingredients: extractIngredients(item),
          instructions:
            item.strInstructions
              ?.split(/\r?\n+/)
              .map(line =>
                line
                  .replace(/<[^>]*>/g, "")
                  .replace(/\u200B/g, "")
                  .replace(/\t+/g, "")
                  .replace(/\s+/g, " ")
                  .trim()
              )
              .filter(line => line.length > 0 && line !== "." && line !== "-") || [],
          time: "N/A",
          serves: item.strServings || "N/A",
          difficulty: "N/A",
          cuisine: item.strArea || "N/A",
        };

        setSelectedRecipe(recipe);
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Could not fetch recipe.");
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      
      {/* 🔥 Sticky Header */}
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

      {/* 🔥 Scrollable Body */}
      <ScrollView
        style={styles.scrollBody}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <FeatureCards navigation={navigation} />

        <RandomRecipeCard
          selected={selectedRecipe}
          spinAndPick={spinAndPick}
          navigation={navigation}
        />

        <PopularSection navigation={navigation} />

        <RecipifyFooter />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollBody: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 40 : 60,
    paddingBottom: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    zIndex: 10,
  },

  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 40,
    overflow: "hidden",
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatar: { width: "100%", height: "100%" },

  placeholderAvatar: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },

  initial: { fontFamily: "TransformaSemiBold", fontSize: 22, color: "#444" },

  welcome: { fontSize: 22, fontFamily: "TransformaSemiBold", color: "#e11932" },

  subtext: {
    fontSize: 14,
    fontFamily: "LatoRegular",
    color: "#212121",
    marginTop: 2,
  },

  logoutButton: { paddingVertical: 6, paddingHorizontal: 12 },

  logoutText: {
    color: "#e11932",
    fontFamily: "LatoBold",
    fontSize: 14,
  },
});
