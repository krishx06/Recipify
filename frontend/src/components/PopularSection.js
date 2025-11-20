import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const POPULAR = [
  {
    id: "1",
    title: "Stir-fried egg",
    time: "30 Min",
    image:
      "https://images.unsplash.com/photo-1604908177522-7a8f6c41e7b6?w=1200&q=80",
  },
  {
    id: "2",
    title: "Eggs and fruits",
    time: "30 Min",
    image:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1200&q=80",
  },
  {
    id: "3",
    title: "Stuffed Zucchini Boats",
    time: "50 Min",
    image:
      "https://images.unsplash.com/photo-1598866594230-6b4c9726f49f?w=1200&q=80",
  },
  {
    id: "4",
    title: "One-Pot Comfort Dish",
    time: "30 Min",
    image:
      "https://images.unsplash.com/photo-1528712306091-ed0763094c98?w=1200&q=80",
  },
];

export default function PopularSection({ navigation }) {
  function openRecipe(item) {
    navigation.navigate("RecipeDetails", { recipe: item });
  }

  return (
    <View style={{ marginTop: 30 }}>
      <Text style={styles.heading}>Popular</Text>

      {POPULAR.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.shadowWrapper}
          activeOpacity={0.85}
          onPress={() => openRecipe(item)}
        >
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.textWrap}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontFamily: "TransformaSemiBold",
    marginBottom: 18,
  },
  shadowWrapper: {
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    borderRadius: 18,
    marginBottom: 18,
  },
  card: { backgroundColor: "#fff", borderRadius: 18, overflow: "hidden" },
  image: { width: "100%", height: 150, resizeMode: "cover" },
  textWrap: { paddingVertical: 14, paddingHorizontal: 16 },
  title: { fontFamily: "LatoBold", fontSize: 18, color: "#111" },
  time: { fontFamily: "LatoRegular", color: "#666", fontSize: 13 },
});
