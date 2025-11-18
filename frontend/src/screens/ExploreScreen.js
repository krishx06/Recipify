import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";


const CUISINES = [
  { icon: "flame", label: "Indian" },
  { icon: "pizza", label: "Italian" },
  { icon: "restaurant", label: "Thai" },
  { icon: "leaf", label: "Chinese" },
  { icon: "fast-food", label: "American" },
  { icon: "fish", label: "Japanese" },
  { icon: "bonfire", label: "Korean" },
  { icon: "nutrition", label: "Mediterranean" },
  { icon: "wine", label: "French" },
  { icon: "cafe", label: "Spanish" },
  { icon: "cloud", label: "Middle Eastern" },
  { icon: "rainy", label: "Vietnamese" },
  { icon: "ice-cream", label: "Greek" },
  { icon: "sunny", label: "African" },
  { icon: "egg", label: "British" },
];


const TRENDING = [
  {
    id: "1",
    title: "Garlic Butter Pasta",
    time: "20 Min",
    cuisine: "Italian",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f5a7f7b53?w=1200&q=80",
  },
  {
    id: "2",
    title: "Chicken Teriyaki",
    time: "25 Min",
    cuisine: "Japanese",
    image:
      "https://images.unsplash.com/photo-1604908177522-7a8f6c41e7b6?w=1200&q=80",
  },
];

const ALL_RECIPES = [
  ...TRENDING,
  {
    id: "3",
    title: "Veggie Stir Fry",
    time: "30 Min",
    cuisine: "Chinese",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80",
  },
  {
    id: "4",
    title: "Avocado Toast",
    time: "10 Min",
    cuisine: "American",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80",
  },
];

export default function ExploreScreen() {
  const [activeCuisine, setActiveCuisine] = useState("All");

  const filteredRecipes =
    activeCuisine === "All"
      ? ALL_RECIPES
      : ALL_RECIPES.filter((r) => r.cuisine === activeCuisine);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        

        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#777" />
          <TextInput
            placeholder="Search recipes, cuisines, ingredients..."
            placeholderTextColor="#999"
            style={styles.input}
          />
        </View>


        <View style={styles.categoryWrapper}>
          <Text style={styles.sectionTitle}>Popular Cuisines</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            

            <TouchableOpacity
              style={[
                styles.chip,
                activeCuisine === "All" && styles.activeChip,
              ]}
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

            {CUISINES.map((item, index) => {
              const isActive = activeCuisine === item.label;

              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.chip, isActive && styles.activeChip]}
                  onPress={() =>
                    setActiveCuisine(isActive ? "All" : item.label)
                  }
                >
                  <Ionicons
                    name={item.icon}
                    size={16}
                    color={isActive ? "#fff" : "#e11932"}
                  />
                  <Text
                    style={[
                      styles.chipText,
                      isActive && styles.activeChipText,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>


        <Text style={styles.heading}>Trending</Text>

        <FlatList
          horizontal
          data={TRENDING}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.recipeCard}>
              <Image source={{ uri: item.image }} style={styles.recipeImg} />
              <Text style={styles.recipeTitle}>{item.title}</Text>
              <Text style={styles.recipeTime}>{item.time}</Text>
            </View>
          )}
        />


        <Text style={styles.heading}>
          {activeCuisine === "All" ? "All Recipes" : activeCuisine + " Recipes"}
        </Text>

        <View style={styles.gridWrapper}>
          {filteredRecipes.map((item) => (
            <View key={item.id} style={styles.gridCard}>
              <Image source={{ uri: item.image }} style={styles.gridImg} />
              <Text style={styles.recipeTitle}>{item.title}</Text>
              <Text style={styles.recipeTime}>{item.time}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#fff",
  },

  heading: {
    fontSize: 21,
    fontFamily: "TransformaSemiBold",
    marginTop: 20,
    marginBottom: 10,
    color: "#111",
  },


  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f3f3",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginBottom: 12,
  },

  input: {
    marginLeft: 10,
    fontSize: 14,
    flex: 1,
    fontFamily: "LatoRegular",
  },


  sectionTitle: {
    fontSize: 20,
    fontFamily: "TransformaSemiBold",
    marginBottom: 10,
    color: "#111",
  },

  categoryWrapper: {
    marginTop: 16,
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

  chipText: {
    fontSize: 14,
    fontFamily: "LatoRegular",
    color: "#333",
    marginLeft: 6,
  },


  activeChip: {
    backgroundColor: "#e11932",
    borderColor: "#e11932",
  },

  activeChipText: {
    color: "#fff",
  },


  recipeCard: {
    width: 180,
    marginRight: 14,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },

  recipeImg: {
    width: "100%",
    height: 110,
  },

  recipeTitle: {
    fontFamily: "LatoBold",
    fontSize: 16,
    marginTop: 8,
    paddingHorizontal: 10,
    color: "#111",
  },

  recipeTime: {
    fontFamily: "LatoRegular",
    fontSize: 13,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "#777",
  },

  gridWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 60,
  },

  gridCard: {
    width: "48%",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 16,
  },

  gridImg: {
    width: "100%",
    height: 120,
  },
});
