
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

export default function FavoritesScreen() {
  const [saved, setSaved] = useState([
    {
      id: "1",
      title: "Garlic Butter Pasta",
      time: "20 Min",
      image:
        "https://images.unsplash.com/photo-1603133872878-684f5a7f7b53?w=1200&q=80",
    },
    {
      id: "2",
      title: "Chicken Teriyaki",
      time: "25 Min",
      image:
        "https://images.unsplash.com/photo-1604908177522-7a8f6c41e7b6?w=1200&q=80",
    },
  ]);

  function removeItem(id) {
    setSaved((prev) => prev.filter((x) => x.id !== id));
  }

  const isEmpty = saved.length === 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={styles.root}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* HEADER */}
        <Text style={styles.title}>Favorite Recipes</Text>
        <Text style={styles.subtitle}>
          {saved.length} item{saved.length !== 1 ? "s" : ""} bookmarked
        </Text>

        {/* EMPTY STATE */}
        {isEmpty && (
          <View style={styles.emptyBox}>
            <Image
              source={require("../../assets/images/emptySavedImg.png")}
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
            {saved.map((item) => (
              <View key={item.id} style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />

                <View style={styles.cardContent}>
                  <Text style={styles.recipeTitle}>{item.title}</Text>
                  <Text style={styles.recipeTime}>{item.time}</Text>
                </View>

                <TouchableOpacity
                  onPress={() => removeItem(item.id)}
                  style={styles.removeBtn}
                >
                  <Ionicons name="trash-outline" size={20} color="#e11932" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* RECOMMENDED SECTION */}
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

  // EMPTY STATE UI
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

  // SAVED LIST
  listWrapper: {
    marginTop: 10,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#eee",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,

    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 90,
    height: 90,
  },

  cardContent: {
    flex: 1,
    paddingHorizontal: 14,
  },

  recipeTitle: {
    fontFamily: "LatoBold",
    fontSize: 16,
    color: "#111",
    marginBottom: 4,
  },

  recipeTime: {
    fontFamily: "LatoRegular",
    fontSize: 13,
    color: "#777",
  },

  removeBtn: {
    padding: 12,
  },

  // RECOMMEND BOX
  recommendBox: {
    marginTop: 30,
  },
  recommendTitle: {
    fontSize: 18,
    fontFamily: "TransformaSemiBold",
    color: "#111",
    marginBottom: 14,
  },

  recommendCard: {
    marginRight: 16,
    width: 140,
  },

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
