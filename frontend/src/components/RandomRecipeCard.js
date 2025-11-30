import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import LottieView from "lottie-react-native";

export default function RandomRecipeCard({ selected, spinAndPick, navigation }) {
  return (
    <View style={styles.card}>
      
      {/* LEFT SIDE (IMAGE OR LOTTIE) */}
      <View style={styles.left}>
        {!selected ? (
          <LottieView
            source={require("../assets/lottie/foodprep.json")}
            autoPlay
            loop
            style={styles.lottie}
          />
        ) : (
          <Image
            source={{ uri: selected.image }}
            style={styles.image}
          />
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
          {/* SPIN BUTTON */}
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#e11932" }]}
            onPress={spinAndPick}
          >
            <Text style={styles.btnText}>Spin</Text>
          </TouchableOpacity>

          {/* VIEW BUTTON - ONLY IF RECIPE SELECTED */}
          {selected && (
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "#333" }]}
              onPress={() =>
                navigation.navigate("RecipeDetails", { recipe: selected })
              }
            >
              <Text style={styles.btnText}>View</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },

  lottie: {
    width: 140,
    height: 140,
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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
    marginTop: 4,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
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


