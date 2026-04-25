import { Controller, Get, UseGuards, Request, Param } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('wallets')
@UseGuards(JwtAuthGuard)
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Get()
  async getWallets(@Request() req: any) {
    return this.walletService.findByUserId(req.user.userId);
  }

  @Get(':id')
  async getWallet(@Param('id') id: string, @Request() req: any) {
    return this.walletService.findOne(id, req.user.userId);
  }
}
