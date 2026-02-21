import { Args, Query, Resolver } from '@nestjs/graphql';
import { AiService } from 'src/modules/ai/ai.service';

@Resolver()
export class AiResolver {
  constructor(private readonly aiService: AiService) {}

  @Query(() => String)
  async generateTextAi(@Args('prompt', { type: () => String }) prompt: string) {
    return this.aiService.generateText(prompt);
  }
}
