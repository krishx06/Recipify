import React from "react";
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

  const isEmpty = favorites.length === 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        style={styles.root}
      >
        {/* TITLE */}
        <Text style={styles.title}>Favorite Recipes</Text>
        <Text style={styles.subtitle}>
          {favorites.length} item{favorites.length !== 1 ? "s" : ""} bookmarked
        </Text>

        {/* EMPTY STATE */}
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

        {/* SAVED LIST */}
        {!isEmpty && (
          <View style={styles.listWrapper}>
            {favorites.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.85}
                onPress={() => navigation.navigate("RecipeDetails", { recipe: item })}
              >
                <View style={styles.b2Card}>
                  {/* ICON */}
                  <View style={styles.foodIconCircle}>
                    <Ionicons
                      name="restaurant-outline"
                      size={22}
                      color="#e11932"
                    />
                  </View>

                  {/* NAME + TIME */}
                  <View style={styles.textColumn}>
                    <Text style={styles.b2Title}>{item.title}</Text>
                    <Text style={styles.b2Time}>{item.time || "25 Min"}</Text>
                  </View>

                  {/* DELETE */}
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

        {/* YOU MAY ALSO LIKE */}
        <View style={styles.recommendBox}>
          <Text style={styles.recommendTitle}>You may also like</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              {
                id: "r1",
                name: "Veggie Stir Fry",
                img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80",
              },
              {
                id: "r2",
                name: "Avocado Toast",
                img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80",
              },
              {
                id: "r3",
                name: "Sushi Bowl",
                img: "https://images.unsplash.com/photo-1546069901-5f3f5ed9b3a4?w=1200&q=80",
              },
            ].map((rec) => (
              <View key={rec.id} style={styles.recommendCard}>
                <Image source={{ uri: rec.img }} style={styles.recImg} />
                <Text style={styles.recName}>{rec.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
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
