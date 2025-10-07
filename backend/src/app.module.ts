import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Resolver, Query } from '@nestjs/graphql';
// Add a resolver with a Query
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
  ],
  controllers: [AppController],
  providers: [AppService, HelloResolver],
})
export class AppModule { }
