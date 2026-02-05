import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are the AI Assistant for the IEEE P3394 Working Group. 
This working group focuses on the "Standard for Artificial Intelligence".
Your role is to help members facilitate discussions, draft agenda items, summarize complex AI technical standards, and brainstorm topics related to AI ethics, robustness, and interoperability.

Tone: Professional, Academic, Collaborative, and Technical.
Context: You are speaking to engineers, researchers, and policy makers.

If asked about the schedule, remind them to check the Schedule tab, but you can suggest topics for future meetings.
`;

export const generateAIResponse = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  try {
    // Transform history for the API - simplistic approach for single turn or simple context
    // Ideally we would use ai.chats.create() for full history, but for this stateless service demo:
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          role: 'user',
          parts: [{ text: `Previous context: ${history.map(h => `${h.role}: ${h.content}`).join('\n')}\n\nUser Question: ${newMessage}` }]
        }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        thinkingConfig: { thinkingBudget: 0 } // Disable thinking for faster response on flash
      }
    });

    return response.text || "I apologize, I could not generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while communicating with the AI Standard Assistant.";
  }
};