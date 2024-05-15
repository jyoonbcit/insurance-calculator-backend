// import path from 'path';

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

  private readonly services: Record<string, URL> = {};
  private readonly router = express.Router();

  constructor() {
    this.app = express();

    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(
      morgan(IS_DEV ? 'dev' : 'combined', {
        stream: {
          write: (msg: string) => logger.info(msg.trim()),
        },
      })
    );

    this.app.use('/api/v1', this.router);

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.get('/healthz', async (_: Request, res: Response) =>
      res.status(200).json({
        data: await this.runHealthCheck(),
      })
    );

    this.app.all('*', (req: Request, res: Response) =>
      res.status(404).json({
        msg: `Route ${req.url} not found.`,
      })
    );
  }

  public registerService(
    basePath: string,
    serviceHost: string,
    servicePort: number,
    serviceApiVersion: number
  ) {
    const targetServiceUrl = new URL(`/api/v${serviceApiVersion}`, serviceHost);
    targetServiceUrl.port = servicePort.toString();

    this.services[basePath] = targetServiceUrl;

    this.router.use(
      basePath,
      createProxyMiddleware({
        target: targetServiceUrl.toString(),
        changeOrigin: true,
        on: {
          error: (err, _, res) => {
            if ('errno' in err && err.errno === -111)
              // @ts-expect-error - REASON: LSP says we can not use .status on res, but runs without error and functions as intended.
              return res.status(504).json({
                data: 'Could not reach service',
              });
          },
        },
      })
    );
  }

  public async runHealthCheck() {
    const report: Record<string, boolean> = {};

    for await (const [name, serviceUrl] of Object.entries(this.services)) {
      serviceUrl.pathname = 'healthz';
      const url = serviceUrl.toString();

      try {
        const response = await fetch(url);

        report[name] = response.status === 200;
      } catch (e) {
        report[name] = false;
      }
    }

    return report;
  }

  public start(host: string, port: number, cb?: () => void) {
    const defaultCb = () => {
      logger.info(
        `Starting gateway on http://${host}:${port} in ${env.NODE_ENV} mode.`
      );
    };

    this.server = this.app.listen(port, host, cb || defaultCb);
  }

  public stop() {
    if (this.server) this.server.close();
  }
}
