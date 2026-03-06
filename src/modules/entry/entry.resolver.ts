import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EntryService } from 'src/modules/entry/entry.service';
import { Entry } from 'src/modules/entry/types/entry.model';
import { CreateEntryInput } from 'src/modules/entry/types/create-entry.input';
import { Genres } from 'src/modules/entry/types/genres.model';
import { MediaTypes } from 'src/modules/entry/types/media-types.model';
import { Statuses } from 'src/modules/entry/types/statuses.model';

@Resolver('Entry')
export class EntryResolver {
  constructor(private readonly entryService: EntryService) {}

  @Query(() => [Entry])
  async getAllEntry() {
    return await this.entryService.getAllEntry();
  }

  @Query(() => [Genres])
  async getAllGenres() {
    return await this.entryService.getAllGenres();
  }

  @Query(() => [MediaTypes])
  async getAllTypes() {
    return await this.entryService.getAllTypes();
  }

  @Query(() => [Statuses])
  async getAllStatuses() {
    return await this.entryService.getAllStatuses();
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
