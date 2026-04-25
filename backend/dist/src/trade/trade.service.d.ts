import { PrismaService } from '../prisma/prisma.service';
export declare class TradeService {
    private prisma;
    constructor(prisma: PrismaService);
    submitGiftCard(userId: string, data: any, file?: any): Promise<any>;
    initiateCryptoTrade(userId: string, data: any): Promise<any>;
    fetchRates(): Promise<{
        giftcards: {
            id: string;
            category: string;
            type: string;
            rate: number;
        }[];
        crypto: {
            id: string;
            symbol: string;
            name: string;
            price: number;
            change24h: number;
        }[];
    }>;
}
