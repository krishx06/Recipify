import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildChefPrompt } from "../utils/buildPrompts.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
    try {

        const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        const { ingredients, cuisine, mealType } = req.body;

        if (!ingredients || !Array.isArray(ingredients)) {
            return res.status(400).json({
                message: "Ingredients must be an array.",
            });
        }

        const prompt = buildChefPrompt({ ingredients, cuisine, mealType });

        console.log("Prompt sent to Gemini:\n", prompt);

        const model = ai.getGenerativeModel({
            model: "gemini-2.0-flash-001",
        });

        const result = await model.generateContent(prompt);

        let text = result.response.text().trim();
        console.log("Raw Gemini Response:", text);

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
