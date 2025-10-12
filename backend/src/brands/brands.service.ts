import { Injectable, NotFoundException, UnauthorizedException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { LoginBrandDto } from './dto/login-brand.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { NotValidCloudProvider } from 'src/errors/not-valid.url';
import { CreateBrandDto } from './dto/create-brand.dto';
import * as crypto from "crypto";
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

      if (error instanceof NotFoundException || error instanceof NotValidCloudProvider) {
        throw error;
      }
      console.error("Error creating advertisement:", error);
      throw new InternalServerErrorException("Failed to create advertisement.");
    }
  };


async signUpBrand(createBrand: CreateBrandDto) {
  try {
    let isVerified = false;


    if (createBrand.website) {
      isVerified = await BrandsService.testWebsite(createBrand.website);
      if (!isVerified) {
   
        throw new BadRequestException('Website is not valid or reachable');
      }
    }


    const { brandCode, rawPassword } =
      await this.generateBrandCodeAndPassword(createBrand);


   const brand =  await this.prisma.brand.create({
      data: {
        name: createBrand.name,
        email: createBrand.email,
        contactNumber: createBrand.contactNumber,
        category: createBrand.category,
        website: createBrand.website,
        logoUrl: createBrand.logoUrl,
        description: createBrand.description,
        brandcode: brandCode,
        brandPassword: rawPassword, 
        sublocation: createBrand.sublocation,
        location: createBrand.location,
        verified: false,
        active: isVerified,
      },
    });

   
    return {success : true, message : "Brand created successfully" };
  } catch (error) {
    // Handle errors and return readable message
    if (error instanceof BadRequestException) {
      throw error;
    }
    console.error(error);
    throw new InternalServerErrorException('Failed to create brand');
  }
}

  static async testWebsite(webUrl: string) {

    try {
      const response = await fetch(webUrl);
      console.log(response);
      if (response.status === 200) {
        console.log("Website is up and running");
        return true;
      }
      else {
        console.log("Website is down");
        return false;
      }

    } catch (error) {
      console.error("Error testing website:", error);
      return false;

    }
  }


  async generateBrandCodeAndPassword(createBrand: CreateBrandDto) {
    const brandCode = createBrand.name
      .slice(0, 3)
      .toUpperCase() + '-' + crypto.randomBytes(3).toString('hex');

    const rawPassword = crypto.randomBytes(6).toString('hex');


    return {
      brandCode,
      rawPassword,

    };
  }


  async signInBrand(loginDto: LoginBrandDto) {
    try {
      const { code, password } = loginDto;


      if (!code || !password) {
        throw new BadRequestException('Email and password are required');
      }


      const findBrand = await this.prisma.brand.findUnique({
        where: { brandcode: code },
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
  };

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
