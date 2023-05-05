import { Router } from 'express';
import { WalletMiddleware } from './wallet.middleware';
import { WalletService } from './wallet.service';
import { WalletRepositoryDB } from './wallet.repository';

const router = Router();
const walletRepository = new WalletRepositoryDB();
const walletService = new WalletService(walletRepository);
const wallet = new WalletMiddleware(walletService);

router.post('/create', wallet.createWallet)
router.get('/userid/:userId', wallet.getWalletByUserId)

export default router;