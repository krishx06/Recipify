import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Keyboard,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const QUICK_INGREDIENTS = [
  "Chicken",
  "Rice",
  "Paneer",
  "Potato",
  "Tomato",
  "Onion",
  "Garlic",
  "Yogurt",
  "Basil",
  "Coriander",
];

const CUISINES = [
  "Indian",
  "Italian",
  "Thai",
  "Chinese",
  "American",
  "Mexican",
  "Japanese",
  "Mediterranean",
];

const RECIPE_CATEGORIES = ["Breakfast", "Brunch", "Lunch", "Dinner", "Snack"];

export default function AiChefScreen({ navigation }) {
  const [input, setInput] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);

  function addIngredientFromInput() {
    const trimmed = input.trim();
    if (!trimmed) return;

    if (ingredients.includes(trimmed)) {
      setInput("");
      return;
    }

    setIngredients((s) => [trimmed, ...s]);
    setInput("");
    Keyboard.dismiss();
  }

  function toggleQuickIngredient(item) {
    if (ingredients.includes(item)) {
      setIngredients((s) => s.filter((x) => x !== item));
    } else {
      setIngredients((s) => [item, ...s]);
    }
  }

  function removeIngredient(item) {
    setIngredients((s) => s.filter((x) => x !== item));
  }

  function toggleCuisine(c) {
    setSelectedCuisine((prev) => (prev === c ? null : c));
  }

  function toggleCategory(cat) {
    setSelectedCategory((prev) => (prev === cat ? null : cat));
  }

  function clearAll() {
    setIngredients([]);
    setInput("");
    setSelectedCuisine(null);
    setSelectedCategory(null);
    setRecipes([]);
  }

  async function generateRecipes() {
    if (ingredients.length === 0) {
      Alert.alert("Add ingredients", "Please add at least one ingredient.");
      return;
    }

    try {
      setLoading(true);
      setRecipes([]);

      const res = await fetch("http://localhost:5001/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients,
          cuisine: selectedCuisine,
          mealType: selectedCategory,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!data.recipes) {
        Alert.alert("Error", "AI did not return recipes.");
        return;
      }

      setRecipes(data.recipes);
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Something went wrong while generating recipes.");
      console.log("AI Error:", error);
    }
  }

  const handleOpenRecipe = (recipe) => {
    const formattedRecipe = {
      id: Math.random().toString(),
      title: recipe.title,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
      time: recipe.time,
      serves: recipe.servings,
      difficulty: recipe.difficulty,
      cuisine: "AI Generated",
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
    };
    navigation.navigate("RecipeDetails", { recipe: formattedRecipe });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Modal transparent visible={loading}>
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#e11932" />
          <Text style={styles.loadingText}>Cooking up ideas...</Text>
        </View>
      </Modal>

      <ScrollView
        style={styles.root}
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.question}>What ingredients do you have?</Text>

        <View style={styles.inputRow}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Enter ingredient (chicken, rice, paneer...)"
            placeholderTextColor="#9aa0a6"
            style={styles.input}
            returnKeyType="done"
            onSubmitEditing={addIngredientFromInput}
          />
          <TouchableOpacity style={styles.addBtn} onPress={addIngredientFromInput}>
            <Ionicons name="add" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.rowWrap}>
          {ingredients.map((it) => (
            <View key={it} style={styles.chipSelected}>
              <Text style={styles.chipTextSelected}>{it}</Text>
              <TouchableOpacity onPress={() => removeIngredient(it)}>
                <Ionicons name="close" size={14} color="#ff0404ff" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Quick add common ingredients</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {QUICK_INGREDIENTS.map((it) => {
            const active = ingredients.includes(it);
            return (
              <TouchableOpacity
                key={it}
                style={[styles.quickChip, active && styles.quickChipActive]}
                onPress={() => toggleQuickIngredient(it)}
              >
                <Text style={[styles.quickText, active && styles.quickTextActive]}>
                  {it}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={styles.filterHeading}>Cuisine</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CUISINES.map((c) => {
            const active = selectedCuisine === c;
            return (
              <TouchableOpacity
                key={c}
                style={[styles.filterChip, active && styles.filterChipActive]}
                onPress={() => toggleCuisine(c)}
              >
                <Text style={[styles.filterText, active && styles.filterTextActive]}>
                  {c}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={styles.filterHeading}>Meal Type</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {RECIPE_CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.filterChip, active && styles.filterChipActive]}
                onPress={() => toggleCategory(cat)}
              >
                <Text style={[styles.filterText, active && styles.filterTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <TouchableOpacity style={styles.clearBtn} onPress={clearAll}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.generateBtn} onPress={generateRecipes}>
          <Ionicons
            name="sparkles"
            size={17}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.generateText}>
            Generate with <Text style={styles.aiText}>Recipify AI</Text>
          </Text>
        </TouchableOpacity>

        {recipes.length > 0 && (
          <View style={{ marginTop: 30 }}>
            <Text style={styles.resultsHeading}>AI Suggestions</Text>
            {recipes.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => handleOpenRecipe(item)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.type === "strict" ? "STRICT" : "CREATIVE"}</Text>
                  </View>
                  <Ionicons name="sparkles-outline" size={20} color="#ff0e2aff" />
                </View>

                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description} numberOfLines={2}>{item.description}</Text>

                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <Ionicons name="time-outline" size={14} color="#666" />
                    <Text style={styles.metaText}>{item.time}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="bar-chart-outline" size={14} color="#666" />
                    <Text style={styles.metaText}>{item.difficulty}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
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
    paddingTop: 30,
  },

  loadingOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    color: "#fff",
    fontFamily: "LatoBold",
    fontSize: 16,
  },

  question: {
    fontSize: 22,
    fontFamily: "TransformaSemiBold",
    marginBottom: 16,
    color: "#111",
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "grey",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    fontFamily: "LatoRegular",
    backgroundColor: "#fff",
  },

  addBtn: {
    marginLeft: 10,
    backgroundColor: "#e11932",
    padding: 12,
    borderRadius: 12,
  },

  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14,
  },

  chipSelected: {
    flexDirection: "row",
    backgroundColor: "#ffdbdbff",
    borderWidth: 0.5,
    borderColor: "#dc1414ff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: "center",
    gap: 6,
  },

  chipTextSelected: {
    fontFamily: "LatoRegular",
    color: "#ff0707ff",
  },

  sectionTitle: {
    marginTop: 20,
    marginBottom: 8,
    fontFamily: "TransformaSemiBold",
    color: "#333",
  },

  quickChip: {
    borderWidth: 1,
    borderColor: "#bbb",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 12,
  },

  quickChipActive: {
    backgroundColor: "#e11932",
    borderColor: "#e11932",
  },

  quickText: { fontFamily: "LatoRegular", color: "#333" },
  quickTextActive: { color: "#fff", fontFamily: "LatoBold" },

  filterHeading: {
    marginTop: 22,
    marginBottom: 10,
    fontSize: 15,
    fontFamily: "TransformaSemiBold",
    color: "#333",
  },

  filterChip: {
    borderWidth: 1,
    borderColor: "#bbb",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 22,
    marginRight: 10,
  },

  filterChipActive: {
    backgroundColor: "#e11932",
    borderColor: "#e11932",
  },

  filterText: {
    fontFamily: "LatoRegular",
    color: "#333",
  },

  filterTextActive: {
    color: "#fff",
    fontFamily: "LatoBold",
  },

  clearBtn: {
    marginTop: 30,
    borderWidth: 1.5,
    borderColor: "#ddd",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  clearText: {
    fontSize: 16,
    fontFamily: "LatoRegular",
    color: "#333",
  },

  generateBtn: {
    marginTop: 16,
    backgroundColor: "#e11932",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  generateText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "LatoBold",
  },

  aiText: {
    fontFamily: "TransformaSemiBold",
    fontSize: 16,
  },

  resultsHeading: {
    fontSize: 20,
    fontFamily: "TransformaSemiBold",
    color: "#111",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  badge: {
    backgroundColor: "#ffebee",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: "#e11932",
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: "row",
    gap: 15,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
});
