import { WalletService } from './wallet.service';
export declare class WalletController {
    private walletService;
    constructor(walletService: WalletService);
    getWallets(req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        currency: string;
        balance: number;
        label: string;
        userId: string;
    }[]>;
    getWallet(id: string, req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        currency: string;
        balance: number;
        label: string;
        userId: string;
    }>;
}
