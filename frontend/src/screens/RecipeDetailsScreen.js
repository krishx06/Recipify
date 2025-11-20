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

const DEMO_RECIPE = {
  id: "demo-1",
  title: "Methi Palak Sabzi",
  image:
    "https://images.unsplash.com/photo-1543332164-8f4a5b6c8a6a?w=1400&q=80",
  time: "15 mins",
  serves: 4,
  difficulty: "Easy",
  cuisine: "Indian",
  ingredients: [
    "1 bunch methi leaves, chopped",
    "1 bunch palak leaves, chopped",
    "1 onion, finely chopped",
    "1 tomato, finely chopped",
    "1 green chili, finely chopped",
    "1 tsp ginger-garlic paste",
    "1/2 tsp turmeric powder",
    "1 tsp red chili powder",
    "1/2 tsp coriander powder",
    "1/4 tsp garam masala",
    "2 tbsp oil",
    "Salt to taste",
  ],
  instructions: [
    "Heat oil in a pan. Add onion and sauté until golden.",
    "Add ginger-garlic paste and green chili.",
    "Add tomatoes and cook until soft.",
    "Add dry spices and sauté.",
    "Add methi & palak and cook.",
    "Add salt and garam masala and finish.",
    "Serve hot with roti or rice.",
  ],
};

export default function RecipeDetailsScreen({ navigation, route }) {
  const incoming = route?.params?.recipe ?? {};

  const recipe = {
    ...DEMO_RECIPE,
    ...incoming,
    ingredients: incoming.ingredients ?? DEMO_RECIPE.ingredients,
    instructions: incoming.instructions ?? DEMO_RECIPE.instructions,
    serves: incoming.serves ?? DEMO_RECIPE.serves,
    difficulty: incoming.difficulty ?? DEMO_RECIPE.difficulty,
    cuisine: incoming.cuisine ?? DEMO_RECIPE.cuisine,
  };

  const [activeTab, setActiveTab] = useState("ingredients");
  const [saved, setSaved] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: recipe.image }} style={styles.image} />

          <SafeAreaView style={styles.safeTop}>
            <View style={styles.topButtons}>
              <TouchableOpacity
                onPress={() =>
                  navigation.canGoBack()
                    ? navigation.goBack()
                    : navigation.navigate("Home")
                }
                style={styles.roundBtn}
              >
                <Ionicons name="arrow-back" size={22} color="#e11932" />
              </TouchableOpacity>

              <View style={{ flexDirection: "row", gap: 12 }}>
                <TouchableOpacity style={styles.roundBtn}>
                  <Ionicons name="share-outline" size={22} color="#e11932" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.roundBtn}
                  onPress={() => setSaved(!saved)}
                >
                  <Ionicons
                    name={saved ? "bookmark" : "bookmark-outline"}
                    size={22}
                    color="#e11932"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </View>

        <Text style={styles.title}>{recipe.title}</Text>

        <View style={styles.metaRow}>
          <Meta icon="time-outline" text={recipe.time} />
          <Meta icon="people-outline" text={`Serves ${recipe.serves}`} />
          <Meta icon="bar-chart-outline" text={recipe.difficulty} />
          <Meta icon="globe-outline" text={recipe.cuisine} />
        </View>

        <View style={styles.tabsRow}>
          <TabButton
            label="Ingredients"
            active={activeTab === "ingredients"}
            onPress={() => setActiveTab("ingredients")}
          />

          <TabButton
            label="Instructions"
            active={activeTab === "instructions"}
            onPress={() => setActiveTab("instructions")}
          />
        </View>

        <View style={{ marginTop: 15, paddingBottom: 40 }}>
          {activeTab === "ingredients" ? (
            <IngredientsList items={recipe.ingredients} />
          ) : (
            <InstructionsList items={recipe.instructions} />
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
      {safeItems.map((step, index) => (
        <View key={index} style={styles.stepCard}>
          <Text style={styles.stepNumber}>
            {String(index + 1).padStart(2, "0")}
          </Text>

          <View style={{ flex: 1 }}>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        </View>
      ))}
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
