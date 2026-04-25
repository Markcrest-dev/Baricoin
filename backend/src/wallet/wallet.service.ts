import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}

  async findByUserId(userId: string) {
    return this.prisma.wallet.findMany({
      where: { userId },
    });
  }

  async findOne(id: string, userId: string) {
    const wallet = await this.prisma.wallet.findFirst({
      where: { id, userId },
    });
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    return wallet;
  }

  async getBalance(userId: string, currency: string) {
    const wallet = await this.prisma.wallet.findFirst({
      where: { userId, currency },
    });
    return wallet?.balance || 0;
  }
}
