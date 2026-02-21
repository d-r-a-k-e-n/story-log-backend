import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EntryService } from 'src/modules/entry/entry.service';
import { Entry } from 'src/modules/entry/models/entry.model';
import { CreateEntryInput } from 'src/modules/entry/models/create-entry.input';

@Resolver('Entry')
export class EntryResolver {
  constructor(private readonly entryService: EntryService) {}

  @Query(() => [Entry])
  async getAllEntry() {
    return await this.entryService.getAllEntry();
  }

  @Mutation(() => Entry)
  async createEntry(
    @Args('input', { type: () => CreateEntryInput }) input: CreateEntryInput,
  ) {
    return await this.entryService.createEntry(input);
  }

  @Mutation(() => Entry)
  async deleteEntry(@Args('id', { type: () => Int }) id: number) {
    return await this.entryService.deleteEntry(id);
  }
}
