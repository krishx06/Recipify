import React, { useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, Animated, Easing } from 'react-native';
import { Text, Searchbar, Card, Button, Surface, Badge, Icon } from 'react-native-paper';
import sampleRecipes from './sampleRecipes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CuisineFilter from './components/CuisineFilter';

export default function Home() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const insets = useSafeAreaInsets();
  const [rouletteItem, setRouletteItem] = useState(null);
  const rouletteScale = useRef(new Animated.Value(0.95)).current;
  const rouletteOpacity = useRef(new Animated.Value(0)).current;

  const startRoulette = () => {
    let t = 0;
    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * sampleRecipes.length);
      setRouletteItem(sampleRecipes[idx]);
      t += 120;
      Animated.sequence([
        Animated.timing(rouletteScale, { toValue: 1, duration: 100, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(rouletteScale, { toValue: 0.96, duration: 100, easing: Easing.in(Easing.quad), useNativeDriver: true }),
      ]).start();
      rouletteOpacity.setValue(1);
      if (t > 1500) {
        clearInterval(interval);
        Animated.timing(rouletteScale, { toValue: 1, duration: 180, easing: Easing.out(Easing.quad), useNativeDriver: true }).start();
      }
    }, 120);
  };
  return (
    <ScrollView contentContainerStyle={[styles.container, { paddingTop: insets.top + 8 }]}>
      <Surface style={styles.header} elevation={0}>
        <Text variant="headlineSmall" style={styles.greeting}>Hi Krish 👋</Text>
        <Text variant="bodyMedium" style={styles.sub}>What are we cookin’ today?</Text>
      </Surface>

      <Searchbar
        placeholder="Search any recipe..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.search}
      />

      <View style={styles.discoveryRow}>
        <Surface style={styles.discoveryCard} elevation={2}>
          <Text variant="titleMedium" style={styles.discoveryTitle}>Find Recipes Now</Text>
          <Text variant="bodySmall" style={styles.discoverySub}>Ingredient-based search</Text>
          <Button mode="contained" style={styles.discoveryBtn} onPress={() => {}} icon="magnify">
            Start
          </Button>
        </Surface>
        <Surface style={styles.discoveryCard} elevation={2}>
          <Text variant="titleMedium" style={styles.discoveryTitle}>Explore Recipes</Text>
          <Text variant="bodySmall" style={styles.discoverySub}>Recipe Roulette</Text>
          <Button mode="contained" style={styles.discoveryBtn} onPress={startRoulette} icon="shuffle-variant">
            Spin
          </Button>
        </Surface>
      </View>

      {rouletteItem && (
        <Animated.View style={{ transform: [{ scale: rouletteScale }], opacity: rouletteOpacity }}>
          <Card style={styles.rouletteCard}>
            <Card.Cover source={{ uri: rouletteItem.image }} />
            <Card.Title title={`Surprise: ${rouletteItem.name}`} titleNumberOfLines={2} />
          </Card>
        </Animated.View>
      )}

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
        {[...new Set(sampleRecipes.map((r) => r.category))].map((cat) => (
          <Button
            key={cat}
            mode="contained-tonal"
            style={styles.categoryBtn}
            textColor="#2E7D32"
            icon={() => <Text style={styles.emoji}>{emojiForCategory(cat)}</Text>}
          >
            {cat}
          </Button>
        ))}
      </ScrollView>

      <SectionTitle title="Recommended for You" />
      <View style={styles.cardRow}>
        {sampleRecipes.slice(0, 3).map((r) => (
          <RecipeCard key={r.id} recipe={mapRecipe(r)} />
        ))}
      </View>

      <SectionTitle title="Recipes of the Week" />
      <View style={styles.cardRow}>
        {sampleRecipes.slice(3, 6).map((r) => (
          <RecipeCard key={r.id} recipe={mapRecipe(r)} />
        ))}
      </View>

      <CuisineFilter />
    </ScrollView>
  );
}

function mapRecipe(r) {
  return {
    id: String(r.id),
    title: r.name,
    time: '20 mins',
    difficulty: 'Easy',
    rating: 4.5,
    image: r.image,
  };
}

function emojiForCategory(cat) {
  const map = {
    Breakfast: '🍳',
    Lunch: '🍛',
    Dinner: '🍽️',
    Snack: '🥪',
    Dessert: '🍰',
    Soup: '🥣',
    Salad: '🥗',
    Drinks: '🥤',
  };
  return map[cat] || '🍽️';
}

function SectionTitle({ title }) {
  return (
    <View style={styles.sectionHeader}>
      <Text variant="titleMedium" style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

function RecipeCard({ recipe }) {
  return (
    <Card style={styles.card} mode="elevated" onPress={() => {}}>
      <Card.Cover source={{ uri: recipe.image }} style={styles.cardImage} />
      <Card.Title title={recipe.title} titleNumberOfLines={2} />
      <Card.Content>
        <View style={styles.metaRow}>
          <Badge style={styles.badge} size={22}>{recipe.difficulty}</Badge>
          <View style={styles.ratingWrap}>
            <Icon source="star" color="#FFA000" size={18} />
            <Text style={styles.ratingText}>{recipe.rating.toFixed(1)}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

const GREEN_BG = '#EAF6E9';
const GREEN_PRIMARY = '#2E7D32';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    backgroundColor: GREEN_BG,
  },
  header: {
    backgroundColor: 'transparent',
    marginBottom: 8,
  },
  greeting: {
    color: '#1b1b1b',
    fontWeight: '600',
  },
  sub: {
    color: '#4d4d4d',
  },
  search: {
    marginVertical: 12,
    backgroundColor: '#fff',
  },
  discoveryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  discoveryCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  discoveryTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  discoverySub: {
    color: '#6b6b6b',
    marginBottom: 8,
  },
  discoveryBtn: {
    alignSelf: 'flex-start',
    borderRadius: 20,
  },
  rouletteCard: {
    marginTop: 8,
    backgroundColor: '#fff',
  },
  categoryRow: {
    gap: 8,
    paddingVertical: 4,
  },
  categoryBtn: {
    marginRight: 8,
    backgroundColor: '#ffffff',
  },
  emoji: {
    fontSize: 16,
    marginRight: 6,
  },
  sectionHeader: {
    marginTop: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: GREEN_PRIMARY,
    fontWeight: '600',
  },
  cardRow: {
    gap: 12,
  },
  card: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  cardImage: {
    backgroundColor: '#f1f1f1',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  badge: {
    backgroundColor: '#F0F7EF',
    color: GREEN_PRIMARY,
  },
  ratingWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    gap: 4,
  },
  ratingText: {
    color: '#333',
  },
});


