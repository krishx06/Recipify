import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const { signInWithGoogle, loading } = useAuth();

  return (
    <View style={styles.container}>

      <Text style={styles.brand}>Recipify.</Text>


      <View style={styles.header}>
        <Text style={styles.title}>Sign in to continue</Text>
        <Text style={styles.subtitle}>
          Unlock personalized recipes created for you.
        </Text>
      </View>


      <TouchableOpacity
        style={styles.googleButton}
        onPress={signInWithGoogle}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name="logo-google" size={20} color="#fff" />
            <Text style={styles.googleText}>Continue with Google</Text>
          </>
        )}
      </TouchableOpacity>


      <Text style={styles.footerText}>
        By continuing, you agree to our Terms & Privacy Policy.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  brand: {
    fontSize: 48,
    fontFamily: "TransformaBlack",
    color: "#e11932",
    textAlign: "center",
    marginBottom: 50,
    letterSpacing: 0.5,
  },

  header: {
    marginBottom: 60,
  },

  title: {
    fontSize: 32,
    fontFamily: "TransformaSemiBold",
    color: "#111",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    fontFamily: "LatoRegular",
    color: "#555",
    textAlign: "center",
    marginTop: 8,
  },

  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e11932",
    paddingVertical: 16,
    borderRadius: 14,
    gap: 10,
  },

  googleText: {
    color: "#fff",
    fontSize: 17,
    fontFamily: "LatoBold",
  },

  footerText: {
    textAlign: "center",
    color: "#777",
    fontSize: 12,
    marginTop: 20,
    fontFamily: "LatoRegular",
  },
});
