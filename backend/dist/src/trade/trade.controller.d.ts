import { TradeService } from './trade.service';
export declare class TradeController {
    private tradeService;
    constructor(tradeService: TradeService);
    getRates(): Promise<{
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
    submitGiftCard(req: any, body: any, file?: any): Promise<{
        id: string;
        createdAt: Date;
        currency: string;
        userId: string;
        type: string;
        status: string;
        amount: number;
        description: string | null;
    }>;
    initiateCryptoTrade(req: any, body: any): Promise<{
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
