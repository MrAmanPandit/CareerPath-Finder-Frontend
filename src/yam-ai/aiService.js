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

export const generateResponse = async (userPrompt, chatHistory = []) => {
    try {
        // Prepare chat history for Gemini API
        const contents = [
            { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
            { role: "model", parts: [{ text: "Understood. I am YAM, your Academic Mentor. How can I help you today?" }] },
            ...chatHistory.map(msg => ({
                role: msg.role === "user" ? "user" : "model",
                parts: [{ text: msg.text }]
            })),
            { role: "user", parts: [{ text: userPrompt }] }
        ];

        const result = await genAI.models.generateContent({
            model: "gemini-2.0-flash",
            contents: contents
        });
        
        return result.text;
    } catch (error) {
        console.error("Error generating AI response:", error);
        return "I'm sorry, I encountered an error while processing your request. Please try again later.";
    }
};
