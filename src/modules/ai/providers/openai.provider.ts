import { Injectable } from '@nestjs/common';
import { IAiProvider } from 'src/modules/ai/types/ai-provider.interface';

@Injectable()
export class OpenAiProvider implements IAiProvider {
  constructor() {}

  async generateText(prompt: string): Promise<string> {
    return `Hello, world from Openai! ${prompt}`;
  }
}
