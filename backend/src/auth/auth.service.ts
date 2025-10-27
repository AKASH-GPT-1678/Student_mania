import { Injectable } from '@nestjs/common';

import { JwtService } from "@nestjs/jwt";
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { BadRequestException, ConflictException, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterResponseDto, LoginUserDto } from 'src/auth/dto/auth-dto';
import { genRatePassword, comparePassword } from './helpers/bcrypt';
;
const genrals = {
    "id": 1,
    "code": "f9c2a7e4-1b23-4a56-9d78-ef9012cd3456",
    "name": "General",
    "description": "Covers general topics that do not belong to a specific subject category.",
    "createdAt": "2025-10-27T12:00:00.000Z",
    "updatedAt": "2025-10-27T12:00:00.000Z",
    "userId": null
}

@Injectable()
export class AuthService {

    constructor(

        private jwtService: JwtService,
        private prisma: PrismaService
    ) {


    }

    async saveUser(createDto: CreateUserDto): Promise<RegisterResponseDto> {
        try {
            if (createDto.password != createDto.confirmPassword) {
                throw new BadRequestException("Password and Confirm password Should match");
            }



            let existingUser = await this.prisma.user.findFirst({
                where: { email: createDto.email }
            });

            if (existingUser) {
                throw new ConflictException("User already Exists with this email");
            };

            const hash = await genRatePassword(createDto.password);
            const user = await this.prisma.user.create({
                data: {
                    name: createDto.name,
                    email: createDto.email,
                    password: hash.toString(),
                },
            });
            const generals= await this.addGenral(user.id);
            console.log(user);
            const response = new RegisterResponseDto();
            response.name = user.name;
            response.email = user.email;
            response.success = true;
            response.message = 'User registered successfully';


            return response;
        } catch (error) {
            console.error('Error creating user:', error);
            throw new InternalServerErrorException("Something Went Wrong ");



        }
    };

    async loginUser(loginDto: LoginUserDto): Promise<RegisterResponseDto> {
        try {
            const { email, password } = loginDto;
            console.log(email, password);


            if (!email || !password) {
                throw new BadRequestException('Email and password are required');
            }


            const user = await this.prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                throw new NotFoundException('User not found');
            }


            const isPasswordValid = await comparePassword(password, user.password);
            if (!isPasswordValid) {
                throw new UnauthorizedException('Invalid password');
            }


            const response = new RegisterResponseDto();
            response.name = user.name;
            response.email = user.email;
            response.id = user.id;


            response.success = true;
            response.message = 'Login successful';

            return response;

        } catch (error) {
            console.error('Error logging in user:', error);

            if (
                error instanceof BadRequestException ||
                error instanceof NotFoundException ||
                error instanceof UnauthorizedException
            ) {
                throw error;
            }


            throw new InternalServerErrorException('Something went wrong');
        }
    }


    async generateToken(user: any) {
        const payload = { email: user.email, sub: user.id };
        const access_token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
        return {
            email: user.email,
            success: true,
            access_token: access_token
        }
    };

    async addGenral(userId : string) {
        const general = await this.prisma.subject.create({
            data:{
                name : "General",
                description : genrals.description,
                userId : userId


            }
        });
        return general;
    }
}
