import { Router } from "express";
import { WalletMiddleware } from "./wallet.middleware";
import { WalletService } from "./wallet.service";
import { WalletRepositoryDB } from "./wallet.repository";
import { AuthMiddleware } from "../auth/auth.middleware";

const router = Router();
const walletRepository = new WalletRepositoryDB();
const walletService = new WalletService(walletRepository);
const wallet = new WalletMiddleware(walletService);

router.post("/", wallet.createWallet);
router.put("/", wallet.updateBalance);
router.get(
  "/userid/:userId",
  AuthMiddleware.authorize,
  wallet.getWalletByUserId
);


export default router;
