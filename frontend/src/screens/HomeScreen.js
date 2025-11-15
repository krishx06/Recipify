import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Platform } from "react-native";
import AuthContext from "../context/AuthContext";
import RandomRecipeCard from "../components/RandomRecipeCard";
import PopularSection from "../components/PopularSection";
import FeatureCards from "../components/FeatureCards";
import RecipifyFooter from "../components/RecipifyFooter";


export default function HomeScreen() {
  const auth = useContext(AuthContext) || {};
  const user = auth.user || { name: "Friend", avatar: null };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* ========= HEADER ========= */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          {user.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.placeholderAvatar}>
              <Text style={styles.initial}>
                {user.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>

        <View>
          <Text style={styles.welcome}>Welcome {user.name.split(" ")[0]}</Text>
          <Text style={styles.subtext}>What do you want to cook today?</Text>
        </View>
      </View>

      {/* -------- RANDOM RECIPE CARD -------- */}
      <RandomRecipeCard />
      <FeatureCards />
      

      {/* -------- POPULAR SECTION -------- */}
      <PopularSection />

      <RecipifyFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 40 : 55,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    gap: 12,
  },

  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 40,
    overflow: "hidden",
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },

  avatar: {
    width: "100%",
    height: "100%",
  },

  placeholderAvatar: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },

  initial: {
    fontFamily: "TransformaSemiBold",
    fontSize: 22,
    color: "#444",
  },

  welcome: {
    fontSize: 22,
    fontFamily: "TransformaSemiBold",
    color: "#e11932"
  },

  subtext: {
    fontSize: 14,
    fontFamily: "LatoRegular",
    color: "#212121",
    marginTop: 2,
  },
});
