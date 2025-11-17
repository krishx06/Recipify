import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import googleConfig from "../config/googleConfig";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: googleConfig.iosClientId,
    androidClientId: googleConfig.androidClientId,
    webClientId: googleConfig.webClientId,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      fetchGoogleUser(authentication.accessToken);
    }
  }, [response]);

  async function fetchGoogleUser(token) {
    setLoading(true);

    try {
      const res = await fetch(
        "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const userInfo = await res.json();

      navigation.replace("MainTabs", { user: userInfo });
    } catch (err) {
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

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
        onPress={() => promptAsync()}
        disabled={!request || loading}
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
    marginBottom: 0,
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
