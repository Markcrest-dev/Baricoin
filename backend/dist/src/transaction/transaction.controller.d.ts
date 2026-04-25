import { TransactionService } from './transaction.service';
export declare class TransactionController {
    private transactionService;
    constructor(transactionService: TransactionService);
    getTransactions(req: any, query: any): Promise<{
        id: string;
        createdAt: Date;
        currency: string;
        userId: string;
        type: string;
        status: string;
        amount: number;
        description: string | null;
    }[]>;
}
