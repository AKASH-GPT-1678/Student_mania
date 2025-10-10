import { Injectable, NotFoundException, UnauthorizedException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { LoginBrandDto } from './dto/create-brand.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { NotValidCloudProvider } from 'src/errors/not-valid.url';

@Injectable()
export class BrandsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) { }


  async createAdvertiseMent(createAds: CreateAdvertisementDto) {
    const google = "https://storage.googleapis.com/";
    const cloudinary = "https://res.cloudinary.com/";
    const aws1 = "https://s3.";
    const allowedPrefixes = [google, cloudinary, aws1];

    try {
      // 1️⃣ Check if brand exists
      const brand = await this.prisma.brand.findUnique({
        where: { id: createAds.brandId },
      });

      if (!brand) {
        throw new NotFoundException("Brand not found with the given ID.");
      }

   
      if (!allowedPrefixes.some(prefix => createAds.imageUrl?.startsWith(prefix))) {
        throw new NotValidCloudProvider(
          "Invalid cloud provider. Only Google, AWS, or Cloudinary are supported for images."
        );
      }

   
      const advertisement = await this.prisma.advertisement.create({
        data: {
          ...createAds,
          brandId: brand.id,
        },
      });

      return advertisement;

    } catch (error) {
      // Handle known and unknown errors
      if (error instanceof NotFoundException || error instanceof NotValidCloudProvider) {
        throw error; // rethrow known errors
      }
      // Log unknown errors and throw generic message
      console.error("Error creating advertisement:", error);
      throw new InternalServerErrorException("Failed to create advertisement.");
    }
  }


  async signInBrand(loginDto: LoginBrandDto) {
    try {
      const { email, password } = loginDto;

      // ✅ Step 1: Basic field checks
      if (!email || !password) {
        throw new BadRequestException('Email and password are required');
      }


      const findBrand = await this.prisma.brand.findUnique({
        where: { email },
      });

      if (!findBrand) {
        throw new NotFoundException('Brand not found with this email');
      }


      // const isPasswordValid = await bcrypt.compare(password, findBrand.password);
      // if (!isPasswordValid) {
      //   throw new UnauthorizedException('Invalid password');
      // }


      const response = await this.generateToken(findBrand);

      return response;
    } catch (error) {

      if (
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      console.error('Error during brand sign-in:', error);
      throw new InternalServerErrorException('Something went wrong during sign-in');
    }
  }

  async generateToken(user: any) {
    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });

    return {
      email: user.email,
      success: true,
      access_token,
    };
  }
}
