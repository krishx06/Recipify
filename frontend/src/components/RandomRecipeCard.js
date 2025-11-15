import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

export default function RandomRecipeCard({ selected, spinAndPick }) {
  return (
    <View style={styles.card}>

      {/* LEFT — IMAGE */}
      <View style={styles.left}>
        {selected ? (
          <Image source={{ uri: selected.image }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>No recipe yet</Text>
          </View>
        )}
      </View>

      {/* RIGHT — TEXT + BUTTON */}
      <View style={styles.right}>
        <Text style={styles.category}>
          {selected ? selected.category || "Featured Dish" : "Get Started"}
        </Text>

        <Text style={styles.title}>
          {selected ? selected.title : "Tap Spin to Begin"}
        </Text>

        <TouchableOpacity style={styles.spinButton} onPress={spinAndPick}>
          <Text style={styles.spinText}>Spin</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 18,

    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 4,
    height: 180,
    marginTop: 20,
  },

  /** LEFT HALF */
  left: {
    width: "50%",
    height: "100%",
    overflow: "hidden",
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  placeholder: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
  },

  placeholderText: {
    fontFamily: "LatoRegular",
    fontSize: 14,
    color: "#666",
  },

  /** RIGHT HALF */
  right: {
    width: "50%",
    padding: 16,
    justifyContent: "space-between",
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    backgroundColor: "#fff",
  },

  category: {
    fontSize: 12,
    fontFamily: "LatoRegular",
    color: "#666",
  },

  title: {
    fontSize: 18,
    fontFamily: "TransformaSemiBold",
    color: "#111",
    lineHeight: 22,
  },

  spinButton: {
    backgroundColor: "#e11932",
    paddingVertical: 10,
    borderRadius: 10,
    width: 90,
    alignItems: "center",
  },

  spinText: {
    fontFamily: "TransformaSemiBold",
    fontSize: 16,
    color: "#fff",
  },
});
