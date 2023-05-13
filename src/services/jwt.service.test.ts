import { JwtService } from "../services/jwt.service";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken");

describe("JwtService", () => {
  let jwtSecret: string;
  let payload: Record<string, unknown>;

  beforeEach(() => {
    jwtSecret = process.env.JWT_SECRET || "";
    payload = {
      id: 1,
      name: "testname",
      lastname: "testlastname",
      email: "user@mail.com",
    };

    (jwt.sign as jest.Mock).mockReturnValue("jwtToken");
    (jwt.verify as jest.Mock).mockReturnValue(payload);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("verifyToken", () => {
    it("should verify a jwt token", () => {
      const decoded = JwtService.verifyToken("jwtToken");

      expect(jwt.verify).toHaveBeenCalledWith("jwtToken", jwtSecret);
      expect(decoded).toEqual(payload);
    });
  });
});
