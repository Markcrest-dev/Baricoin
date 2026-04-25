import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(data: any): Promise<{
        user: {
            id: any;
            email: any;
            name: any;
            username: any;
            isVerified: any;
            kycStatus: any;
            memberSince: any;
        };
        token: string;
    }>;
    login(user: any): Promise<{
        user: {
            id: any;
            email: any;
            name: any;
            username: any;
            isVerified: any;
            kycStatus: any;
            memberSince: any;
        };
        token: string;
    }>;
    validateUser(email: string, pass: string): Promise<any>;
}
