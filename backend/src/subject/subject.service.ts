import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { PrismaService } from 'prisma/prisma.service';
import { NotFoundException ,BadRequestException } from '@nestjs/common';
import { CreateSubjectTaskDto } from './dto/task';
import { SubjectTask,TaskStatus } from '@prisma/client';

@Injectable()
export class SubjectService {
  constructor(private readonly prisma: PrismaService) {



  }



  async creates(name: string, id: string) {
    try {
      const finduser = await this.prisma.user.findUnique({
        where: {
          id: id
        }
      });
      if (!finduser) {
        throw new NotFoundException('User not found');
      }
      const subject = await this.prisma.subject.create({
        data: {
          name: name.toString(),
          userId: id
        }
      });
      return subject;

    } catch (error) {
      console.log(error);
      throw error;

    }
  };
  async loadAllSubjects(userId: string) {
    try {
      // Step 1: Check if user exists
      const findUser = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!findUser) {
        throw new NotFoundException('User not found');
      }


      const subjects = await this.prisma.subject.findMany({
        where: {
          userId: userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return subjects;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  async create(createSubjectTaskDto: CreateSubjectTaskDto): Promise<SubjectTask> {
    // Verify that the subject exists
    const subject = await this.prisma.subject.findUnique({
      where: { id: createSubjectTaskDto.subjectId },
    });

    if (!subject) {
      throw new NotFoundException(
        `Subject with ID ${createSubjectTaskDto.subjectId} not found`
      );
    }

    try {
      return await this.prisma.subjectTask.create({
        data: {
          name: createSubjectTaskDto.name,
          description: createSubjectTaskDto.description,
          status: createSubjectTaskDto.status || TaskStatus.PENDING,
          subjectId: createSubjectTaskDto.subjectId,
        },
        include: {
          subject: true,
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to create subject task');
    }
  }

  async findAll(subjectId?: number): Promise<SubjectTask[]> {
    const where = subjectId ? { subjectId } : {};

    return await this.prisma.subjectTask.findMany({
      where,
      include: {
        subject: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number): Promise<SubjectTask> {
    const task = await this.prisma.subjectTask.findUnique({
      where: { id },
      include: {
        subject: true,
      },
    });

    if (!task) {
      throw new NotFoundException(`SubjectTask with ID ${id} not found`);
    }

    return task;
  }

  async findBySubject(subjectId: number): Promise<SubjectTask[]> {
    // Verify subject exists
    const subject = await this.prisma.subject.findUnique({
      where: { id: subjectId },
    });

    if (!subject) {
      throw new NotFoundException(`Subject with ID ${subjectId} not found`);
    }

    return await this.prisma.subjectTask.findMany({
      where: { subjectId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByStatus(status: TaskStatus, subjectId?: number): Promise<SubjectTask[]> {
    const where: any = { status };
    if (subjectId) {
      where.subjectId = subjectId;
    }

    return await this.prisma.subjectTask.findMany({
      where,
      include: {
        subject: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // async update(id: number, updateSubjectTaskDto: UpdateSubjectTaskDto): Promise<SubjectTask> {
  //   // Check if task exists
  //   await this.findOne(id);

  //   try {
  //     return await this.prisma.subjectTask.update({
  //       where: { id },
  //       data: updateSubjectTaskDto,
  //       include: {
  //         subject: true,
  //       },
  //     });
  //   } catch (error) {
  //     throw new BadRequestException('Failed to update subject task');
  //   }
  // }

  async updateStatus(id: number, status: TaskStatus): Promise<SubjectTask> {
    await this.findOne(id);

    return await this.prisma.subjectTask.update({
      where: { id },
      data: { status },
      include: {
        subject: true,
      },
    });
  }

  async remove(id: number): Promise<SubjectTask> {
    await this.findOne(id);

    try {
      return await this.prisma.subjectTask.delete({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException('Failed to delete subject task');
    }
  }

  async count(subjectId?: number): Promise<number> {
    const where = subjectId ? { subjectId } : {};
    return await this.prisma.subjectTask.count({ where });
  }

  async getStatistics(subjectId?: number): Promise<{
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
  }> {
    const where = subjectId ? { subjectId } : {};

    const [total, pending, inProgress, completed] = await Promise.all([
      this.prisma.subjectTask.count({ where }),
      this.prisma.subjectTask.count({ where: { ...where, status: TaskStatus.PENDING } }),
      this.prisma.subjectTask.count({ where: { ...where, status: TaskStatus.IN_PROGRESS } }),
      this.prisma.subjectTask.count({ where: { ...where, status: TaskStatus.COMPLETED } }),
    ]);

    return { total, pending, inProgress, completed };
  }

}
