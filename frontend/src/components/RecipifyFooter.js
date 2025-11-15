// frontend/src/components/RecipifyFooter.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RecipifyFooter() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>
        Developed with{" "}
        <Ionicons name="heart" size={14} color="#e11932" /> by Krish
      </Text>

      <Text style={styles.copy}>© 2025 Recipify</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },

  text: {
    fontSize: 14,
    color: "#212121",
    fontFamily: "TransformaSemiBold",
  },

  copy: {
    marginTop: 4,
    fontSize: 12,
    color: "#212121",
    fontFamily: "LatoRegular",
  },
});
