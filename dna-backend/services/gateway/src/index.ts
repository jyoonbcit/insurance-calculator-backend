import { Gateway } from './server/Gateway.js';

import { env } from './env.js';

const { HOST } = env;
const PORT = env.GATEWAY_PORT;

const { ADVISOR_HOST, ADVISOR_PORT, ADVISOR_VERSION } = env;

const server = new Gateway();
server.registerService('/advisor', ADVISOR_HOST, ADVISOR_PORT, ADVISOR_VERSION);
server.start(HOST, PORT);
