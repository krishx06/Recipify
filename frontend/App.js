import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

import RootNavigator from "./src/navigation/RootNavigator";
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    TransformaBlack: require("./src/assets/fonts/TransformaSans_Trial-Black-BF660ca8e05d182.otf"),
    TransformaLight: require("./src/assets/fonts/TransformaMix_Trial-Light-BF660ca8e1ac32b.otf"),
    TransformaSemiBold: require("./src/assets/fonts/TransformaMix_Trial-SemiBold-BF660ca8e1a26a1.otf"),
    LatoLight: require("./src/assets/fonts/Lato-Light.ttf"),
    LatoRegular: require("./src/assets/fonts/Lato-Regular.ttf"),
    LatoBold: require("./src/assets/fonts/Lato-Bold.ttf"),
    LatoBlack: require("./src/assets/fonts/Lato-Black.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
        <StatusBar style="dark" />
      </NavigationContainer>
    </AuthProvider>
  );
}
