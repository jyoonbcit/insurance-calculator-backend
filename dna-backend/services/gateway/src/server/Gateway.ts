import express, { type Request, type Response } from 'express';

import { logger } from '@Vero-Ventures/logger';

import { env } from '../env.js';

// Middleware
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

const IS_DEV = env.NODE_ENV !== 'production';

export class Gateway {
  public readonly app: express.Application;
  private server: ReturnType<express.Application['listen']> | null = null;

  constructor() {
    this.app = express();

    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(morgan(IS_DEV ? 'dev' : 'combined', {
      stream: {
        write: (msg: string) => logger.info(msg.trim()),
      },
    }));

    this.app.get('/healthz', (_: Request, res: Response) => {
      return res.status(200).json({
        msg: 'OK!',
      });
    });

    this.app.all('*', (req: Request, res: Response) => {
      return res.status(404).json({
        msg: `Route ${req.url} not found.`,
      });
    });
  }

  public start(host: string, port: number, cb?: () => void) {
    const defaultCb = () => {
      logger.info(`Starting gateway on http://${host}:${port} in ${env.NODE_ENV} mode.`);
    };

    this.server = this.app.listen(port, host, cb || defaultCb);
  }

  public stop() {
    if (this.server) this.server.close();
  }
}
