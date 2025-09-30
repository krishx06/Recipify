import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Searchbar, Card, Button, Surface, Badge, Icon } from 'react-native-paper';
import { categories, recommendedRecipes, weekRecipes } from './sampleRecipes';

export default function Home() {
  const [searchQuery, setSearchQuery] = React.useState('');
  return (
    <ScrollView contentContainerStyle={styles.container}>
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

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
        {categories.map((cat) => (
          <Button key={cat} mode="contained-tonal" style={styles.categoryBtn} textColor="#2E7D32">
            {cat}
          </Button>
        ))}
      </ScrollView>

      <SectionTitle title="Recommended for You" />
      <View style={styles.cardRow}>
        {recommendedRecipes.slice(0, 3).map((r) => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </View>

      <SectionTitle title="Recipes of the Week" />
      <View style={styles.cardRow}>
        {weekRecipes.slice(0, 3).map((r) => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </View>
    </ScrollView>
  );
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
          <Badge style={styles.badge} size={22}>{recipe.time}</Badge>
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
    padding: 16,
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
  categoryRow: {
    gap: 8,
    paddingVertical: 4,
  },
  categoryBtn: {
    marginRight: 8,
    backgroundColor: '#ffffff',
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


