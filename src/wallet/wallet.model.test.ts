import { Wallet, NewWallet } from './wallet.model';

describe('Wallet Model', () => {
  describe('Wallet', () => {
    it('should create a new Wallet instance with the given properties', () => {
      const id = 1;
      const balance = 100;
      const currency = 'CLP';
      const userId = 2;

      const wallet = new Wallet(id, balance, currency, userId);

      expect(wallet.id).toBe(id);
      expect(wallet.balance).toBe(balance);
      expect(wallet.currency).toBe(currency);
      expect(wallet.userId).toBe(userId);
    });
  });

  describe('NewWallet', () => {
    it('should create a new NewWallet instance with the given properties and a balance of 0', () => {
      const currency = 'CLP';
      const userId = 2;

      const newWallet = new NewWallet(currency, userId);

      expect(newWallet.balance).toBe(0);
      expect(newWallet.currency).toBe(currency);
      expect(newWallet.userId).toBe(userId);
    });
  });
});
