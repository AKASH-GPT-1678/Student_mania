import { Injectable , NotFoundException } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class ClassService {
  process_url;

  constructor(
    private readonly prisma: PrismaService
  ) {
    this.process_url = process.env.PROCESS_URL;

  }


  //@ts-ignore
  async processAttendance(file: Express.Multer.File) {
    try {


      const formData = new FormData();
      const blob = new Blob([file.buffer], { type: file.mimetype });
      const fileObject = new File([blob], file.originalname, { type: file.mimetype });

      formData.append("file", fileObject);

      // Send request to FastAPI
      const response = await fetch(this.process_url, {
        method: "POST",
        body: formData as any,

      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server responded with ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log("✅ Server response:", data);
      return data;
    } catch (error: any) {
      console.error("❌ Error processing attendance:", error.message || error);
      throw error;
    }
  }

  async createClass(data: CreateClassDto) {

    const user = await this.prisma.user.findUnique({
      where: { id: data.id },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${data.id} not found`);
    }


    const newClass = await this.prisma.classes.create({
      data: {
        name: data.className,
        section: data.section || '',
        room: data.room || '',
        subject: data.subject || '',
        password: 'defaultPassword',
        userId: user.id
      },
    });

    return newClass;
  }
}
