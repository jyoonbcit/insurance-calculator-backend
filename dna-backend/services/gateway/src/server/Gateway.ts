import path from 'path';

import express, { type Request, type Response } from 'express';

import { logger } from '@Vero-Ventures/logger';

import { env } from '../env.js';

// Middleware
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { createProxyMiddleware } from 'http-proxy-middleware';

const IS_DEV = env.NODE_ENV !== 'production';

export class Gateway {
  public readonly app: express.Application;
  private server: ReturnType<express.Application['listen']> | null = null;

  private readonly router = express.Router();

  constructor() {
    this.app = express();

    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(morgan(IS_DEV ? 'dev' : 'combined', {
      stream: {
        write: (msg: string) => logger.info(msg.trim()),
      },
    }));

    this.app.use('/api/v1', this.router);

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

  public registerService(basePath: string, servicePort: number, serviceApiVersion: number) {
    const targetServiceUrl = new URL(`/api/v${serviceApiVersion}`, 'http://0.0.0.0');
    targetServiceUrl.port = servicePort.toString();

    this.router.use(basePath, createProxyMiddleware({
      target: targetServiceUrl.toString(),
      changeOrigin: true,
    }));
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
