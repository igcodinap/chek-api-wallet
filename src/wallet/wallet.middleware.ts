import { Request, Response } from "express";
import { IWalletService } from "./wallet.service";
import { NewWallet } from "./wallet.model";

export class WalletMiddleware {
    service: IWalletService;
    constructor(private walletService: IWalletService) {
        this.service = walletService;
        this.createWallet = this.createWallet.bind(this);
    }

    async createWallet(req: Request, res: Response) {
        try {
            const { currency, userId } = req.body;
            const newWallet = new NewWallet(currency, userId);
            const wallet = await this.service.createWallet(newWallet);
            res.status(201).json(wallet);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }
}