import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, Card, Surface, IconButton, Chip } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { searchRecipesByIngredients } from './api';

const POPULAR_INGREDIENTS = [
  { name: 'Potato', icon: '🥔', hindi: 'आलू' },
  { name: 'Tomato', icon: '🍅', hindi: 'टमाटर' },
  { name: 'Onion', icon: '🧅', hindi: 'प्याज़' },
  { name: 'Rice', icon: '🍚', hindi: 'चावल' },
  { name: 'Chicken', icon: '🍗', hindi: 'मुर्गी' },
  { name: 'Lentils', icon: '🫘', hindi: 'दाल' },
  { name: 'Garlic', icon: '🧄', hindi: 'लहसुन' },
  { name: 'Ginger', icon: '🫚', hindi: 'अदरक' },
];

const INGREDIENT_SUGGESTIONS = [
  { name: 'Rice', icon: '🍚', hindi: 'चावल' },
  { name: 'Wheat', icon: '🌾', hindi: 'गेहूं' },
  { name: 'Barley', icon: '🌾', hindi: 'जौ' },
];

export default function IngredientSearch({ navigation }) {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const addIngredient = (ingredient) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const removeIngredient = (ingredient) => {
    setSelectedIngredients(selectedIngredients.filter(ing => ing !== ingredient));
  };

  const handleSearch = async () => {
    setHasSearched(true);
    try {
      const data = await searchRecipesByIngredients(selectedIngredients, 20);
      setFilteredRecipes(data);
    } catch (e) {
      setFilteredRecipes([]);
    }
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
          <Text variant="headlineMedium" style={styles.title}>What's in your kitchen?</Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Add ingredients and we'll find perfect recipes for you
          </Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBarContainer}>
          <TextInput
            mode="outlined"
            placeholder="Type ingredients... e.g., 'आलू' or 'Potato'"
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              setShowSuggestions(text.length > 0);
            }}
            style={styles.searchInput}
            left={<TextInput.Icon icon="magnify" />}
            right={
              <View style={styles.searchRight}>
                <TextInput.Icon icon="microphone" />
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={() => {
                    if (searchQuery.trim()) {
                      addIngredient(searchQuery.trim());
                    }
                  }}
                >
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            }
          />
        </View>

        {showSuggestions && (
          <View style={styles.suggestionBox}>
            {INGREDIENT_SUGGESTIONS
              .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((item, index) => (
                <TouchableOpacity 
                  key={index}
                  style={styles.suggestionItem}
                  onPress={() => addIngredient(item.name)}
                >
                  <Text style={styles.suggestionIcon}>{item.icon}</Text>
                  <View style={styles.suggestionText}>
                    <Text style={styles.suggestionName}>{item.name}</Text>
                    <Text style={styles.suggestionHindi}>{item.hindi}</Text>
                  </View>
                </TouchableOpacity>
              ))
            }
          </View>
        )}

        {selectedIngredients.length > 0 && (
          <View style={styles.selectedContainer}>
            {selectedIngredients.map((ingredient, index) => (
              <Chip
                key={index}
                style={styles.selectedChip}
                onClose={() => removeIngredient(ingredient)}
                closeIcon="close"
              >
                {ingredient}
              </Chip>
            ))}
          </View>
        )}

        <View style={styles.popularSection}>
          <Text variant="titleMedium" style={styles.popularTitle}>Popular ingredients:</Text>
          <View style={styles.popularGrid}>
            {POPULAR_INGREDIENTS.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.popularItem}
                onPress={() => addIngredient(item.name)}
              >
                <Text style={styles.popularIcon}>{item.icon}</Text>
                <Text style={styles.popularName}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Button 
          mode="contained" 
          style={styles.findButton}
          onPress={handleSearch}
          disabled={selectedIngredients.length === 0}
          icon="star"
        >
          Find {filteredRecipes.length} Recipes
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
    marginLeft: -24,
    alignItems: 'center',
  },
  title: {
    color: GREEN_PRIMARY,
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
  searchBarContainer: {
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: '#ffffff',
  },
  searchRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addButton: {
    backgroundColor: GREEN_PRIMARY,
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  suggestionBox: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  suggestionIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  suggestionText: {
    flex: 1,
  },
  suggestionName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1b1b1b',
  },
  suggestionHindi: {
    fontSize: 14,
    color: '#6b6b6b',
  },
  selectedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  selectedChip: {
    backgroundColor: GREEN_PRIMARY,
  },
  popularSection: {
    marginBottom: 20,
  },
  popularTitle: {
    color: '#1b1b1b',
    fontWeight: '600',
    marginBottom: 12,
  },
  popularGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  popularItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    minWidth: 80,
  },
  popularIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  popularName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1b1b1b',
    textAlign: 'center',
  },
  findButton: {
    backgroundColor: GREEN_PRIMARY,
    borderRadius: 25,
    paddingVertical: 8,
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
