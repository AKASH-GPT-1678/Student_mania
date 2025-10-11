import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus,UseGuards , Req } from '@nestjs/common';
import { BrandsService } from './brands.service';

import { LoginBrandDto } from './dto/create-brand.dto';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { JwtGuard } from 'src/jwt/jwt.guard';
@Controller('api/brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) { }


  @Post('login')
  @HttpCode(HttpStatus.OK)
  async signInBrand(@Body() loginDto: LoginBrandDto) {
    return await this.brandsService.signInBrand(loginDto);
  }

  @UseGuards(JwtGuard) 
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createAdvertisement(
    @Body() createAds: CreateAdvertisementDto,
    @Req() req: any,
  ) {
 
    const id = req.user.sub;
    createAds.brandId = id;

    return this.brandsService.createAdvertiseMent(createAds);
  }


}
