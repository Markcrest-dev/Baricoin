import { PrismaService } from '../prisma/prisma.service';
export declare class TradeService {
    private prisma;
    constructor(prisma: PrismaService);
    submitGiftCard(userId: string, data: any, file?: any): Promise<{
        id: string;
        createdAt: Date;
        currency: string;
        userId: string;
        type: string;
        status: string;
        amount: number;
        description: string | null;
    }>;
    initiateCryptoTrade(userId: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        currency: string;
        userId: string;
        type: string;
        status: string;
        amount: number;
        description: string | null;
    }>;
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
