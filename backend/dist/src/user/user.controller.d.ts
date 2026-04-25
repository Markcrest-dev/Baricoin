import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getProfile(req: any): Promise<{
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
    updateProfile(req: any, body: any): Promise<{
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
