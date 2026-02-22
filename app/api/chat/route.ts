import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { message, history } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY not configured" },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash", // same as your working generate-plan
        });

        // Format conversational history context
        const historyText = Array.isArray(history)
            ? history.map((m: any) => `${m.role === 'assistant' ? 'SafeNest AI' : 'User'}: ${m.content}`).join("\n\n")
            : "";

        const prompt = `
You are SafeNest AI, a conservative financial advisor for Indian GenZ students.

Tone: Friendly, educational, conservative.

Rules:
- No crypto
- No speculative assets
- No guaranteed returns
- Explain things simply
- Always include a short disclaimer at the end

Conversation History:
${historyText}

User question:
${message}
`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        return NextResponse.json({ text });

    } catch (error: any) {
        console.error("Chat API Error FULL:", error);
        return NextResponse.json(
            { error: "Failed to generate chat response." },
            { status: 500 }
        );
    }
}