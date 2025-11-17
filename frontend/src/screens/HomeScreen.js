
import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";

import AuthContext from "../context/AuthContext";
import RandomRecipeCard from "../components/RandomRecipeCard";
import PopularSection from "../components/PopularSection";
import FeatureCards from "../components/FeatureCards";
import RecipifyFooter from "../components/RecipifyFooter";

export default function HomeScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext) || {
    user: { name: "Friend", avatar: null },
    logout: () => {},
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 80 }}
      showsVerticalScrollIndicator={false}
    >

      <View style={styles.header}>

        <View style={styles.avatarContainer}>
          {user?.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.placeholderAvatar}>
              <Text style={styles.initial}>
                {user?.name?.charAt(0)?.toUpperCase() || "F"}
              </Text>
            </View>
          )}
        </View>


        <View style={{ flex: 1 }}>
          <Text style={styles.welcome}>
            Welcome {user?.name?.split(" ")[0] || "Friend"}
          </Text>
          <Text style={styles.subtext}>What do you want to cook today?</Text>
        </View>


        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>


      <FeatureCards navigation={navigation} />


      <RandomRecipeCard />


      <PopularSection />


      <RecipifyFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 40 : 60,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
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
    color: "#e11932",
  },

  subtext: {
    fontSize: 14,
    fontFamily: "LatoRegular",
    color: "#212121",
    marginTop: 2,
  },

  logoutButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  logoutText: {
    color: "#e11932",
    fontFamily: "LatoBold",
    fontSize: 14,
  },
});

