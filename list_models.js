import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenAI({ apiKey: API_KEY });

async function listModels() {
    try {
        const models = await genAI.models.list();
        console.log("Available Models:");
        models.forEach(model => console.log(model.name));
    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
