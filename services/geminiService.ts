
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getTravelAdvice = async (destination: string, budget: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Tu es l'expert voyage personnel de Moha et Manele. Ils prévoient un voyage à ${destination} avec un mode ${budget}. Donne-leur 3 conseils ultra-exclusifs et une recommandation de restaurant incroyable. Réponds en français de manière élégante et concise.`,
      config: {
        temperature: 0.8,
        topP: 0.95,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Désolé, je ne peux pas vous conseiller pour le moment, mais profitez bien de votre voyage !";
  }
};
