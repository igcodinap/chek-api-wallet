import { ResultSetHeader } from "mysql2/promise";
import { pool } from "../config/database";
import { Wallet, NewWallet, WalletBalanceUpdate } from "./wallet.model";
import AppError from "../errors/AppError";

export interface IWalletRepository {
  createWallet(newWallet: NewWallet): Promise<Wallet>;
  getWalletByUserId(userId: string): Promise<Wallet | undefined>;
  // for testing purposes
  updateBalance(wallet: WalletBalanceUpdate): Promise<Wallet>;
}

export class WalletRepositoryDB implements IWalletRepository {
  async createWallet(newWallet: NewWallet): Promise<Wallet> {
    try {
      const [result] = await pool.execute(
        "INSERT INTO wallet (balance, currency, user_id) VALUES (?, ?, ?)",
        [newWallet.balance, newWallet.currency, newWallet.userId]
      );
      const success = result as ResultSetHeader;
      if (!success.affectedRows)
        throw new AppError(400, "Error creating wallet");
      const wallet: Wallet = {
        id: success.insertId,
        balance: newWallet.balance,
        currency: newWallet.currency,
        userId: newWallet.userId,
      };
      return wallet;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(500, "Internal server error");
    }
  }

  async getWalletByUserId(userId: string): Promise<Wallet | undefined> {
    try {
      const [result] = await pool.execute(
        "SELECT id, balance, currency, user_id FROM wallet WHERE user_id = ?",
        [userId]
      );
      const data = result as Wallet[];
      const wallet = data[0];
      return wallet;
    } catch (error) {
      throw new AppError(500, "Internal server error");
    }
  }

  async updateBalance(wallet: Wallet): Promise<Wallet> {
    try {
      const [result] = await pool.execute(
        "UPDATE wallet SET balance = ? WHERE id = ?",
        [wallet.balance, wallet.id]
      );
      const success = result as ResultSetHeader;
      if (!success.affectedRows)
        throw new AppError(400, "Error updating wallet");
      return wallet;
    } catch (error) {
      throw new AppError(500, "Internal server error");
    }
  }
}
