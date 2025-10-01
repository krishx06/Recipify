import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Surface } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Home({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <Surface style={styles.header} elevation={0}>
        <Text variant="headlineMedium" style={styles.greeting}>  Hey MasterChef!👋</Text>
        <Text variant="bodyLarge" style={styles.sub}>What are we cookin' today?</Text>
      </Surface>

      <View style={styles.optionsContainer}>
        <Surface style={styles.optionCard} elevation={4}>
          <Text variant="headlineSmall" style={styles.optionTitle}>Explore Recipes</Text>
          <Text variant="bodyMedium" style={styles.optionSubtitle}>
            Browse through our collection of delicious Indian recipes
          </Text>
          <Button 
            mode="contained" 
            style={styles.optionButton} 
            onPress={() => navigation.navigate('Explore')}
            icon="compass"
          >
            Explore All Recipes
          </Button>
        </Surface>

        <Surface style={styles.optionCard} elevation={4}>
          <Text variant="headlineSmall" style={styles.optionTitle}>Ingredient-Based Search</Text>
          <Text variant="bodyMedium" style={styles.optionSubtitle}>
            Find recipes based on ingredients you have at home
          </Text>
          <Button 
            mode="contained" 
            style={styles.optionButton} 
            onPress={() => navigation.navigate('IngredientSearch')}
            icon="magnify"
          >
            Search by Ingredients
          </Button>
        </Surface>
      </View>
    </View>
  );
}

const GREEN_BG = '#EAF6E9';
const GREEN_PRIMARY = '#2E7D32';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: GREEN_BG,
  },
  header: {
    backgroundColor: 'transparent',
    marginTop: 16,
    alignItems: 'center',
  },
  greeting: {
    color: '#1b1b1b',
    fontWeight: '700',
    marginBottom: 8,
  },
  sub: {
    color: '#4d4d4d',
    textAlign: 'center',
  },
  optionsContainer: {
    flex: 1,
    marginTop: -100,
    justifyContent: 'center',
    gap: 24,
  },
  optionCard: {
    padding: 24,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  optionTitle: {
    color: GREEN_PRIMARY,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  optionSubtitle: {
    color: '#6b6b6b',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 20,
  },
  optionButton: {
    backgroundColor: GREEN_PRIMARY,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
});