import { Controller, Get, UseGuards, Request, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  async getTransactions(@Request() req: any, @Query() query: any) {
    return this.transactionService.findAllByUserId(req.user.userId, query);
  }
}
