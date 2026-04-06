import axios from "axios";

/**
 * Generates a response from YAM AI by calling the backend assistant.
 * The backend handles the "Search Database First" and "Gemini Fallback" logic.
 */
export const generateResponse = async (userPrompt, chatHistory = []) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/v1/ai/ask`,
            {
                prompt: userPrompt,
                history: chatHistory.slice(-10) // Limit history for tokens
            }
        );

        if (response.data && response.data.data) {
            return response.data.data.text;
        }
        
        throw new Error("Invalid response format from AI service");

    } catch (error) {
        console.error("YAM AI Service Error:", error);
        
        // Handle specific error cases
        if (error.response?.status === 429) {
            return "QUOTA_EXCEEDED";
        }

        // Return the specific error from the backend if available
        if (error.response?.data?.message) {
            return `⚠️ **Backend Error:** ${error.response.data.message}`;
        }

        return "I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
    }
};
