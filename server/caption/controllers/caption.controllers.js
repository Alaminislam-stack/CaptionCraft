import { asyncHandler } from "../utils/asyncHedler.js";
import { errorHandler } from "../utils/errorHendler.js";
import { captions } from "../config/db/schema.js";
import { db } from "../config/db/index.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import { eq, sql } from "drizzle-orm";


export const generateCaption = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;

    const { prompt, tone, captionLength, includeEmojis, language } = req.body;
    console.log("prompt", prompt, "tone", tone, "captionLength", captionLength, "includeEmojis", includeEmojis, "language", language);
    if (!prompt || !tone || !captionLength || includeEmojis === undefined || !language) {
        return next(new errorHandler("All fields are required", 400));
    }


    try {
        // Deduct credits calling the user service API
        const response = await axios.post(`${process.env.USER_API}/deduct-credits`, {
            userId
        });

        if (!response.data.success) {
            return next(new errorHandler(response.data.errorMessage || "Failed to deduct credits", 400));
        }

        // Initialize Gemini AI
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

        const aiPrompt = `Generate a social media caption based on the following:
    Topic/Prompt: ${prompt}
    Tone: ${tone}
    Length: ${captionLength}
    Include Emojis: ${includeEmojis ? "Yes" : "No"}
    Language: ${language}
    
    Provide only the caption text as output.`;

        const result = await model.generateContent(aiPrompt);
        const generatedText = result.response.text();

        // Save to database
        await db.insert(captions).values({
            userId,
            prompt,
            tone,
            captionLength,
            includeEmojis,
            language,
            result: generatedText,
        });

        res.status(200).json({
            success: true,
            caption: generatedText,
        });
    } catch (error) {
        console.error("error:", error);
        return next(new errorHandler(error.response?.data?.errorMessage || "An error occurred during generation", 500));
    }
});

export const getAllCaption = asyncHandler(async (req, res, next) => {
    const { userId } = req.body;
    const userCaptions = await db.select().from(captions).where(eq(captions.userId, userId));

    res.status(200).json({
        success: true,
        captions: userCaptions,
    });
});
