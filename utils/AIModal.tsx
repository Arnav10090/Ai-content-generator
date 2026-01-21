import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY });

export async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

await main();