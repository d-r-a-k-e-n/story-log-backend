import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from 'src/modules/auth/auth.mudule';
import { EntryModule } from 'src/modules/entry/entry.module';
import { TmdbModule } from 'src/modules/tmdb/tmdb.mudule';
import { UserModule } from 'src/modules/user/user.module';
import { AiModule } from 'src/modules/ai/ai.module';

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    AuthModule,
    EntryModule,
    TmdbModule,
    UserModule,
    AiModule,
  ],
})
export class AppModule {}
