import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: any): Promise<{
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
    login(body: any): Promise<{
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
}
