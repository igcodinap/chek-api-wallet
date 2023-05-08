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
    });
});
