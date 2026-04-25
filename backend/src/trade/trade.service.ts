import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TradeService {
  constructor(private prisma: PrismaService) {}

  async submitGiftCard(userId: string, data: any, file?: any) {
    const { category, type, amount, rate } = data;
    
    // In a real app, we would process the file and upload to S3/Cloudinary
    const transaction = await this.prisma.transaction.create({
      data: {
        userId,
        type: 'trade',
        amount: Number(amount) * Number(rate),
        currency: 'NGN',
        status: 'pending',
        description: `Sell ${category} ${type} Giftcard`,
      },
    });

    return transaction;
  }

  async initiateCryptoTrade(userId: string, data: any) {
    const { symbol, type, amount, price } = data;
    
    if (type === 'sell') {
      // Logic for selling crypto
      const transaction = await this.prisma.transaction.create({
        data: {
          userId,
          type: 'trade',
          amount: Number(amount) * Number(price),
          currency: 'NGN',
          status: 'pending',
          description: `Sell ${amount} ${symbol} @ ${price}`,
        },
      });
      return transaction;
    }

    throw new BadRequestException('Trade type not supported yet');
  }

  async fetchRates() {
    // Mock rates for now
    return {
      giftcards: [
        { id: '1', category: 'iTunes', type: 'USA Physical', rate: 750 },
        { id: '2', category: 'Amazon', type: 'Germany Cash Receipt', rate: 820 },
      ],
      crypto: [
        { id: '1', symbol: 'BTC', name: 'Bitcoin', price: 65000, change24h: 2.5 },
        { id: '2', symbol: 'ETH', name: 'Ethereum', price: 3500, change24h: -1.2 },
      ]
    };
  }
}
