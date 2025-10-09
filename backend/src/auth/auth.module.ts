import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'prisma/prisma.service';

import { JwtModule, JwtService } from '@nestjs/jwt';
// import { UserModule } from 'src/user/user.module';

@Module({
  imports : [

   
    JwtModule.register({
      secret : process.env.JWT_SECRET,
      signOptions : {expiresIn : '1d'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtService],

})
export class AuthModule {}
