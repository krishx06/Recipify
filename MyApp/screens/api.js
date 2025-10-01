import Constants from 'expo-constants';

const API_KEY = Constants.expoConfig?.extra?.spoonacularApiKey || Constants.manifest?.extra?.spoonacularApiKey;
const BASE_URL = 'https://api.spoonacular.com';

function appendApiKey(url) {
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}apiKey=${API_KEY}`;
}

export async function fetchRandomIndianRecipes(count = 20) {
  // vegetarian + indian
  const tags = encodeURIComponent('indian,vegetarian');
  const url = appendApiKey(`${BASE_URL}/recipes/random?number=${count}&tags=${tags}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch random recipes');
  const data = await res.json();
  // normalize
  return (data.recipes || [])
    .filter((r) => r.vegetarian)
    .map((r) => ({
    id: r.id,
    name: r.title,
    image: r.image,
    summary: r.summary,
    readyInMinutes: r.readyInMinutes,
    cuisines: r.cuisines,
  }));
}

export async function searchRecipesByIngredients(ingredients = [], number = 20) {
  if (!Array.isArray(ingredients)) ingredients = [];
  const query = encodeURIComponent(ingredients.join(','));
  const url = appendApiKey(`${BASE_URL}/recipes/findByIngredients?ingredients=${query}&number=${number}&ranking=2&ignorePantry=true`);
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to search recipes');
  const data = await res.json();
  // Get details for each to filter cuisines
  const ids = data.map((r) => r.id).slice(0, 10); // limit follow-ups
  const detailed = await Promise.all(
    ids.map(async (id) => {
      const infoRes = await fetch(appendApiKey(`${BASE_URL}/recipes/${id}/information`));
      if (!infoRes.ok) return null;
      const info = await infoRes.json();
      return {
        id: info.id,
        name: info.title,
        image: info.image,
        cuisines: info.cuisines,
        readyInMinutes: info.readyInMinutes,
        vegetarian: info.vegetarian,
      };
    })
  );
  // Filter for Indian or Indo-fusion recipes
  const isIndianish = (cuisines = []) => {
    const c = (cuisines || []).map((x) => String(x).toLowerCase());
    return c.includes('indian') || c.includes('fusion') || c.includes('asian') || c.includes('pakistani');
  };
  return detailed.filter(Boolean).filter((r) => r.vegetarian).filter((r) => isIndianish(r.cuisines));
}


