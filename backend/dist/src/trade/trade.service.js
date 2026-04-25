"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TradeService = class TradeService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async submitGiftCard(userId, data, file) {
        const { category, type, amount, rate } = data;
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
    async initiateCryptoTrade(userId, data) {
        const { symbol, type, amount, price } = data;
        if (type === 'sell') {
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
        throw new common_1.BadRequestException('Trade type not supported yet');
    }
    async fetchRates() {
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
};
exports.TradeService = TradeService;
exports.TradeService = TradeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TradeService);
//# sourceMappingURL=trade.service.js.map