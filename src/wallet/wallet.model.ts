export class Wallet {
  id: number;
  balance: number;
  currency: string;
  userId: number;
  constructor(id: number, balance: number, currency: string, userId: number) {
    this.id = id;
    this.balance = balance;
    this.currency = currency;
    this.userId = userId;
  }
}

export class NewWallet {
  balance: number;
  currency: string;
  userId: number;
  constructor(currency: string, userId: number) {
    this.balance = 0;
    this.currency = currency;
    this.userId = userId;
  }
}
