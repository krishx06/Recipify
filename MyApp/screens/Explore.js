import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Text, Card, Button, Surface, IconButton, Searchbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CuisineFilter from './components/CuisineFilter';
import { fetchRandomIndianRecipes } from './api';

export default function Explore({ navigation }) {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [cuisineFilteredRecipes, setCuisineFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await fetchRandomIndianRecipes(20);
        setCuisineFilteredRecipes(data);
      } catch (e) {
        setError('Failed to load recipes.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredRecipes = useMemo(() => {
    let filtered = cuisineFilteredRecipes || [];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((recipe) => {
        const name = (recipe.name || '').toLowerCase();
        const cuisinesText = (recipe.cuisines || []).join(' ').toLowerCase();
        return name.includes(query) || cuisinesText.includes(query);
      });
    }

    return filtered;
  }, [searchQuery, cuisineFilteredRecipes]);

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
          See Recipe
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
          <Text variant="headlineMedium" style={styles.title}>Explore Recipes</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          {loading ? 'Loading recipes...' : `Discover ${filteredRecipes.length} delicious Indian recipes`}
        </Text>
        </View>
      </View>

      <Searchbar
        placeholder="Search any recipe..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchBar}
      />

      <CuisineFilter 
        onFilterChange={setCuisineFilteredRecipes}
        showGrid={false}
      />

      {error ? (
        <Text style={{ textAlign: 'center', color: 'red', padding: 16 }}>{error}</Text>
      ) : null}

      <FlatList
        data={filteredRecipes}
        renderItem={renderRecipe}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
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
    color: '#1b1b1b',
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#4d4d4d',
    textAlign: 'center',
  },
  searchBar: {
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  listContainer: {
    paddingHorizontal: 16,
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
});
