import express from "express";
import walletRouter from "./wallet/wallet.routes";
import { ErrorMiddleware } from "./errors/ErrorMiddleware";

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;

app.use(express.json());
app.use("/wallet", walletRouter);

app.use(ErrorMiddleware.handle);

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
