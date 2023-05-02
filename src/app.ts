import express from 'express';
import { Request, Response } from 'express';
import walletRouter from './wallet/wallet.routes';

const app = express();
const port = 3001;

app.use(express.json());
app.use('/wallet', walletRouter)

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});