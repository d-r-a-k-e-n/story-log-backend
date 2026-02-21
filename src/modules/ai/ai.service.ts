import { Inject, Injectable } from '@nestjs/common';
import type { IAiProvider } from 'src/modules/ai/types/ai-provider.interface';
import type { AiProviderEnum } from 'src/modules/ai/types/ai-provider.enum';

@Injectable()
export class AiService {
  constructor(
    @Inject(process.env.AI_PROVIDER as AiProviderEnum)
    private readonly provider: IAiProvider,
  ) {}

  async generateText(prompt: string) {
    return this.provider.generateText(prompt);
  }
}
