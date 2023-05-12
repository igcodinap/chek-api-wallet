import { WalletRepositoryDB } from './wallet.repository';
import { pool } from '../config/database';
import { NewWallet } from './wallet.model';
import AppError from '../errors/AppError';

jest.mock('../config/database');

describe('WalletRepositoryDB', () => {
    let walletRepository: WalletRepositoryDB;

    beforeEach(() => {
        walletRepository = new WalletRepositoryDB();
        (pool.execute as jest.Mock).mockClear();
    });

    describe('createWallet', () => {
        it('should create a new wallet and return it', async () => {
            const newWallet: NewWallet = {
                balance: 100,
                currency: 'CLP',
                userId: 1,
            };

            (pool.execute as jest.Mock).mockResolvedValue([
                {
                    affectedRows: 1,
                    insertId: 1,
                },
            ]);

            const wallet = await walletRepository.createWallet(newWallet);

            expect(wallet).toEqual({
                id: 1,
                ...newWallet,
            });

            expect(pool.execute).toHaveBeenCalledWith(
                'INSERT INTO wallet (balance, currency, user_id) VALUES (?, ?, ?)',
                [newWallet.balance, newWallet.currency, newWallet.userId]
            );
        });

        it('should throw an AppError if wallet creation fails', async () => {
            const newWallet: NewWallet = {
                balance: 100,
                currency: 'CLP',
                userId: 1,
            };

            (pool.execute as jest.Mock).mockResolvedValue([
                {
                    affectedRows: 0,
                },
            ]);
            await expect(walletRepository.createWallet(newWallet)).rejects.toThrow(AppError);

            expect(pool.execute).toHaveBeenCalledWith(
                'INSERT INTO wallet (balance, currency, user_id) VALUES (?, ?, ?)',
                [newWallet.balance, newWallet.currency, newWallet.userId]
            );
        });

        it('should throw an AppError if pool execute throws an error', async () => {
            const newWallet: NewWallet = {
                balance: 100,
                currency: 'CLP',
                userId: 1,
            };
            const poolError = new Error('connection error');
            (pool.execute as jest.Mock).mockRejectedValue(poolError);

            await expect(walletRepository.createWallet(newWallet)).rejects.toThrow(AppError);
        });
    });

    describe('getWalletByUserId', () => {
        it('should return the wallet associated with the given user ID', async () => {
            const userId = '1';

            (pool.execute as jest.Mock).mockResolvedValue([
                [
                    {
                        id: 1,
                        balance: 100,
                        currency: 'CLP',
                        userId: userId,
                    },
                ],
            ]);

            const wallet = await walletRepository.getWalletByUserId(userId);

            expect(wallet).toEqual({
                id: 1,
                balance: 100,
                currency: 'CLP',
                userId,
            });

            expect(pool.execute).toHaveBeenCalledWith(
                'SELECT id, balance, currency, user_id FROM wallet WHERE user_id = ?',
                [userId]
            );
        });

        it('should throw an AppError if pool execute throws an error', async () => {
            const userId = '1';
            const poolError = new Error('connection error');

            (pool.execute as jest.Mock).mockRejectedValue(poolError);

            await expect(walletRepository.getWalletByUserId(userId)).rejects.toThrow(AppError);
        });
    });
});
