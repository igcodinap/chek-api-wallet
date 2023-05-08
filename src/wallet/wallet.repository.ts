import { ResultSetHeader } from 'mysql2/promise';
import { pool } from '../config/database';
import { Wallet, NewWallet } from './wallet.model';
import AppError from '../errors/AppError';

export interface IWalletRepository {
    createWallet(newWallet: NewWallet): Promise<Wallet>;
    getWalletByUserId(userId: string): Promise<Wallet>;
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
            if (!success.affectedRows) throw new AppError(400, 'Error creating wallet');
            const wallet: Wallet = {
                id: success.insertId,
                balance: newWallet.balance,
                currency: newWallet.currency,
                userId: newWallet.userId,
            };
            return wallet;
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(500, 'Internal server error');
        }

    }

    async getWalletByUserId(userId: string): Promise<Wallet> {
        try {
            console.log(userId, 'userId')
            const [result] = await pool.execute(
                'SELECT id, balance, currency, user_id FROM wallet WHERE user_id = ?',
                [userId]
            );
            console.log(result, 'result')
            const data = result as Wallet[];
            const wallet = data[0];
            if (!wallet) throw new AppError(404, 'Wallet not found');
            return wallet;
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(500, 'Internal server error');
        }
    }
}