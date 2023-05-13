import { IWalletRepository } from "./wallet.repository";
import { Wallet, NewWallet, WalletBalanceUpdate } from "./wallet.model";
import AppError from "../errors/AppError";

export interface IWalletService {
  createWallet(newWallet: NewWallet): Promise<Wallet>;
  getWalletByUserId(userId: string): Promise<Wallet>;
  updateBalance(wallet: WalletBalanceUpdate): Promise<Wallet>;
}

export class WalletService implements IWalletService {
  constructor(private walletRepository: IWalletRepository) {}

  async createWallet(newWallet: NewWallet): Promise<Wallet> {
    const userID = newWallet.userId.toString();
    const wallet = await this.walletRepository.getWalletByUserId(userID);
    if (wallet) throw new AppError(400, "User already has a wallet");
    const createdWallet = await this.walletRepository.createWallet(newWallet);
    return createdWallet;
  }

  async getWalletByUserId(userId: string): Promise<Wallet> {
    const wallet = await this.walletRepository.getWalletByUserId(userId);
    if (!wallet) throw new AppError(404, "Wallet not found");
    return wallet;
  }

  async updateBalance(wallet: WalletBalanceUpdate): Promise<Wallet> {
    const updatedWallet = await this.walletRepository.updateBalance(wallet);
    return updatedWallet;
  }
}
