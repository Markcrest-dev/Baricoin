import { PrismaService } from '../prisma/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(id: string): Promise<{
        wallets: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            currency: string;
            balance: number;
            label: string;
            userId: string;
        }[];
        email: string;
        username: string;
        name: string | null;
        id: string;
        phone: string | null;
        isVerified: boolean;
        kycStatus: string;
        memberSince: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, data: any): Promise<{
        email: string;
        password: string;
        username: string;
        name: string | null;
        id: string;
        phone: string | null;
        isVerified: boolean;
        kycStatus: string;
        memberSince: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
