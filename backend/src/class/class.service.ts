import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { PrismaService } from 'prisma/prisma.service';
import { CreateAssignmentDto } from './dto/create-assignment-dto';
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
        userId: user.id,
        adminList : [user.id]





      },
    });

    return newClass;
  }

async createAssignments(data: CreateAssignmentDto, id: string) {
  try {

    const isValidUser = await this.prisma.classes.findUnique({
      where: { id: data.classId },
    });

    if (!isValidUser) {
      throw new NotFoundException(`Class with id ${data.classId} not found`);
    }


    if (isValidUser.userId !== id && !isValidUser.adminList.includes(id)) {

      throw new BadRequestException('You are not authorized to create assignments for this class');
    }

    const assignment = await this.prisma.assignment.create({
      data: {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        classId: data.classId,
        attachments: data.attachments || [],
      },
    });


    return {
      success: true,
      message: 'Assignment created successfully',
      assignment,
    };
  } catch (error) {

    if (error instanceof NotFoundException || error instanceof BadRequestException) {
      throw error;
    }


    if (error.code === 'P2002') {
      throw new BadRequestException('Duplicate assignment or invalid class ID');
    }


    console.error('Error creating assignment:', error);
    throw new BadRequestException('Something went wrong while creating the assignment');
  }
}



  async loadClass(id: string) {
    const classData = await this.prisma.classes.findMany({
      where: { userId: id },
    });
    if (!classData) {
      throw new NotFoundException(`Class with id ${id} not found`);
    }
    return classData;
  }
}
