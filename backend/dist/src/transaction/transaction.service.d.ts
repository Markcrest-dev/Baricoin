import { PrismaService } from '../prisma/prisma.service';
export declare class TransactionService {
    private prisma;
    constructor(prisma: PrismaService);
    findAllByUserId(userId: string, params: any): Promise<any>;
    create(userId: string, data: any): Promise<any>;
}
