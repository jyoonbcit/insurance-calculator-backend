import { Gateway } from './server/Gateway.js';

import { env } from './env.js';

const HOST = env.HOST;
const PORT = env.GATEWAY_PORT;

const server = new Gateway();
server.start(HOST, PORT);
