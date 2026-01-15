
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedWidget } from "../types";

// Note: In compliance with guidelines, GoogleGenAI is instantiated inside each function 
// to ensure the latest API key from process.env.API_KEY is used.

export const getFlutterAssistantResponse = async (prompt: string, history: { role: string, content: string }[]) => {
  // Always use a named parameter and direct reference to process.env.API_KEY.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-3-pro-preview';
  
  const contents = history.map(h => ({
    role: h.role === 'user' ? 'user' : 'model',
    parts: [{ text: h.content }]
  }));
  
  contents.push({ role: 'user', parts: [{ text: prompt }] });

  const response = await ai.models.generateContent({
    model,
    contents: contents as any,
    config: {
      systemInstruction: "You are an expert Flutter and Dart developer. You provide concise, high-quality, and modern Flutter code snippets. Always explain the 'why' behind the code. Focus on clean architecture and state management best practices like Provider, Riverpod, or Bloc if asked.",
      // Using thinkingConfig for complex reasoning tasks as per guidelines.
      thinkingConfig: { thinkingBudget: 2000 }
    }
  });

  // response.text is a property, not a method.
  return response.text || "I'm sorry, I couldn't process that request.";
};

export const generateFlutterWidget = async (description: string): Promise<GeneratedWidget> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Generate a high-quality Flutter widget based on this description: ${description}. Include the full code and a clear explanation.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          code: { type: Type.STRING },
          explanation: { type: Type.STRING }
        },
        required: ["title", "description", "code", "explanation"]
      }
    }
  });

  try {
    // Parsing the JSON string obtained from response.text property.
    return JSON.parse(response.text || '{}');
  } catch (e) {
    throw new Error("Failed to parse AI response");
  }
};
