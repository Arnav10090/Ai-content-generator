'use server'

import { headers } from "next/headers";

export async function generateSambaNovaContent(prompt: string) {
    const apiKey = process.env.SAMBANOVA_API_KEY;

    if (!apiKey) {
        throw new Error("SAMBANOVA_API_KEY is not defined in environment variables");
    }

    const response = await fetch("https://api.sambanova.ai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            stream: true,
            model: "Meta-Llama-3.1-8B-Instruct",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful AI assistant."
                },
                {
                    role: "user",
                    content: prompt
                }
            ]
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`SambaNova API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    // Handle stream or just full response? 
    // The fetch above sets stream: true, but for simplicity in this replacement, 
    // let's try to handle it as a simple non-stream response first if possible, 
    // or handle the stream parsing. 
    // To match existing Google logic which was awaiting result.response.text(), 
    // it might be easier to use stream: false for now.

    return handleNonStreamResponse(prompt, apiKey);
}

async function handleNonStreamResponse(prompt: string, apiKey: string) {
    const response = await fetch("https://api.sambanova.ai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            stream: false,
            model: "Meta-Llama-3.1-8B-Instruct",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant"
                },
                {
                    role: "user",
                    content: prompt
                }
            ]
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`SambaNova API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "";
}
