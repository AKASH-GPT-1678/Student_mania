import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Resolver, Query } from '@nestjs/graphql';
import { SubjectModule } from './subject/subject.module';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { BrandsModule } from './brands/brands.module';
import { PaymentModule } from './payment/payment.module';

import { ClassModule } from './class/class.module';
import { MulterModule } from '@nestjs/platform-express';


@Resolver()
class HelloResolver {
  @Query(() => String)
  hello() {
    return 'Hello World!';
  }
}

@Module({

  imports: [
    AuthModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true, // auto-generat
    }),

    SubjectModule,

    BrandsModule,

    PaymentModule,



    ClassModule,


  ],
  controllers: [AppController],
  providers: [AppService, HelloResolver, PrismaService, JwtService],
})
export class AppModule { }
