import { NextFunction, Request, Response } from "express";
import { WalletMiddleware } from "./wallet.middleware";
import { IWalletService } from "./wallet.service";
import { NewWallet } from "./wallet.model";

const mockWalletService: jest.Mocked<IWalletService> = {
  createWallet: jest.fn(),
  getWalletByUserId: jest.fn(),
};

const mockRequest = (body = {}, params = {}) =>
  ({
    body,
    params,
  } as Request);

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNextFunction = () => {
  const next = {} as NextFunction;
  return next;
};

const mockNextFunctionWithError = (arg: Error) => {
  const next: NextFunction = jest.fn();
  next(arg);
  return next;
};

describe("WalletMiddleware", () => {
  let walletMiddleware: WalletMiddleware;

  beforeEach(() => {
    jest.clearAllMocks();
    walletMiddleware = new WalletMiddleware(mockWalletService);
  });

  describe("createWallet", () => {
    it("should create a new wallet and return a 201 status code", async () => {
      const req = mockRequest({ currency: "CLP", userId: 1 });
      const res = mockResponse();
      const next = mockNextFunction();

      const { currency, userId } = req.body;
      const newWallet = new NewWallet(currency, userId);
      const createdWallet = { ...newWallet, id: 1 };

      mockWalletService.createWallet.mockResolvedValue(createdWallet);

      await walletMiddleware.createWallet(req, res, next);

      expect(mockWalletService.createWallet).toHaveBeenCalledWith(newWallet);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdWallet);
    });
    it("should call next function with error if wallet does not exist", async () => {
      const req = mockRequest({}, { userId: "1" });
      const res = mockResponse();

      const error = new Error("Wallet not found");
      const nextWithError = mockNextFunctionWithError(error);

      mockWalletService.createWallet.mockRejectedValue(error);

      await walletMiddleware.createWallet(req, res, nextWithError);

      expect(nextWithError).toHaveBeenCalledWith(error);
    });
  });

  describe("getWalletByUserId", () => {
    it("should get a wallet by user ID and return a 200 status code", async () => {
      const req = mockRequest({}, { userId: "1" });
      const res = mockResponse();
      const next = mockNextFunction();

      const wallet = {
        id: 1,
        balance: 100,
        currency: "CLP",
        userId: 1,
      };

      const { userId } = req.params;

      mockWalletService.getWalletByUserId.mockResolvedValue(wallet);

      await walletMiddleware.getWalletByUserId(req, res, next);

      expect(mockWalletService.getWalletByUserId).toHaveBeenCalledWith(userId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(wallet);
    });

    it("should call next function with error if wallet does not exist", async () => {
      const req = mockRequest({}, { userId: "1" });
      const res = mockResponse();

      const { userId } = req.params;
      const error = new Error("Wallet not found");
      const nextWithError = mockNextFunctionWithError(error);

      mockWalletService.getWalletByUserId.mockRejectedValue(error);

      await walletMiddleware.getWalletByUserId(req, res, nextWithError);

      expect(mockWalletService.getWalletByUserId).toHaveBeenCalledWith(userId);
      expect(nextWithError).toHaveBeenCalledWith(error);
    });
  });
});
// pending failure test
