import { 
  Controller, 
  Post, 
  Get, 
  Body, 
  UseGuards, 
  Request, 
  UseInterceptors, 
  UploadedFile 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TradeService } from './trade.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('trade')
@UseGuards(JwtAuthGuard)
export class TradeController {
  constructor(private tradeService: TradeService) {}

  @Get('rates')
  async getRates() {
    return this.tradeService.fetchRates();
  }

  @Post('giftcards')
  @UseInterceptors(FileInterceptor('image'))
  async submitGiftCard(
    @Request() req: any, 
    @Body() body: any,
    @UploadedFile() file?: any
  ) {
    return this.tradeService.submitGiftCard(req.user.userId, body, file);
  }

  @Post('crypto')
  async initiateCryptoTrade(@Request() req: any, @Body() body: any) {
    return this.tradeService.initiateCryptoTrade(req.user.userId, body);
  }
}
