import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';


export default function App() {
  const [fontsLoaded] = useFonts({
    TransformaBlack: require('./assets/fonts/TransformaSans_Trial-Black-BF660ca8e05d182.otf'),
    TransformaLight: require('./assets/fonts/TransformaMix_Trial-Light-BF660ca8e1ac32b.otf'),
    TransformaSemiBold: require('./assets/fonts/TransformaMix_Trial-SemiBold-BF660ca8e1a26a1.otf'),
    LatoLight: require("./assets/fonts/Lato-Light.ttf"),
    LatoRegular: require("./assets/fonts/Lato-Regular.ttf"),
    LatoBold: require("./assets/fonts/Lato-Bold.ttf"),
    LatoBlack: require("./assets/fonts/Lato-Black.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <>
      <HomeScreen />
      <StatusBar style="auto" />
    </>
  );
}
