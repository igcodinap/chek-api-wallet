import { NextFunction, Request, Response } from "express";
import { IWalletService } from "./wallet.service";
import { NewWallet } from "./wallet.model";

export class WalletMiddleware {
    service: IWalletService;
    constructor(private walletService: IWalletService) {
        this.service = walletService;
        this.createWallet = this.createWallet.bind(this);
        this.getWalletByUserId = this.getWalletByUserId.bind(this);
    }

    async createWallet(req: Request, res: Response, next: NextFunction) {
        try {
            const { currency, userId } = req.body;
            const newWallet = new NewWallet(currency, userId);
            const wallet = await this.service.createWallet(newWallet);
            res.status(201).json(wallet);
        } catch (error) {
            next(error)
        }
    }

    async getWalletByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const wallet = await this.service.getWalletByUserId(userId);
            res.status(200).json(wallet);
        } catch (error) {
            next(error)
        }
    }
}