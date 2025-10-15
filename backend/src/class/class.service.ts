import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { PrismaService } from 'prisma/prisma.service';
import { CreateAssignmentDto } from './dto/create-assignment-dto';
import * as FormData from 'form-data';
import * as fs from 'fs';
import * as path from 'path';
import fetch from 'node-fetch';
import { CreateAnnouncementDto } from './dto/create-announcement';
import { NotAdminError } from 'src/errors/not-admin';
@Injectable()
export class ClassService {
  process_url;

  constructor(
    private readonly prisma: PrismaService
  ) {
    this.process_url = process.env.PROCESS_URL;

  }

  async getOneClass(id: string) {
    const oneClass = await this.prisma.classes.findFirst({
      where: {
        userId: id
      }
    });

    if (!oneClass) {
      throw new NotFoundException(`Class with id ${id} not found`);
    }
    return oneClass;
  }


  //@ts-ignore
  async processAttendance(file: Express.Multer.File) {
    try {
      const formData = new FormData();

      // If file is saved on disk
      const filePath = path.resolve(file.path); // multer destination
      formData.append('file', fs.createReadStream(filePath), {
        filename: file.originalname,
        contentType: file.mimetype,
      });

      // Send to FastAPI
      const response = await fetch(this.process_url, {
        method: 'POST',
        body: formData,
        headers: formData.getHeaders(), // important!
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server responded with ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ Server response:', data);

      // Delete the uploaded file after processing
      fs.unlink(filePath, (err) => {
        if (err) console.error('Failed to delete uploaded file:', err);
      });

      return data;
    } catch (error: any) {
      console.error('❌ Error processing attendance:', error.message || error);
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
        adminList: [user.id]





      },
    });

    return newClass;
  };


  async createAnnouncement(dto: CreateAnnouncementDto) {

    const classExists = await this.prisma.classes.findUnique({
      where: { id: dto.classId },
    });

    if (!classExists) {
      throw new NotFoundException(`Class with ID ${dto.classId} not found`);
    };

    if (!dto.creatorId) {
      throw new BadRequestException('Creator ID is required');
    };

    const isCreatorAdmin = classExists?.adminList.includes(dto.creatorId);

    if (!isCreatorAdmin) {
      throw new NotAdminError("Creator is not admin");
    };

    const announcement = await this.prisma.announcement.create({
      data: {
        classId: dto.classId,
        category: dto.category,
        title: dto.title,
        description: dto.description,
        creatorId: dto.creatorId,
      },
    });

    return announcement;
  };
    async getAnnouncementsByClass(classId: string, userId?: string) {
    // Optional: check if class exists
    const classExists = await this.prisma.classes.findUnique({
      where: { id: classId },
    });
    if (!classExists) throw new NotFoundException(`Class with ID ${classId} not found`);

    // // Optional: check if user belongs to class
    // if (userId && !classExists.adminList.includes(userId) && classExists.studentList?.includes(userId) === false) {
    //   throw new ForbiddenException("User does not belong to this class");
    // }

    // Fetch announcements ordered by newest first
    const announcements = await this.prisma.announcement.findMany({
      where: { classId },
      orderBy: { createdAt: 'desc' },
    });

    return announcements;
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
