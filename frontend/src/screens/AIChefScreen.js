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

export default function AiChefScreen() {
  const [input, setInput] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
    if (selectedCuisine === c) setSelectedCuisine(null);
    else setSelectedCuisine(c);
  }

  function toggleCategory(cat) {
    if (selectedCategory === cat) setSelectedCategory(null);
    else setSelectedCategory(cat);
  }

  function clearAll() {
    setIngredients([]);
    setInput("");
    setSelectedCuisine("Indian");
    setSelectedCategory(null);
  }

  function generateRecipes() {
    if (ingredients.length === 0) {
      Alert.alert("Add ingredients", "Please add at least one ingredient.");
      return;
    }

    Alert.alert(
      "Generate (placeholder)",
      `Ingredients: ${ingredients.join(", ")}\nCuisine: ${
        selectedCuisine || "Any"
      }\nCategory: ${selectedCategory || "Any"}`
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={styles.root}
        contentContainerStyle={{ paddingBottom: 50 }}
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
                <Ionicons name="close" size={14} color="#777" />
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
                <Text
                  style={[styles.quickText, active && styles.quickTextActive]}
                >
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
                <Text
                  style={[styles.filterText, active && styles.filterTextActive]}
                >
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
                <Text
                  style={[styles.filterText, active && styles.filterTextActive]}
                >
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
          <Text style={styles.generateText}>Generate with <Text style={styles.aiText}>Recipify AI</Text></Text>
        </TouchableOpacity>
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
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "grey",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: "center",
    gap: 6,
  },

  chipTextSelected: {
    fontFamily: "LatoRegular",
    color: "#111",
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
    fontSize: 16
  }
});
