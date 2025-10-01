import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { fetchRandomIndianRecipes } from '../api';

export const CUISINES = [
  'North Indian',
  'South Indian', 
  'West Indian',
  'East Indian',
  'Central Indian',
  'Fusion'
];

function inferCuisine(recipe) {
  const name = (recipe?.name || '').toLowerCase();
  if (name.includes('dosa') || name.includes('idli') || name.includes('sambhar')) return 'South Indian';
  if (name.includes('biryani') || name.includes('paneer') || name.includes('butter masala')) return 'North Indian';
  if (name.includes('stir fry') || name.includes('noodles')) return 'Fusion';
  if (name.includes('spaghetti') || name.includes('soup') || name.includes('salad') || 
      name.includes('pancake') || name.includes('cookie') || name.includes('cake')) return 'Fusion';
  if (name.includes('sandwich') || name.includes('wrap') || name.includes('smoothie')) return 'Fusion';
  if (name.includes('masala') || name.includes('curry') || name.includes('dal')) return 'North Indian';
  return 'North Indian';
}

export default function CuisineFilter({ onFilterChange, showGrid = true }) {
  const [selectedCuisine, setSelectedCuisine] = React.useState('All');
  const [allRecipes, setAllRecipes] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchRandomIndianRecipes(30);
        setAllRecipes(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = React.useMemo(() => {
    let source = allRecipes;
    if (selectedCuisine === 'All') return source;
    // Heuristic mapping from cuisines array text to our main buckets
    const match = (cuisines, needles) => {
      const c = (cuisines || []).map((x) => String(x).toLowerCase());
      return needles.some((n) => c.includes(n));
    };
    switch (selectedCuisine) {
      case 'South Indian':
        return source.filter((r) => match(r.cuisines, ['south indian', 'kerala', 'karnataka', 'tamil', 'andhra', 'hyderabadi']));
      case 'West Indian':
        return source.filter((r) => match(r.cuisines, ['gujarati', 'maharashtrian', 'goan', 'konkani', 'parsi', 'west indian']));
      case 'East Indian':
        return source.filter((r) => match(r.cuisines, ['bengali', 'assamese', 'odia', 'east indian']));
      case 'Central Indian':
        return source.filter((r) => match(r.cuisines, ['central indian', 'malwi', 'bundelkhandi', 'bagheli', 'chhattisgarhi']));
      case 'Fusion':
        return source.filter((r) => match(r.cuisines, ['fusion', 'indo-chinese']));
      case 'North Indian':
      default:
        return source.filter((r) => match(r.cuisines, ['north indian', 'punjabi', 'awadhi', 'kashmiri', 'rajasthani', 'mughlai', 'indian']));
    }
  }, [selectedCuisine, allRecipes]);

  React.useEffect(() => {
    onFilterChange && onFilterChange(filtered);
  }, [filtered, onFilterChange]);

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.title}>Explore by Cuisine</Text>
      <Text variant="bodySmall" style={styles.subtitle}>
        Take a culinary journey across different regions and flavors
      </Text>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.row}
        style={styles.scrollView}
      >
        <Button
          key="All"
          mode={selectedCuisine === 'All' ? 'contained' : 'outlined'}
          onPress={() => setSelectedCuisine('All')}
          style={styles.chip}
        >
          All
        </Button>
        {CUISINES.map((c) => (
          <Button
            key={c}
            mode={selectedCuisine === c ? 'contained' : 'outlined'}
            onPress={() => setSelectedCuisine(c)}
            style={styles.chip}
          >
            {c}
          </Button>
        ))}
      </ScrollView>

      {showGrid && (
        <View style={styles.grid}>
          {filtered.map((r) => (
            <Card key={r.id} style={styles.card}>
              <Card.Cover source={{ uri: r.image }} />
              <Card.Title title={r.name} titleNumberOfLines={2} />
            </Card>
          ))}
          {filtered.length === 0 && (
            <Text style={styles.empty}>No recipes found for {selectedCuisine}</Text>
          )}
        </View>
      )}
    </View>
  );
}

const GREEN_PRIMARY = '#2E7D32';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 12,
    marginLeft: 5,
  },
  title: {
    color: GREEN_PRIMARY,
    marginBottom: 6,
  },
  subtitle: {
    color: '#6b6b6b',
    marginBottom: 12,
  },
  scrollView: {
    marginHorizontal: -18,
    marginBottom: 18,
  },
  row: {
    gap: 8,
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  chip: {
    marginRight: 0,
    borderRadius: 18,
  },
  grid: {
    marginTop: 8,
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
  },
  empty: {
    paddingVertical: 16,
    color: '#666',
  },
});


