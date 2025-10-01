import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Text, TextInput, Button, Card, Surface, IconButton } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import sampleRecipes from './sampleRecipes';

export default function IngredientSearch({ navigation }) {
  const insets = useSafeAreaInsets();
  const [ingredients, setIngredients] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const filteredRecipes = useMemo(() => {
    if (!ingredients.trim()) return [];
    
    const searchTerms = ingredients
      .split(',')
      .map(term => term.trim().toLowerCase())
      .filter(term => term.length > 0);

    if (searchTerms.length === 0) return [];

    return sampleRecipes.filter(recipe => {
      const recipeIngredients = recipe.ingredients.map(ing => ing.toLowerCase());
      return searchTerms.every(term => 
        recipeIngredients.some(ing => ing.includes(term))
      );
    });
  }, [ingredients]);

  const handleSearch = () => {
    setHasSearched(true);
  };

  const renderRecipe = ({ item }) => (
    <Card style={styles.recipeCard} mode="elevated">
      <Card.Cover source={{ uri: item.image }} style={styles.recipeImage} />
      <Card.Title title={item.name} titleNumberOfLines={2} />
      <Card.Content>
        <Text variant="bodySmall" style={styles.category}>{item.category}</Text>
        <Text variant="bodySmall" style={styles.servings}>Serves: {item.servings}</Text>
        <Button 
          mode="contained" 
          style={styles.seeProcessButton}
          onPress={() => {

            console.log('See process for:', item.name);
          }}
        >
          See Process
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <View style={styles.topBar}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        <View style={styles.headerContent}>
          <Text variant="headlineMedium" style={styles.title}>Ingredient Search</Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Enter ingredients separated by commas
          </Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          mode="outlined"
          label="Ingredients"
          placeholder="e.g., chicken, rice, onion, garlic"
          value={ingredients}
          onChangeText={setIngredients}
          style={styles.searchInput}
          multiline
        />
        <Button 
          mode="contained" 
          style={styles.searchButton}
          onPress={handleSearch}
          disabled={!ingredients.trim()}
        >
          Search Recipes
        </Button>
      </View>

      {hasSearched && (
        <View style={styles.resultsContainer}>
          <Text variant="titleMedium" style={styles.resultsTitle}>
            {filteredRecipes.length} recipe(s) found
          </Text>
          
          {filteredRecipes.length > 0 ? (
            <FlatList
              data={filteredRecipes}
              renderItem={renderRecipe}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={styles.row}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.noResults}>
              <Text variant="bodyLarge" style={styles.noResultsText}>
                No recipes found with those ingredients
              </Text>
              <Text variant="bodyMedium" style={styles.noResultsSubtext}>
                Try different ingredients or check spelling
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const GREEN_BG = '#EAF6E9';
const GREEN_PRIMARY = '#2E7D32';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GREEN_BG,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 8,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: '#1b1b1b',
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#4d4d4d',
    textAlign: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#ffffff',
    marginBottom: 16,
  },
  searchButton: {
    backgroundColor: GREEN_PRIMARY,
    borderRadius: 25,
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  resultsTitle: {
    color: GREEN_PRIMARY,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  recipeCard: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  recipeImage: {
    height: 120,
    backgroundColor: '#f1f1f1',
  },
  category: {
    color: GREEN_PRIMARY,
    fontWeight: '600',
    marginBottom: 4,
  },
  servings: {
    color: '#6b6b6b',
    marginBottom: 12,
  },
  seeProcessButton: {
    backgroundColor: GREEN_PRIMARY,
    borderRadius: 20,
  },
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  noResultsText: {
    color: '#6b6b6b',
    textAlign: 'center',
    marginBottom: 8,
  },
  noResultsSubtext: {
    color: '#9b9b9b',
    textAlign: 'center',
  },
});
