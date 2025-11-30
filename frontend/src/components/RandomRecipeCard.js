import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function RandomRecipeCard({ selected, spinAndPick, navigation }) {
  return (
    <View style={styles.card}>
      {/* LEFT SIDE IMAGE OR PLACEHOLDER */}
      <View style={styles.left}>
        {selected ? (
          <Image source={{ uri: selected.image }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>No recipe yet</Text>
          </View>
        )}
      </View>

      {/* RIGHT SIDE TEXT + BUTTONS */}
      <View style={styles.right}>
        <Text style={styles.category}>
          {selected ? selected.category : "Get Started"}
        </Text>

        <Text style={styles.title} numberOfLines={2}>
          {selected ? selected.title : "Tap Spin to get a recipe"}
        </Text>

        <View style={styles.buttonRow}>
          {/* SPIN AGAIN BUTTON — ALWAYS VISIBLE */}
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#e11932" }]}
            onPress={spinAndPick}
          >
            <Text style={styles.btnText}>Spin</Text>
          </TouchableOpacity>

          {/* VIEW BUTTON — ONLY WHEN RECIPE EXISTS */}
          {selected && (
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "#333" }]}
              onPress={() =>
                navigation.navigate("RecipeDetails", { recipe: selected })
              }
            >
              <Text style={[styles.btnText, { color: "#fff" }]}>
                View
              </Text>
            </TouchableOpacity>
          )}
        </View>
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
    height: 190,
    marginTop: 20,
    overflow: "hidden",
    borderColor: "#7f000090",
    borderWidth: 0.5,
  },

  left: {
    width: "50%",
    height: "100%",
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

  right: {
    width: "50%",
    padding: 16,
    justifyContent: "space-between",
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

  buttonRow: {
    flexDirection: "row",
    gap: 10,
  },

  btn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignItems: "center",
  },

  btnText: {
    fontFamily: "LatoBold",
    fontSize: 16,
    color: "#fff",
  },
});
