import React, { useState } from "react";
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
import { RECIPE_DETAILS } from "../data/recipeDetails";


export default function RecipeDetailsScreen({ navigation, route }) {
  const recipe = route?.params?.recipe;

  if (!recipe) {
    return (
      <View style={styles.center}>
        <Text>No recipe found.</Text>
      </View>
    );
  }

  const [activeTab, setActiveTab] = useState("ingredients");
  const [saved, setSaved] = useState(false);

  const manual = RECIPE_DETAILS[recipe.id];

  const ingredients = manual?.ingredients || recipe.ingredients;
  const instructions = manual?.instructions || recipe.instructions;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* IMAGE */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: recipe.image }} style={styles.image} />
        </View>

        {/* TITLE */}
        <Text style={styles.title}>{recipe.title}</Text>

        {/* META */}
        <View style={styles.metaRow}>
          <Meta icon="time-outline" text={recipe.time || "30 Min"} />
          <Meta icon="people-outline" text={`Serves ${recipe.serves || 4}`} />
          <Meta icon="bar-chart-outline" text={recipe.difficulty || "Easy"} />
          <Meta icon="globe-outline" text={recipe.cuisine || "Not specified"} />
        </View>

        {/* TABS */}
        <View style={styles.tabsRow}>
          <TabButton label="Ingredients" active={activeTab === "ingredients"} onPress={() => setActiveTab("ingredients")} />
          <TabButton label="Instructions" active={activeTab === "instructions"} onPress={() => setActiveTab("instructions")} />
        </View>

        {/* CONTENT */}
        <View style={{ marginTop: 15, paddingBottom: 40 }}>
  {activeTab === "ingredients" ? (
    <IngredientsList items={ingredients || []} />
  ) : (
    <InstructionsList items={instructions || []} />
  )}
</View>


      </ScrollView>
    </View>
  );
}

const Meta = ({ icon, text }) => (
  <View style={styles.metaItem}>
    <Ionicons name={icon} size={17} color="#555" />
    <Text style={styles.metaText}>{text}</Text>
  </View>
);

const TabButton = ({ label, active, onPress }) => (
  <TouchableOpacity
    style={[styles.tab, active && styles.activeTab]}
    onPress={onPress}
  >
    <Text style={[styles.tabText, active && styles.tabTextActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const IngredientsList = ({ items }) => {
  const safeItems = Array.isArray(items) ? items : [];
  return (
    <View style={{ paddingHorizontal: 20 }}>
      {safeItems.map((item, index) => (
        <View key={index} style={styles.bulletRow}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
};

const InstructionsList = ({ items }) => {
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <View style={{ paddingHorizontal: 20 }}>
      {safeItems.map((rawStep, index) => {
        if (typeof rawStep !== "string") return null;

        const step = rawStep
          .replace(/<[^>]*>/g, "")   // remove HTML
          .replace(/\u200B/g, "")    // zero-width
          .replace(/\t+/g, "")       // tabs
          .replace(/\s+/g, " ")      // extra spaces
          .trim();

        // if after all cleaning it's empty or tiny, skip rendering
        if (!step || step.length < 3) return null;

        return (
          <View key={index} style={styles.stepCard}>
            <Text style={styles.stepNumber}>
              {String(index + 1).padStart(2, "0")}
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  imageContainer: {
    height: 320,
    width: "100%",
    overflow: "hidden",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  image: {
    height: "100%",
    width: "100%",
  },

  safeTop: {
    position: "absolute",
    width: "100%",
  },

  topButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  roundBtn: {
    height: 45,
    width: 45,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    marginTop: 18,
    paddingHorizontal: 20,
    fontFamily: "TransformaBlack",
  },

  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    paddingHorizontal: 20,
    gap: 18,
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  metaText: {
    fontSize: 14,
    color: "#666",
    fontFamily: "LatoRegular",
  },

  tabsRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 22,
    gap: 10,
  },

  tab: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "#f2f2f2",
    borderRadius: 30,
    alignItems: "center",
  },

  activeTab: {
    backgroundColor: "#e11932",
  },

  tabText: {
    fontSize: 16,
    color: "#555",
    fontFamily: "TransformaSemiBold",
  },

  tabTextActive: {
    color: "#fff",
  },

  bulletRow: {
    flexDirection: "row",
    marginBottom: 12,
  },

  bulletDot: {
    fontSize: 20,
    color: "#e11932",
    marginRight: 8,
    marginTop: -2,
  },

  bulletText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "LatoRegular",
    flex: 1,
    lineHeight: 22,
  },

  stepCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "flex-start",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  stepNumber: {
    fontSize: 18,
    color: "#e11932",
    fontFamily: "TransformaSemiBold",
    marginRight: 12,
  },

  stepText: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
    fontFamily: "LatoRegular",
  },
});
