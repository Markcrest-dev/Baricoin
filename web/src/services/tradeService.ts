import api from './api';

export const tradeService = {
  async fetchGiftCardRates() {
    try {
      const response = await api.get('/giftcards/rates');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async submitGiftCard(data: FormData) {
    try {
      const response = await api.post('/giftcards/sell', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async fetchCryptoRates() {
    try {
      const response = await api.get('/crypto/rates');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async initiateCryptoTrade(data: any) {
    try {
      const response = await api.post('/crypto/trade', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async buyUtility(type: string, data: any) {
    try {
      const response = await api.post(`/services/${type}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
