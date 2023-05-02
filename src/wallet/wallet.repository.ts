import { ResultSetHeader } from 'mysql2/promise';
import { pool } from '../config/database';
import { Wallet, NewWallet } from './wallet.model';

export interface IWalletRepository {
    createWallet(newWallet: NewWallet): Promise<Wallet>;
    // getWalletById(walletId: number): Promise<Wallet>;
    // getWalletByUserId(userId: number): Promise<Wallet>;
    // updateWallet(wallet: Wallet): Promise<Wallet>;
}

export class WalletRepositoryDB implements IWalletRepository{
    async createWallet(newWallet: NewWallet): Promise<Wallet> {
        try {
            console.log(newWallet)
            const [result] = await pool.execute(
                'INSERT INTO wallet (balance, currency, user_id) VALUES (?, ?, ?)',
                [newWallet.balance, newWallet.currency, newWallet.userId]
            );
            const success = result as ResultSetHeader;
            const wallet: Wallet = {
                id: success.insertId,
                balance: newWallet.balance,
                currency: newWallet.currency,
                userId: newWallet.userId,
            };
            return wallet;
        } catch (error) {
            console.log(error);
            throw error;
        }

    }
}