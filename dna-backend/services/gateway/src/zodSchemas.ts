import z from 'zod';

const NODE_ENV = ['production', 'development'] as const;
const DEFAULT_NODE_ENV: typeof NODE_ENV[number] = 'production';

const DEFAULT_HOST = '0.0.0.0';
const DEFAULT_API_PORT = '3000';

export const envSchema = z.object({
  NODE_ENV: z.enum(NODE_ENV).default(DEFAULT_NODE_ENV),
  HOST: z.string().url().or(z.string().ip()).default(DEFAULT_HOST),
  GATEWAY_PORT: z.string().default(DEFAULT_API_PORT).transform(port => parseInt(port, 10)),
});
