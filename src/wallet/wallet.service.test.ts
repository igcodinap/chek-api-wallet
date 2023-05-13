import { IWalletRepository } from "./wallet.repository";
import { WalletService } from "./wallet.service";
import { NewWallet, Wallet } from "./wallet.model";

const mockWalletRepository: jest.Mocked<IWalletRepository> = {
  createWallet: jest.fn(),
  getWalletByUserId: jest.fn(),
  updateBalance: jest.fn(),
};

describe("WalletService", () => {
  let walletService: WalletService;

  beforeEach(() => {
    jest.clearAllMocks();
    walletService = new WalletService(mockWalletRepository);
  });

  describe("createWallet", () => {
    it("should call the wallet repository and return a new wallet", async () => {
      const newWallet: NewWallet = {
        balance: 100,
        currency: "CLP",
        userId: 1,
      };

      const createdWallet: Wallet = {
        id: 1,
        ...newWallet,
      };

      mockWalletRepository.createWallet.mockResolvedValue(createdWallet);

      const result = await walletService.createWallet(newWallet);

      expect(result).toEqual(createdWallet);
      expect(mockWalletRepository.createWallet).toHaveBeenCalledWith(newWallet);
    });

    it("should throw an error if the user already has a wallet", async () => {
      const newWallet: NewWallet = {
        balance: 100,
        currency: "CLP",
        userId: 1,
      };

      const createdWallet: Wallet = {
        id: 1,
        ...newWallet,
      };

      mockWalletRepository.getWalletByUserId.mockResolvedValue(createdWallet);

      await expect(
        walletService.createWallet(newWallet)
      ).rejects.toThrowError();
      expect(mockWalletRepository.getWalletByUserId).toHaveBeenCalledWith(
        newWallet.userId.toString()
      );
    });
  });

  describe("getWalletByUserId", () => {
    it("should call the wallet repository and return a wallet for the given user ID", async () => {
      const userId = 1;
      const wallet: Wallet = {
        id: 1,
        balance: 100,
        currency: "CLP",
        userId,
      };
      const userIdStr = userId.toString();

      mockWalletRepository.getWalletByUserId.mockResolvedValue(wallet);

      const result = await walletService.getWalletByUserId(userIdStr);

      expect(result).toEqual(wallet);
      expect(mockWalletRepository.getWalletByUserId).toHaveBeenCalledWith(
        userIdStr
      );
    });

    it("should throw an error if the wallet does not exist", async () => {
      const userId = 1;
      const userIdStr = userId.toString();

      mockWalletRepository.getWalletByUserId.mockResolvedValue(undefined);

      await expect(
        walletService.getWalletByUserId(userIdStr)
      ).rejects.toThrowError();
      expect(mockWalletRepository.getWalletByUserId).toHaveBeenCalledWith(
        userIdStr
      );
    });
  });
});
