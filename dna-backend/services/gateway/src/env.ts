import { fromZodError } from 'zod-validation-error';

import { envSchema } from './zodSchemas.js';

const result = envSchema.safeParse(process.env);

if (result.error) throw fromZodError(result.error);

export const env = result.data;
