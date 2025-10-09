import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Resolver, Query } from '@nestjs/graphql';
import { SubjectModule } from './subject/subject.module';
import { PrismaService } from 'prisma/prisma.service';

@Resolver()
class HelloResolver {
  @Query(() => String)
  hello() {
    return 'Hello World!';
  }
}

@Module({
  imports: [

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true, // auto-generat
    }),

    SubjectModule,
  ],
  controllers: [AppController],
  providers: [AppService, HelloResolver,PrismaService],
})
export class AppModule { }
