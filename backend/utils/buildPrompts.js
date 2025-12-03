export function buildChefPrompt({ ingredients = [], cuisine = null, mealType = null }) {
  if (!Array.isArray(ingredients)) {
    console.warn("buildChefPrompt received non-array ingredients:", ingredients);
    ingredients = [];
  }

  const userList = ingredients.length
    ? ingredients.map(i => `- ${i}`).join("\n")
    : "- NONE";

  return `
You are an expert recipe generator for a mobile app.

The user has ONLY these main ingredients available:
${userList}

Cuisine preference: ${cuisine || "Any"}
Meal type: ${mealType || "Any"}

Your job:

1) **Strict recipes (user-only)**  
   - Create **at least 2 recipes** that use ONLY the user's ingredients above  
     + basic pantry items: **water, salt, sugar, cooking oil, butter/ghee**.  
   - You MUST NOT introduce any other vegetables, grains, spices, herbs, or dairy
     that are not in the user list.

2) **Creative recipes (with add-ons)**  
   - Create **2 additional recipes** where you may add a few extra ingredients.  
   - For every ingredient that is **not** in the user list, append
     \`" (extra)"\` at the end of the ingredient text.  
     Example: \`"1 tsp Garam Masala (extra)"\`.

For **every recipe**:
- Follow the cuisine and meal type as much as possible.
- Provide:
  - short attractive \`title\`
  - one-sentence \`description\`
  - \`time\` as a string like "30 minutes"
  - \`servings\` as a string like "4 servings"
  - \`difficulty\`: "Easy", "Medium", or "Hard"
  - \`ingredients\`: array of strings (each ingredient with quantity)
  - \`instructions\`: array of short step strings (6–10 steps max)
  - \`tips\`: array of 3 short tips
  - \`type\`: "strict" or "creative"

RESPONSE FORMAT (VERY IMPORTANT):
Return **VALID JSON ONLY**, no markdown, no explanations.

Use exactly this shape:

{
  "recipes": [
    {
      "title": "",
      "description": "",
      "time": " minutes",
      "servings": "",
      "difficulty": "",
      "ingredients": [],
      "instructions": [],
      "tips": [],
      "type": "strict"
    }
  ]
}

- First put all "strict" recipes (user-only) in the array.
- Then append the "creative" recipes that contain extra ingredients (marked with " (extra)").
- Generate **4 recipes total** in the "recipes" array.
`;
}
