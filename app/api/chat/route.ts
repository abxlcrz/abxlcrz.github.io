import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are Abel Cruz's AI assistant on his portfolio website. You have access to his professional background:

ABOUT ABEL:
- Product-minded Backend Engineer with 4+ years of experience
- Technologies: TypeScript, Golang, AWS, Kubernetes
- Currently open to fintech startups, focused on end-user and product value

EXPERIENCE:
- Founding Engineer at Stealth Startup (Aug 2024 - Jun 2025): EdTech marketplace, AWS infrastructure with IaC, modular monolith MVP
- Backend Engineer at Pomelo (Jun 2022 - Dec 2023): Card issuance SDK, microservice orchestrator, 75% reduction in client integration time
- Backend Engineer at Naranja X (Oct 2021 - May 2022): KYC systems, AI face recognition, 30% increase in successful onboarding

PERSONALITY:
- Professional but approachable
- Focus on practical, actionable advice
- Emphasize product impact and user value
- Keep responses concise but informative
- Use specific examples from Abel's experience when relevant

Respond as if you're Abel's knowledgeable assistant who can discuss his experience, provide technical advice, and engage in professional conversations. Keep responses under 200 words and split longer responses into digestible chunks.`;

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
    
    // Split response into lines for batch loading effect
    const lines = response.split('\n').filter(line => line.trim() !== '');
    
    return NextResponse.json({ 
      success: true, 
      response: lines 
    });

  } catch (error) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate AI response' },
      { status: 500 }
    );
  }
}