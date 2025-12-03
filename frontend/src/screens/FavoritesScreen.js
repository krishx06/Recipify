import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { useFavorites } from "../context/FavoritesContext";

export default function FavoritesScreen({ navigation }) {
  const { favorites, removeFavorite } = useFavorites();
  const [recommendations, setRecommendations] = useState([]);
  const [loadingRecs, setLoadingRecs] = useState(false);

  const isEmpty = favorites.length === 0;

  useEffect(() => {
    if (favorites.length > 0) {
      fetchRecommendations();
    } else {
      setRecommendations([]);
    }
  }, [favorites]);

  async function fetchRecommendations() {
    const cuisineCounts = {};
    favorites.forEach((fav) => {
      if (fav.cuisine) {
        cuisineCounts[fav.cuisine] = (cuisineCounts[fav.cuisine] || 0) + 1;
      }
    });

    let topCuisine = "All";
    let maxCount = 0;

    Object.entries(cuisineCounts).forEach(([cuisine, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topCuisine = cuisine;
      }
    });

    if (topCuisine === "Mixed" || !topCuisine) topCuisine = "Italian"; // Default to Italian for better results

    try {
      setLoadingRecs(true);
      let url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${topCuisine}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.meals) {
        const favIds = new Set(favorites.map(f => f.id));
        const filtered = data.meals.filter(m => !favIds.has(m.idMeal));

        const mapped = filtered.map(m => ({
          id: m.idMeal,
          title: m.strMeal,
          image: m.strMealThumb,
        }));

        setRecommendations(mapped.slice(0, 5));
      }
      setLoadingRecs(false);
    } catch (err) {
      console.log("Error fetching recommendations:", err);
      setLoadingRecs(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        style={styles.root}
      >
        <Text style={styles.title}>Favorite Recipes</Text>
        <Text style={styles.subtitle}>
          {favorites.length} item{favorites.length !== 1 ? "s" : ""} bookmarked
        </Text>

        {isEmpty && (
          <View style={styles.emptyBox}>
            <Image
              source={require("../assets/images/emptySavedImg.png")}
              style={styles.emptyImg}
            />
            <Text style={styles.emptyTitle}>No saved recipes yet</Text>
            <Text style={styles.emptyDesc}>
              Bookmark recipes to easily access them later.
            </Text>
          </View>
        )}

        {!isEmpty && (
          <View style={styles.listWrapper}>
            {favorites.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.85}
                onPress={() => navigation.navigate("RecipeDetails", { recipe: item })}
              >
                <View style={styles.b2Card}>
                  <View style={styles.foodIconCircle}>
                    <Ionicons
                      name="restaurant-outline"
                      size={22}
                      color="#e11932"
                    />
                  </View>

                  <View style={styles.textColumn}>
                    <Text style={styles.b2Title}>{item.title}</Text>
                    <Text style={styles.b2Time}>{item.time || "25 Min"}</Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => removeFavorite(item.id)}
                    style={styles.deleteWrapper}
                  >
                    <Ionicons name="trash-outline" size={20} color="#e11932" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {!isEmpty && recommendations.length > 0 && (
          <View style={styles.recommendBox}>
            <Text style={styles.recommendTitle}>You may also like</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {recommendations.map((rec) => (
                <TouchableOpacity
                  key={rec.id}
                  style={styles.recommendCard}
                  onPress={() => navigation.navigate("RecipeDetails", { recipe: rec })}
                >
                  <Image source={{ uri: rec.image }} style={styles.recImg} />
                  <Text style={styles.recName} numberOfLines={2}>{rec.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  title: {
    fontSize: 26,
    fontFamily: "TransformaSemiBold",
    color: "#e11932",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    fontFamily: "LatoRegular",
    color: "#666",
    marginBottom: 18,
  },

  emptyBox: {
    marginTop: 60,
    alignItems: "center",
  },
  emptyImg: {
    width: 150,
    height: 150,
    opacity: 0.9,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: "TransformaSemiBold",
    color: "#e11932",
    marginBottom: 6,
  },
  emptyDesc: {
    fontSize: 14,
    fontFamily: "LatoRegular",
    color: "#444",
    textAlign: "center",
    paddingHorizontal: 20,
  },

  listWrapper: { marginTop: 10 },

  b2Card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  foodIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 46,
    backgroundColor: "#ffe6e9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  textColumn: { flex: 1 },

  b2Title: {
    fontFamily: "LatoBold",
    fontSize: 16,
    color: "#111",
  },

  b2Time: {
    fontFamily: "LatoRegular",
    marginTop: 2,
    fontSize: 13,
    color: "#777",
  },

  deleteWrapper: { padding: 6 },

  recommendBox: {
    marginTop: 32,
  },

  recommendTitle: {
    fontSize: 18,
    fontFamily: "TransformaSemiBold",
    color: "#111",
    marginBottom: 14,
  },

  recommendCard: { marginRight: 16, width: 140 },

  recImg: {
    width: "100%",
    height: 110,
    borderRadius: 12,
  },

  recName: {
    fontFamily: "LatoRegular",
    fontSize: 14,
    color: "#222",
    marginTop: 8,
  },
});
