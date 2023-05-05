import { IWalletRepository } from "./wallet.repository";
import { Wallet, NewWallet } from "./wallet.model";


export interface IWalletService {
    createWallet(newWallet: NewWallet): Promise<Wallet>;
    // getWalletById(walletId: number): Promise<Wallet>;
    getWalletByUserId(userId: string): Promise<Wallet>;
}

export class WalletService implements IWalletService {
    constructor(private walletRepository: IWalletRepository) { }

    async createWallet(newWallet: NewWallet): Promise<Wallet> {
        const wallet = await this.walletRepository.createWallet(newWallet);
        return wallet;
    }

    async getWalletByUserId(userId: string): Promise<Wallet> {
        const wallet = await this.walletRepository.getWalletByUserId(userId);
        return wallet;
    }
}