import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as AWS from 'aws-sdk';

@Injectable()
export class AppService {
  private readonly s3: AWS.S3;
  private readonly bucketName: string;

  constructor(private readonly prisma: PrismaService) {
    // Initialize AWS S3
    this.bucketName =  'studiess';

    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,  
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, 
      region: process.env.AWS_REGION ?? 'ap-south-1',
    });
  }

  //@ts-ignore
  async uploadFile(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new InternalServerErrorException('No file provided');
    }

    try {
      const params: AWS.S3.PutObjectRequest = {
        Bucket: this.bucketName,
        Key: `${Date.now()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ContentDisposition: 'inline',
      };

      const { Location } = await this.s3.upload(params).promise();
      return Location;
    } catch (error) {
      console.error('❌ Error uploading file to S3:', error);
      throw new InternalServerErrorException('File upload failed');
    }
  }


  async s3_upload(
    fileBuffer: Buffer,
    bucket: string,
    fileName: string,
    mimeType: string,
  ): Promise<string> {
    try {
      const params: AWS.S3.PutObjectRequest = {
        Bucket: bucket,
        Key: fileName,
        Body: fileBuffer,
        ContentType: mimeType,
        ContentDisposition: 'inline',
      };

      const { Location } = await this.s3.upload(params).promise();
      return Location;
    } catch (error) {
      console.error('❌ S3 Upload Error:', error);
      throw new InternalServerErrorException('S3 upload failed');
    }
  }
}
