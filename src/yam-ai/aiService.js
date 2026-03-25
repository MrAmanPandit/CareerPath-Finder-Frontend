import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenAI({ apiKey: API_KEY });

const SYSTEM_PROMPT = `
You are YAM (Your Academic Mentor), an AI assistant dedicated to educational and career purposes for students.
Your goal is to:
1. Resolve student doubts clearly and concisely.
2. Provide career guidance, roadmap suggestions, and educational resources.
3. Be encouraging, professional, and knowledgeable.
4. If a user asks something completely unrelated to education or career (like entertainment, politics, or general trivia), politely redirect them back to academic or career topics.
5. Use markdown for formatting responses (bolding, lists, etc.) to make them readable.
6. Keep the tone friendly yet expert.
`;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const MAX_RETRIES = 3;
const MODELS = ["gemini-2.0-flash", "gemini-2.0-flash-lite", "gemini-flash-latest"];

/**
 * Trims chat history to the last N messages to save tokens.
 */
const trimHistory = (history, maxMessages = 10) => {
    return history.slice(-maxMessages);
};

export const generateResponse = async (userPrompt, chatHistory = []) => {
    const trimmedHistory = trimHistory(chatHistory);
    
    // Prepare chat history for Gemini API
    const contents = [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "Understood. I am YAM, your Academic Mentor. How can I help you today?" }] },
        ...trimmedHistory.map(msg => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.text }]
        })),
        { role: "user", parts: [{ text: userPrompt }] }
    ];

    for (const modelName of MODELS) {
        let retries = 0;
        while (retries < MAX_RETRIES) {
            try {
                const result = await genAI.models.generateContent({
                    model: modelName,
                    contents: contents
                });
                
                return result.text;
            } catch (error) {
                const errorStatus = error?.status;
                const isRateLimit = errorStatus === "RESOURCE_EXHAUSTED" || error?.message?.includes("429");

                if (isRateLimit) {
                    retries++;
                    if (retries < MAX_RETRIES) {
                        const waitTime = Math.pow(2, retries) * 1000 + Math.random() * 1000;
                        console.warn(`Rate limit hit for ${modelName}. Retrying in ${Math.round(waitTime)}ms... (Attempt ${retries}/${MAX_RETRIES})`);
                        await sleep(waitTime);
                        continue;
                    }
                    console.error(`Rate limit exceeded for ${modelName} after ${MAX_RETRIES} retries.`);
                    // Fall through to next model if available
                    break; 
                } else {
                    console.error(`Error generating AI response with ${modelName}:`, error);
                    // For non-quota errors, don't retry this model, move to next or fail
                    break;
                }
            }
        }
    }

    // If we reach here, all models/retries failed
    return "QUOTA_EXCEEDED";
};
