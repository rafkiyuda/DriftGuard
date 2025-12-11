import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { message } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: 'Gemini API Key not configured' }, { status: 500 });
    }

    // TODO: Call actual Google Generative AI API here
    // const genAI = new GoogleGenerativeAI(apiKey);
    // const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    // ...

    console.log(`[GEMINI] Received message: ${message}`);

    return NextResponse.json({
        reply: "I am DriftGuard AI. I am currently in PoC mode. Voice and advanced chat features coming soon."
    });
}
