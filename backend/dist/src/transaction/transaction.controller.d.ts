import { TransactionService } from './transaction.service';
export declare class TransactionController {
    private transactionService;
    constructor(transactionService: TransactionService);
    getTransactions(req: any, query: any): Promise<any>;
}
