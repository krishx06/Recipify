import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

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

export default function PopularSection() {
  return (
    <View style={{ marginTop: 30 }}>
      <Text style={styles.heading}>Popular</Text>

      {POPULAR.map((item) => (
        <View key={item.id} style={styles.shadowWrapper}>
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.textWrap}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        </View>
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

  /** SHADOW FIX */
  shadowWrapper: {
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4, // Android
    borderRadius: 18,
    marginBottom: 18,
    backgroundColor: "transparent",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden", // keeps card clean but shadow still works due to wrapper
  },

  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },

  textWrap: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },

  title: {
    fontFamily: "LatoBold",
    fontSize: 18,
    color: "#111",
    marginBottom: 4,
  },

  time: {
    fontFamily: "LatoRegular",
    color: "#666",
    fontSize: 13,
  },
});
