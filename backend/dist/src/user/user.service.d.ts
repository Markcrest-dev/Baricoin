import { PrismaService } from '../prisma/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(id: string): Promise<any>;
    update(id: string, data: any): Promise<any>;
}
