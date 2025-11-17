
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.centerContent}>
        <Text style={styles.heading}>Recipify.</Text>
        <Text style={styles.tagline}>
          Discover recipes that turn everyday ingredients into extraordinary meals.
        </Text>
      </View>

      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("Login")}  
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  heading: {
    fontSize: 42,
    fontFamily: 'TransformaBlack',
    color: '#e11932',
    marginBottom: 5,
    textAlign: 'center',
  },

  tagline: {
    fontSize: 16,
    fontFamily: 'LatoRegular',
    color: '#212121',
    textAlign: 'center',
    lineHeight: 22,
    marginHorizontal: 20,
  },

  bottomButtons: {
    width: '100%',
    paddingHorizontal: 30,
    paddingBottom: 60,
    gap: 14,
  },

  primaryButton: {
    width: '100%',
    backgroundColor: '#e11932',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'TransformaSemiBold',
  },
});
