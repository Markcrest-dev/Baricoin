import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async findAllByUserId(userId: string, params: any) {
    const { type, status, limit = 20, offset = 0 } = params;
    return this.prisma.transaction.findMany({
      where: {
        userId,
        type: type || undefined,
        status: status || undefined,
      },
      orderBy: { createdAt: 'desc' },
      take: Number(limit),
      skip: Number(offset),
    });
  }

  async create(userId: string, data: any) {
    return this.prisma.transaction.create({
      data: {
        ...data,
        userId,
      },
    });
  }
}
