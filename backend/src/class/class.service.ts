import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { PrismaService } from 'prisma/prisma.service';
import { CreateAssignmentDto } from './dto/create-assignment-dto';
import * as FormData from 'form-data';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcrypt';
import * as stream from 'stream';

import fetch from 'node-fetch';
import { CreateAnnouncementDto } from './dto/create-announcement';
import { NotAdminError } from 'src/errors/not-admin';
import { JoinGroupDto } from './dto/join-group.dto';
import { LeaveGroupDto } from './dto/leave-group.dto';
import { MakeAdminDto } from './dto/make-admin.dto';
import { AttendanceDto } from './dto/create-announcement';
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
  async processAttendance(file: Express.Multer.File) :Promise<AttendanceDto[]> {
    try {
      const formData = new FormData();

      const bufferStream = new stream.PassThrough();
      bufferStream.end(file.buffer);

      formData.append('file', bufferStream, {
        filename: file.originalname,
        contentType: file.mimetype,
      });

      const response = await fetch(this.process_url, {
        method: 'POST',
        body: formData,
        headers: formData.getHeaders(),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server responded with ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ Server response:', data);
      return data as AttendanceDto[];

    } catch (error: any) {
      console.error('❌ Error processing attendance:', error.message || error);
      throw error;
    }
  };

  async createAttendance(userId: string, attendanceData: AttendanceDto[]) {
    try {

      const records = attendanceData.map((item) => ({
        date: new Date(item.Date),
        lecture: item.Lecture,
        day: item.Day,
        time: item.Time,
        month: new Date(item.Date).getMonth() + 1, 
        year: new Date(item.Date).getFullYear(),
        userId: userId,
      }));

   
      const result = await this.prisma.attendance.createMany({
        data: records,
      });

      return {
        message: '✅ Attendance records created successfully',
        count: result.count,
      };
    } catch (error) {
      console.error('❌ Error creating attendance:', error);
      throw new Error('Failed to create attendance records');
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
  };

  async loadUserClasses(userId: string) {
    // Check if user exists
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }


    const userClasses = await this.prisma.classes.findMany({
      where: {
        OR: [
          { userId: userId }, // creator of class
          { members: { some: { id: userId } } }, // or member of class
        ],
      },
      include: {
        user: true,
        members: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!userClasses.length) {
      throw new NotFoundException(`No classes found for user with id ${userId}`);
    }

    return userClasses;
  }




  async loadClass(userId: string, classId: string) {
    const classData = await this.prisma.classes.findUnique({
      where: { id: classId },
      include: { members: true, user: true, assignments: true, announcements: true },
    });
    if (!classData) {
      throw new NotFoundException(`Class with id ${classId} not found`);
    };
    const isValidUser = await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!isValidUser) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const isMember = classData.members.some(member => member.id === userId);
    const isCreator = classData.user.id === userId;
    if (!isMember && !isCreator) {
      throw new BadRequestException('You are not a member of this class');
    };

    return classData;
  }



  async joinGroup(joinGroup: JoinGroupDto, userId: string) {
    const { classId, password } = joinGroup;

    // Step 1: Find the class with members
    const classData = await this.prisma.classes.findUnique({
      where: { id: classId },
      include: { members: true },
    });

    if (!classData) {
      throw new NotFoundException('Class not found');
    }

    // Step 2: Verify password
    const isPasswordValid = await bcrypt.compare(password, classData.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid class password');
    }

    // Step 3: Check if user is already a member
    const isAlreadyMember = classData.members.some(member => member.id === userId);
    if (isAlreadyMember) {
      throw new BadRequestException('You are already a member of this class');
    }

    // Step 4: Add user to members
    await this.prisma.classes.update({
      where: { id: classId },
      data: {
        members: {
          connect: { id: userId },
        },
      },
    });

    return {
      message: 'Successfully joined the class',
      classId: classData.id,
      className: classData.name,
    };
  };

  async leaveGroup(leaveGroup: LeaveGroupDto, userId: string) {
    const { classId } = leaveGroup;


    const classData = await this.prisma.classes.findUnique({
      where: { id: classId },
      include: { members: true },
    });

    if (!classData) {
      throw new NotFoundException('Class not found');
    }


    const isMember = classData.members.some(member => member.id === userId);
    if (!isMember) {
      throw new BadRequestException('You are not a member of this class');
    }

    // Step 3: Remove user from members
    await this.prisma.classes.update({
      where: { id: classId },
      data: {
        members: {
          disconnect: { id: userId },
        },
      },
    });

    return {
      statusCode: 200,
      message: 'Successfully left the class',
      classId: classData.id,
      className: classData.name,
    };
  }

  async makeAdmin(dto: MakeAdminDto, requesterId: string) {
    const { classId, targetUserId } = dto;

    // Step 1: Fetch class
    const classData = await this.prisma.classes.findUnique({
      where: { id: classId },
      include: { members: true },
    });

    if (!classData) {
      throw new NotFoundException('Class not found');
    }

    // Step 2: Check if requester is an admin
    if (!classData.adminList.includes(requesterId)) {
      throw new ForbiddenException('Only admins can promote members');
    }

    // Step 3: Check if target user is a member
    const isMember = classData.members.some(member => member.id === targetUserId);
    if (!isMember) {
      throw new BadRequestException('Target user is not a member of this class');
    }

    // Step 4: Check if target user is already an admin
    if (classData.adminList.includes(targetUserId)) {
      throw new BadRequestException('Target user is already an admin');
    }

    // Step 5: Add target user to adminList
    const updatedClass = await this.prisma.classes.update({
      where: { id: classId },
      data: {
        adminList: [...classData.adminList, targetUserId],
      },
    });

    return {
      statusCode: 200,
      message: 'User promoted to admin successfully',
      classId: updatedClass.id,
      targetUserId,
    };
  }
}
