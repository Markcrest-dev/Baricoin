import { PrismaService } from '../prisma/prisma.service';
export declare class WalletService {
    private prisma;
    constructor(prisma: PrismaService);
    findByUserId(userId: string): Promise<any>;
    findOne(id: string, userId: string): Promise<any>;
    getBalance(userId: string, currency: string): Promise<any>;
}
