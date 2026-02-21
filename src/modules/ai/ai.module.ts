import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AiResolver } from 'src/modules/ai/ai.resolver';
import { AiService } from 'src/modules/ai/ai.service';
import { GeminiProvider } from 'src/modules/ai/providers/gemini.provider';
import { OpenAiProvider } from 'src/modules/ai/providers/openai.provider';
import { AiProviderEnum } from 'src/modules/ai/types/ai-provider.enum';

export const AI_PROVIDER = process.env.AI_PROVIDER as AiProviderEnum;

@Module({
  imports: [ConfigModule],
  providers: [
    AiResolver,
    AiService,
    GeminiProvider,
    OpenAiProvider,
    {
      provide: AI_PROVIDER,
      useFactory: (configService: ConfigService) => {
        const provider = configService.get<string>('AI_PROVIDER');

        switch (provider) {
          case AiProviderEnum.GEMINI:
            return new GeminiProvider();
          case AiProviderEnum.OPENAI:
            return new OpenAiProvider();
          default:
            throw new Error(`Invalid AI provider: ${provider}`);
        }
      },
      inject: [ConfigService],
    },
  ],
  exports: [AiService],
})
export class AiModule {}
