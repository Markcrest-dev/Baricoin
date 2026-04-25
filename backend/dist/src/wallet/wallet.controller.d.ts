import { WalletService } from './wallet.service';
export declare class WalletController {
    private walletService;
    constructor(walletService: WalletService);
    getWallets(req: any): Promise<any>;
    getWallet(id: string, req: any): Promise<any>;
}
