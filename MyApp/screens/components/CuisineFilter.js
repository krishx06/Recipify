import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import sampleRecipes from '../sampleRecipes';

export const CUISINES = {
  'North Indian': ['Punjabi', 'Awadhi', 'Kashmiri', 'Rajasthani', 'Mughlai'],
  'South Indian': ['Tamil', 'Andhra', 'Kerala', 'Karnataka', 'Hyderabadi'],
  'West Indian': ['Gujarati', 'Maharashtrian', 'Goan', 'Konkani', 'Parsi'],
  'East Indian': ['Bengali', 'Assamese', 'Odia', 'Manipuri', 'Sikkimese'],
  'Central Indian': ['Malwi', 'Bundelkhandi', 'Bagheli', 'Chhattisgarhi'],
  Fusion: ['Indo-Chinese', 'Indo-Italian', 'Indo-Thai', 'Street Fusion', 'Continental'],
};

function inferSubCuisine(recipe) {
  const name = (recipe?.name || '').toLowerCase();
  if (name.includes('dosa')) return 'Karnataka';
  if (name.includes('biryani')) return 'Hyderabadi';
  if (name.includes('paneer') || name.includes('butter masala')) return 'Punjabi';
  if (name.includes('stir fry')) return 'Indo-Chinese';
  if (name.includes('spaghetti')) return 'Indo-Italian';
  if (name.includes('soup')) return 'Continental';
  if (name.includes('salad') || name.includes('sandwich') || name.includes('wrap')) return 'Street Fusion';
  if (name.includes('pancake') || name.includes('cookie') || name.includes('cake') || name.includes('oatmeal') || name.includes('smoothie')) return 'Continental';
  return 'Indo-Thai';
}

export default function CuisineFilter() {
  const [selectedMain, setSelectedMain] = React.useState('North Indian');
  const [selectedSub, setSelectedSub] = React.useState(CUISINES['North Indian'][0]);

  const filtered = React.useMemo(() => {
    return sampleRecipes.filter((r) => inferSubCuisine(r) === selectedSub);
  }, [selectedSub]);

  const subCuisines = CUISINES[selectedMain] || [];

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.title}>Explore by Cuisine</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {Object.keys(CUISINES).map((c) => (
          <Button
            key={c}
            mode={selectedMain === c ? 'contained' : 'outlined'}
            onPress={() => {
              setSelectedMain(c);
              setSelectedSub(CUISINES[c][0]);
            }}
            style={styles.chip}
          >
            {c}
          </Button>
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {subCuisines.map((s) => (
          <Button
            key={s}
            mode={selectedSub === s ? 'contained' : 'outlined'}
            onPress={() => setSelectedSub(s)}
            style={styles.chip}
          >
            {s}
          </Button>
        ))}
      </ScrollView>

      <View style={styles.grid}>
        {filtered.map((r) => (
          <Card key={r.id} style={styles.card}>
            <Card.Cover source={{ uri: r.image }} />
            <Card.Title title={r.name} titleNumberOfLines={2} />
          </Card>
        ))}
        {filtered.length === 0 && (
          <Text style={styles.empty}>No recipes found for {selectedSub}</Text>
        )}
      </View>
    </View>
  );
}

const GREEN_PRIMARY = '#2E7D32';

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  title: {
    color: GREEN_PRIMARY,
    marginBottom: 8,
  },
  row: {
    gap: 8,
    paddingVertical: 4,
  },
  chip: {
    marginRight: 8,
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


