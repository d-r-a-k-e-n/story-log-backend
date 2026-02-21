import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from 'src/modules/user/user.mudule';
import { EntryModule } from 'src/modules/entry/entry.module';
import { TmdbModule } from 'src/modules/tmdb/tmdb.mudule';

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    UserModule,
    EntryModule,
    TmdbModule,
  ],
})
export class AppModule {}
