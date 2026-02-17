import express from "express";
import Groq from "groq-sdk";
import { buildChefPrompt } from "../utils/buildPrompts.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
    try {
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

        const { ingredients, cuisine, mealType } = req.body;

        if (!ingredients || !Array.isArray(ingredients)) {
            return res.status(400).json({
                message: "Ingredients must be an array.",
            });
        }

        const prompt = buildChefPrompt({ ingredients, cuisine, mealType });

        console.log("Prompt sent to Groq:\n", prompt);

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: 4096,
        });

        let text = completion.choices[0].message.content.trim();
        console.log("Raw Groq Response:", text);

        const jsonStart = text.indexOf("{");
        const jsonEnd = text.lastIndexOf("}");

        if (jsonStart === -1 || jsonEnd === -1) {
            return res.status(500).json({
                message: "AI did not return valid JSON.",
                raw: text,
            });
        }

        const clean = text.slice(jsonStart, jsonEnd + 1);

        let parsed;
        try {
            parsed = JSON.parse(clean);
        } catch (err) {
            console.log("JSON Parse Error:", err);
            return res.status(500).json({
                message: "Failed to parse AI JSON response",
                raw: clean,
            });
        }

        return res.json(parsed);
    } catch (error) {
        console.log("AI Generation Error:", error);
        return res.status(500).json({
            message: "Recipe generation failed",
            error: error.message,
        });
    }
});

export default router;
