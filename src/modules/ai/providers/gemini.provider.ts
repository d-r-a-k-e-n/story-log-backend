import { Injectable } from '@nestjs/common';
import { IAiProvider } from 'src/modules/ai/types/ai-provider.interface';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

@Injectable()
export class GeminiProvider implements IAiProvider {
  constructor() {}

  async generateText(prompt: string): Promise<any> {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  }
}
