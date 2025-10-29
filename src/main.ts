import express, { type Request, type Response } from 'express';
import cors from 'cors';

import { router } from './routes/router.js';

const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.use((req: Request, res: Response) => {
  res.status(404).json({ code: 404, message: 'Not Found' });
});

export default app;
