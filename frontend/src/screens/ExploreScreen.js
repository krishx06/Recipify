import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

// ---------- MEALDB SUPPORTED FILTERS ----------
const CUISINES = [
  { icon: "fast-food", label: "American" },
  { icon: "egg", label: "British" },
  { icon: "cafe", label: "Canadian" },
  { icon: "leaf", label: "Chinese" },
  { icon: "restaurant", label: "Dutch" },
  { icon: "nutrition", label: "Egyptian" },
  { icon: "wine", label: "French" },
  { icon: "ice-cream", label: "Greek" },
  { icon: "flame", label: "Indian" },
  { icon: "fish", label: "Irish" },
  { icon: "pizza", label: "Italian" },
  { icon: "fish", label: "Jamaican" },
  { icon: "fish", label: "Japanese" },
  { icon: "flame", label: "Kenyan" },
  { icon: "restaurant", label: "Malaysian" },
  { icon: "sunny", label: "Mexican" },
  { icon: "nutrition", label: "Moroccan" },
  { icon: "restaurant", label: "Russian" },
  { icon: "cafe", label: "Spanish" },
  { icon: "flame", label: "Thai" },
  { icon: "cloud", label: "Tunisian" },
  { icon: "restaurant", label: "Turkish" },
  { icon: "rainy", label: "Vietnamese" },
];

// ---------- TRENDING (TEMP) ----------
const TRENDING = [
  {
    idMeal: "1",
    title: "Garlic Butter Pasta",
    time: "20 Min",
    cuisine: "Italian",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f5a7f7b53?w=1200&q=80",
  },
  {
    idMeal: "2",
    title: "Chicken Teriyaki",
    time: "25 Min",
    cuisine: "Japanese",
    image:
      "https://images.unsplash.com/photo-1604908177522-7a8f6c41e7b6?w=1200&q=80",
  },
];

export default function ExploreScreen({ navigation }) {
  const [activeCuisine, setActiveCuisine] = useState("All");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, [activeCuisine]);

  async function fetchRecipes() {
    try {
      if (activeCuisine === "All") {
        let randomMeals = [];
        for (let i = 0; i < 8; i++) {
          const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
          const data = await res.json();
          if (data.meals?.[0]) randomMeals.push(data.meals[0]);
        }
        setRecipes(randomMeals);
        return;
      }

      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${activeCuisine}`
      );
      const data = await res.json();
      setRecipes(data?.meals?.slice(0, 12) || []);
    } catch (err) {
      console.log("Cuisine fetch error:", err);
    }
  }

  async function handleOpenRecipe(id) {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await res.json();
      if (!data.meals) return;

      const meal = data.meals[0];

      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ing && ing.trim()) ingredients.push(`${ing} - ${measure}`);
      }

      const recipe = {
        id: meal.idMeal,
        title: meal.strMeal,
        image: meal.strMealThumb,
        instructions: meal.strInstructions
          ? meal.strInstructions.split(/\r?\n/).filter(Boolean)
          : [],
        ingredients,
        cuisine: meal.strArea,
        category: meal.strCategory,
        time: "25 Min",
        serves: 2,
        difficulty: "Medium",
      };

      navigation.navigate("RecipeDetails", { recipe });
    } catch (err) {
      console.log("Meal detail fetch error:", err);
    }
  }

  // ---------------- HEADER CONTENT FOR FLATLIST ----------------
  const ListHeader = () => (
    <View>
      {/* SEARCH */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#777" />
        <TextInput
          placeholder="Search recipes, cuisines, ingredients..."
          placeholderTextColor="#999"
          style={styles.input}
        />
      </View>

      {/* CUISINES */}
      <Text style={styles.sectionTitle}>Popular Cuisines</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={[styles.chip, activeCuisine === "All" && styles.activeChip]}
          onPress={() => setActiveCuisine("All")}
        >
          <Ionicons
            name="grid"
            size={16}
            color={activeCuisine === "All" ? "#fff" : "#e11932"}
          />
          <Text
            style={[
              styles.chipText,
              activeCuisine === "All" && styles.activeChipText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>

        {CUISINES.map((item, i) => {
          const isActive = activeCuisine === item.label;
          return (
            <TouchableOpacity
              key={i}
              style={[styles.chip, isActive && styles.activeChip]}
              onPress={() => setActiveCuisine(isActive ? "All" : item.label)}
            >
              <Ionicons
                name={item.icon}
                size={16}
                color={isActive ? "#fff" : "#e11932"}
              />
              <Text style={[styles.chipText, isActive && styles.activeChipText]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* TRENDING */}
      <Text style={styles.heading}>Trending</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {TRENDING.map((item) => (
          <TouchableOpacity
            key={item.idMeal}
            onPress={() => handleOpenRecipe(item.idMeal)}
            style={styles.trendingCard}
          >
            <Image source={{ uri: item.image }} style={styles.trendingImg} />
            <Text style={styles.trendingTitle}>{item.title}</Text>
            <Text style={styles.trendingSubtitle}>{item.time}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.heading}>
        {activeCuisine === "All" ? "All Recipes" : `${activeCuisine} Recipes`}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} edges={["top", "left", "right"]}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.idMeal}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<ListHeader />}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => handleOpenRecipe(item.idMeal)}
          >
            <Image source={{ uri: item.strMealThumb }} style={styles.gridImg} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle} numberOfLines={2}>
                {item.strMeal}
              </Text>

              <View style={styles.metaRow}>
                <Ionicons name="time-outline" size={14} color="#888" />
                <Text style={styles.metaText}>25 Min</Text>

                <Ionicons
                  name="globe-outline"
                  size={14}
                  color="#888"
                  style={{ marginLeft: 10 }}
                />
                <Text style={styles.metaText}>
                  {activeCuisine === "All" ? "Mixed" : activeCuisine}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ padding: 20, paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

// ---------------- STYLES -----------------

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f3f3",
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginBottom: 12,
  },
  input: { marginLeft: 10, flex: 1, fontSize: 15, fontFamily: "LatoRegular" },

  sectionTitle: {
    fontSize: 20,
    fontFamily: "TransformaSemiBold",
    marginBottom: 10,
    color: "#111",
  },

  chip: {
    borderWidth: 1.2,
    borderColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    backgroundColor: "#fff",
  },
  chipText: { marginLeft: 6, fontSize: 14, fontFamily: "LatoRegular" },
  activeChip: { backgroundColor: "#e11932", borderColor: "#e11932" },
  activeChipText: { color: "#fff" },

  heading: {
    fontSize: 22,
    fontFamily: "TransformaSemiBold",
    marginTop: 20,
    marginBottom: 10,
    color: "#111",
  },

  trendingCard: { width: 180, marginRight: 14 },
  trendingImg: { width: "100%", height: 120, borderRadius: 16 },
  trendingTitle: {
    fontFamily: "LatoBold",
    fontSize: 16,
    marginTop: 8,
    color: "#111",
  },
  trendingSubtitle: {
    fontFamily: "LatoRegular",
    fontSize: 14,
    color: "#777",
  },

  gridCard: {
    width: "48%",
    borderRadius: 16,
    backgroundColor: "#fff",
    overflow: "hidden",
    marginBottom: 18,
    elevation: 2,
    borderColor: "#80000056",
    borderWidth: 0.5,
  },

  gridImg: { width: "100%", height: 150 },

  cardContent: { padding: 10 },
  cardTitle: {
    fontSize: 15,
    fontFamily: "LatoBold",
    lineHeight: 20,
    color: "#111",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  metaText: {
    fontSize: 12,
    fontFamily: "LatoRegular",
    color: "#666",
    marginLeft: 4,
  },
});
