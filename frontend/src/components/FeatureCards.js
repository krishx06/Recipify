
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FeatureCards({ navigation }) {
  return (
    <View style={styles.wrapper}>
      

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Explore")}
      >
        <View>
          <Text style={styles.title}>Explore Recipes</Text>
          <Text style={styles.subtitle}>Browse trending recipes & categories</Text>
        </View>

        <Ionicons name="arrow-forward-circle" size={32} color="#e11932" />
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("SearchAI")}   
      >
        <View>
          <Text style={styles.title}>Search by Ingredients</Text>
          <Text style={styles.subtitle}>Tell us what you have at home</Text>
        </View>

        <Ionicons name="search-circle" size={32} color="#e11932" />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    gap: 16,
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  title: {
    fontSize: 18,
    fontFamily: "TransformaSemiBold",
    color: "#111",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    fontFamily: "LatoRegular",
    color: "#666",
  }
});
