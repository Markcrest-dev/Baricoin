import { PrismaService } from '../prisma/prisma.service';
export declare class TransactionService {
    private prisma;
    constructor(prisma: PrismaService);
    findAllByUserId(userId: string, params: any): Promise<{
        id: string;
        createdAt: Date;
        currency: string;
        userId: string;
        type: string;
        status: string;
        amount: number;
        description: string | null;
    }[]>;
    create(userId: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        currency: string;
        userId: string;
        type: string;
        status: string;
        amount: number;
        description: string | null;
    }>;
}
