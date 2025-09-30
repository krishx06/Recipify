const sampleRecipes = [
  {
    id: 1,
    name: "Classic Pancakes",
    ingredients: ["1 cup flour", "2 tbsp sugar", "1 tsp baking powder", "1 cup milk", "1 egg", "2 tbsp butter"],
    instructions: "Mix all ingredients, pour batter on a hot pan, cook until golden on both sides.",
    image: "https://via.placeholder.com/150",
    servings: 2,
    category: "Breakfast"
  },
  {
    id: 2,
    name: "Vegetable Stir Fry",
    ingredients: ["1 cup broccoli", "1 cup bell peppers", "1 carrot", "2 tbsp soy sauce", "1 tsp garlic"],
    instructions: "Stir fry all vegetables with garlic and soy sauce for 5–7 minutes.",
    image: "https://via.placeholder.com/150",
    servings: 2,
    category: "Lunch"
  },
  {
    id: 3,
    name: "Spaghetti Aglio e Olio",
    ingredients: ["200g spaghetti", "3 cloves garlic", "2 tbsp olive oil", "Chili flakes", "Parsley"],
    instructions: "Cook spaghetti, sauté garlic in olive oil, add chili flakes, toss with pasta and parsley.",
    image: "https://via.placeholder.com/150",
    servings: 2,
    category: "Dinner"
  },
  {
    id: 4,
    name: "Fruit Salad",
    ingredients: ["1 apple", "1 banana", "1 cup grapes", "1 orange", "2 tsp honey"],
    instructions: "Chop all fruits and drizzle with honey. Mix well.",
    image: "https://via.placeholder.com/150",
    servings: 2,
    category: "Snack"
  },
  {
    id: 5,
    name: "Veggie Sandwich",
    ingredients: ["2 slices bread", "Lettuce", "Tomato", "Cucumber", "Cheese slice", "Mayonnaise"],
    instructions: "Layer vegetables and cheese between bread slices with mayonnaise.",
    image: "https://via.placeholder.com/150",
    servings: 1,
    category: "Lunch"
  },
  {
    id: 6,
    name: "Choco Chip Cookies",
    ingredients: ["1 cup flour", "1/2 cup sugar", "1/2 cup butter", "1 egg", "1/2 cup chocolate chips"],
    instructions: "Mix ingredients, shape cookies, bake at 180°C for 12–15 mins.",
    image: "https://via.placeholder.com/150",
    servings: 12,
    category: "Dessert"
  },
  {
    id: 7,
    name: "Tomato Soup",
    ingredients: ["4 tomatoes", "1 onion", "2 cloves garlic", "1 cup vegetable stock", "Salt", "Pepper"],
    instructions: "Cook tomatoes and onions, blend, simmer with stock and seasonings.",
    image: "https://via.placeholder.com/150",
    servings: 2,
    category: "Lunch"
  },
  {
    id: 8,
    name: "Masala Dosa",
    ingredients: ["Dosa batter", "Potatoes", "Onion", "Chili", "Turmeric", "Salt"],
    instructions: "Prepare potato filling, spread batter on hot pan, cook dosa, add filling, fold and serve.",
    image: "https://via.placeholder.com/150",
    servings: 1,
    category: "Breakfast"
  },
  {
    id: 9,
    name: "Paneer Butter Masala",
    ingredients: ["200g paneer", "1 cup tomato puree", "1 tsp garam masala", "2 tbsp butter", "Cream"],
    instructions: "Cook tomato puree with spices, add paneer and cream, simmer for 5 minutes.",
    image: "https://via.placeholder.com/150",
    servings: 2,
    category: "Dinner"
  },
  {
    id: 10,
    name: "Greek Salad",
    ingredients: ["Cucumber", "Tomato", "Olives", "Feta cheese", "Olive oil", "Oregano"],
    instructions: "Chop vegetables, add olives and feta, drizzle with olive oil and sprinkle oregano.",
    image: "https://via.placeholder.com/150",
    servings: 2,
    category: "Snack"
  },
  {
    id: 11,
    name: "Oatmeal Porridge",
    ingredients: ["1/2 cup oats", "1 cup milk", "1 tsp honey", "Chopped fruits"],
    instructions: "Cook oats in milk, add honey and top with fruits.",
    image: "https://via.placeholder.com/150",
    servings: 1,
    category: "Breakfast"
  },
  {
    id: 12,
    name: "Veg Biryani",
    ingredients: ["1 cup rice", "Mixed vegetables", "Biryani masala", "Onion", "Yogurt"],
    instructions: "Cook rice, prepare vegetable masala, layer rice and veggies, cook on low heat.",
    image: "https://via.placeholder.com/150",
    servings: 3,
    category: "Dinner"
  },
  {
    id: 13,
    name: "Mango Smoothie",
    ingredients: ["1 mango", "1 cup milk", "1 tsp sugar", "Ice cubes"],
    instructions: "Blend all ingredients until smooth.",
    image: "https://via.placeholder.com/150",
    servings: 1,
    category: "Snack"
  },
  {
    id: 14,
    name: "Veggie Wrap",
    ingredients: ["Tortilla", "Lettuce", "Bell peppers", "Carrots", "Hummus"],
    instructions: "Spread hummus on tortilla, layer veggies, roll tightly and serve.",
    image: "https://via.placeholder.com/150",
    servings: 1,
    category: "Lunch"
  },
  {
    id: 15,
    name: "Chocolate Mug Cake",
    ingredients: ["4 tbsp flour", "2 tbsp sugar", "2 tbsp cocoa powder", "3 tbsp milk", "1 tbsp oil"],
    instructions: "Mix ingredients in a mug, microwave for 90 seconds, serve warm.",
    image: "https://via.placeholder.com/150",
    servings: 1,
    category: "Dessert"
  }
];

export default sampleRecipes;


