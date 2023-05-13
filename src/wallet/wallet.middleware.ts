import { NextFunction, Request, Response } from "express";
import { IWalletService } from "./wallet.service";
import { NewWallet, WalletBalanceUpdate } from "./wallet.model";
import AppError from "../errors/AppError";

export class WalletMiddleware {
  service: IWalletService;
  constructor(private walletService: IWalletService) {
    this.service = walletService;
    this.createWallet = this.createWallet.bind(this);
    this.getWalletByUserId = this.getWalletByUserId.bind(this);
    this.updateBalance = this.updateBalance.bind(this);
  }

  async createWallet(req: Request, res: Response, next: NextFunction) {
    try {
      const { currency, userId } = req.body;
      if (!currency || !userId) throw new AppError(400, "Invalid fields");
      if (typeof currency !== "string" || typeof userId !== "number")
        throw new AppError(400, "Invalid fields");
      const newWallet = new NewWallet(currency, userId);
      const wallet = await this.service.createWallet(newWallet);
      res.status(201).json(wallet);
    } catch (error) {
      next(error);
    }
  }

  async getWalletByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      if (!userId) throw new AppError(400, "Invalid field");
      const id = Number(userId);
      if (isNaN(id)) throw new AppError(400, "Invalid field");
      const wallet = await this.service.getWalletByUserId(userId);
      res.status(200).json(wallet);
    } catch (error) {
      next(error);
    }
  }

  async updateBalance(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, balance } = req.body;
      if (!id || !balance) throw new AppError(400, "Invalid fields");
      if (typeof id !== "number" || typeof balance !== "number") throw new AppError(400, "Invalid fields");
      if (balance < 0) throw new AppError(400, "Balance must be greater than 0")
      const newWalletBalance = new WalletBalanceUpdate(id, balance);
      const wallet = await this.service.updateBalance(newWalletBalance);
      res.status(200).json(wallet);
    } catch (error) {
      next(error);
    }
  }
}
