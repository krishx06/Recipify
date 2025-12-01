import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

/* ============================================================
   🔥 SKELETON SHIMMER COMPONENT
   ============================================================ */
function Skeleton({ width, height, style }) {
  const opacityAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          backgroundColor: "#e6e6e6",
          borderRadius: 10,
          opacity: opacityAnim,
        },
        style,
      ]}
    />
  );
}

/* ============================================================
   CUISINES (Indian second)
   ============================================================ */
const CUISINES = [
  { icon: "fast-food", label: "American" },
  { icon: "flame", label: "Indian" },

  { icon: "egg", label: "British" },
  { icon: "cafe", label: "Canadian" },
  { icon: "leaf", label: "Chinese" },
  { icon: "restaurant", label: "Dutch" },
  { icon: "nutrition", label: "Egyptian" },
  { icon: "wine", label: "French" },
  { icon: "ice-cream", label: "Greek" },
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

/* ============================================================
   TRENDING
   ============================================================ */
async function fetchTrendingMeals() {
  const items = [];
  for (let i = 0; i < 5; i++) {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const data = await res.json();
    if (data.meals?.[0]) items.push(data.meals[0]);
  }
  return items;
}

/* ============================================================
   ESTIMATE COOKING TIME
   ============================================================ */
function getCookingTime(meal) {
  const map = {
    Beef: "45 Min",
    Lamb: "50 Min",
    Goat: "50 Min",
    Chicken: "35 Min",
    Seafood: "25 Min",
    Dessert: "20 Min",
    Side: "15 Min",
    Starter: "10 Min",
    Breakfast: "15 Min",
    Vegetarian: "25 Min",
  };

  if (map[meal.strCategory]) return map[meal.strCategory];

  let count = 0;
  for (let i = 1; i <= 20; i++) if (meal[`strIngredient${i}`]) count++;

  if (count <= 5) return "15 Min";
  if (count <= 10) return "25 Min";
  if (count <= 15) return "35 Min";
  return "45 Min";
}

/* ============================================================
   ESTIMATE DIFFICULTY
   ============================================================ */
function getDifficulty(meal) {
  const HARD = ["Beef", "Lamb", "Goat"];
  const EASY = ["Dessert", "Side", "Starter", "Breakfast"];

  if (HARD.includes(meal.strCategory)) return "Hard";
  if (EASY.includes(meal.strCategory)) return "Easy";

  let count = 0;
  for (let i = 1; i <= 20; i++) if (meal[`strIngredient${i}`]) count++;

  if (count <= 5) return "Easy";
  if (count <= 10) return "Medium";
  return "Hard";
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export default function ExploreScreen({ navigation }) {
  const [activeCuisine, setActiveCuisine] = useState("All");
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [trending, setTrending] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingTrending, setLoadingTrending] = useState(true);

  const scrollRef = useRef(null);

  /* LOAD TRENDING */
  useEffect(() => {
    loadTrending();
  }, []);

  async function loadTrending() {
    setLoadingTrending(true);
    const items = await fetchTrendingMeals();
    setTrending(items);
    setLoadingTrending(false);
  }

  /* FETCH RECIPES */
  useEffect(() => {
    fetchRecipes();
  }, [activeCuisine, query]);

  async function fetchRecipes() {
    setLoading(true);

    try {
      // SEARCH
      if (query.trim().length > 0) {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        );
        const data = await res.json();
        setRecipes(data.meals || []);
        setLoading(false);
        return;
      }

      // ALL RECIPES
      if (activeCuisine === "All") {
        let randomMeals = [];
        for (let i = 0; i < 8; i++) {
          const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
          const data = await res.json();
          if (data.meals?.[0]) randomMeals.push(data.meals[0]);
        }
        setRecipes(randomMeals);
        setLoading(false);
        return;
      }

      // CUISINE FILTER
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${activeCuisine}`
      );
      const data = await res.json();
      setRecipes(data?.meals?.slice(0, 12) || []);
      setLoading(false);
    } catch (err) {
      console.log("Fetch error:", err);
      setLoading(false);
    }
  }

  /* ============================================================
     OPEN RECIPE
     ============================================================ */
  async function handleOpenRecipe(id) {
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
      time: getCookingTime(meal),
      difficulty: getDifficulty(meal),
      serves: 2,
    };

    navigation.navigate("RecipeDetails", { recipe });
  }

  /* ============================================================
     HEADER
     ============================================================ */
  const ListHeader = useCallback(() => (
    <View>
      {/* SEARCH */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#777" />
        <TextInput
          placeholder="Search recipes..."
          placeholderTextColor="#999"
          style={styles.input}
          value={query}
          onChangeText={(text) => setQuery(text)}
        />
      </View>

      {/* CUISINES */}
      <Text style={styles.sectionTitle}>Popular Cuisines</Text>

      <ScrollView ref={scrollRef} horizontal showsHorizontalScrollIndicator={false}>
        {/* All */}
        <TouchableOpacity
          style={[styles.chip, activeCuisine === "All" && styles.activeChip]}
          onPress={() => {
            setActiveCuisine("All");
            setQuery("");
          }}
        >
          <Ionicons name="grid" size={16} color={activeCuisine === "All" ? "#fff" : "#e11932"} />
          <Text style={[styles.chipText, activeCuisine === "All" && styles.activeChipText]}>
            All
          </Text>
        </TouchableOpacity>

        {CUISINES.map((item, index) => {
          const isActive = activeCuisine === item.label;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.chip, isActive && styles.activeChip]}
              onPress={() => {
                setActiveCuisine(item.label);
                setQuery("");

                // scroll to selected chip
                setTimeout(() => {
                  scrollRef.current?.scrollTo({
                    x: index * 80 - 60,
                    animated: true,
                  });
                }, 50);
              }}
            >
              <Ionicons
                name={item.icon}
                size={16}
                color={isActive ? "#fff" : "#e11932"}
              />
              <Text style={[styles.chipText, isActive && styles.activeChipText]}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* TRENDING */}
      <Text style={styles.heading}>Trending</Text>

      {loadingTrending ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3, 4, 5].map((i) => (
            <View key={i} style={styles.trendingCard}>
              <Skeleton width={180} height={120} />
              <Skeleton width={150} height={18} style={{ marginTop: 10 }} />
              <Skeleton width={100} height={15} style={{ marginTop: 6 }} />
            </View>
          ))}
        </ScrollView>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {trending.map((meal) => (
            <TouchableOpacity
              key={meal.idMeal}
              style={styles.trendingCard}
              onPress={() => handleOpenRecipe(meal.idMeal)}
            >
              <Image source={{ uri: meal.strMealThumb }} style={styles.trendingImg} />
              <Text style={styles.trendingTitle}>{meal.strMeal}</Text>
              <Text style={styles.trendingSubtitle}>{getCookingTime(meal)}</Text>
              <Text style={styles.trendingSubtitle}>{getDifficulty(meal)}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* SECTION TITLE */}
      <Text style={styles.heading}>
        {query.length > 0
          ? `Results for "${query}"`
          : activeCuisine === "All"
            ? "All Recipes"
            : `${activeCuisine} Recipes`}
      </Text>
    </View>
  ), [query, activeCuisine, trending, loadingTrending]);

  /* ============================================================
     RETURN UI
     ============================================================ */
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {loading ? (
        <View style={{ padding: 20 }}>
          {/* GRID SKELETON */}
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
            {[...Array(8)].map((_, i) => (
              <View key={i} style={styles.gridCard}>
                <Skeleton width={"100%"} height={150} />
                <Skeleton width={"80%"} height={18} style={{ marginTop: 10, alignSelf: "center" }} />
                <Skeleton width={"60%"} height={15} style={{ marginTop: 6, alignSelf: "center" }} />
              </View>
            ))}
          </View>
        </View>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={ListHeader}
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
                  <Text style={styles.metaText}>{getCookingTime(item)}</Text>

                  <Ionicons
                    name="flame-outline"
                    size={14}
                    color={getDifficulty(item) === "Hard" ? "#e11932" : "#888"}
                    style={{ marginLeft: 10 }}
                  />
                  <Text style={styles.metaText}>{getDifficulty(item)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ padding: 20, paddingBottom: 20 }}
        />
      )}
    </SafeAreaView>
  );
}

/* ============================================================
   STYLES
   ============================================================ */
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
  input: {
    marginLeft: 10,
    flex: 1,
    fontSize: 15,
    fontFamily: "LatoRegular",
  },

  sectionTitle: {
    fontSize: 20,
    fontFamily: "TransformaSemiBold",
    marginBottom: 10,
    color: "#111",
  },

  chip: {
    borderWidth: 1.2,
    borderColor: "#afafaf",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    backgroundColor: "#fff",
  },
  chipText: {
    marginLeft: 6,
    fontSize: 14,
    fontFamily: "LatoRegular",
    color: "#333",
  },
  activeChip: {
    backgroundColor: "#e11932",
    borderColor: "#e11932",
  },
  activeChipText: {
    color: "#fff",
  },

  heading: {
    fontSize: 22,
    fontFamily: "TransformaSemiBold",
    marginTop: 20,
    marginBottom: 10,
    color: "#111",
  },

  trendingCard: { width: 180, marginRight: 14 },
  trendingImg: {
    width: "100%",
    height: 120,
    borderRadius: 16,
    borderColor: "#9c01019f",
    borderWidth: 0.5,
  },
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
    marginBottom: 18,
    paddingBottom: 10,
    borderColor: "#6e6e6e85",
    borderWidth: 0.5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  gridImg: { width: "100%", height: 150, borderRadius: 16 },

  cardContent: { padding: 8 },
  cardTitle: {
    fontSize: 15,
    fontFamily: "LatoBold",
    color: "#111",
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    flexWrap: "wrap",
  },
  metaText: {
    fontSize: 12,
    fontFamily: "LatoRegular",
    color: "#666",
    marginLeft: 4,
  },
});
