import { IWalletRepository } from './wallet.repository';
import { WalletService } from './wallet.service';

const mockWalletRepository: jest.Mocked<IWalletRepository> = {
  createWallet: jest.fn(),
  getWalletByUserId: jest.fn(),
};

describe('WalletService', () => {
  let walletService: WalletService;

  beforeEach(() => {
    jest.clearAllMocks();
    walletService = new WalletService(mockWalletRepository);
  });
});