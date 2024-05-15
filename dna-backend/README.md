# Dynamic Needs Analysis Api

## Prequisites

- **Node**: 20+
- **Npm**: 9.6.7

## Setup

1. **Install Root-Level Dependencies**: `npm install`
2. **Install Services and Packages Dependencies**: `npm install -ws`
3. **Adjust Environment Variables (Optional)**: Edit `.env` if needed
4. **Run All Services**: `npm run -w services start:dev`
5. **Access the Api Gateway**: `http://0.0.0.0:3000`

## Gateway

The Gateway is the centralized entrypoint for all microservices by acting as a proxy for incoming requests and passing it to the appropriate service based on the url base path.

### Responsibilities

- **Proxy**: Act as middleman between users and microservices
- **Authentication**: Ensure incoming requests have the required privileges to access particular microservices

### Accessing Gateway

By default, the gateway can be accessed by http://0.0.0.0:3000.

To access microservices, for example the Advisor, you can visit http://0.0.0.0:3000/api/v1/advisor followed by any of the advisor endpoints.

## Services

### Creating New Service

All services must follow the requirements below to be compatible with the Api Gateway:

1. Implement a health-check route at `/healthz` that returns a status code of 200 if healthy and any other code if not
2. All routes (excluding health-check) must be prefixed with an api version: `/api/v1` where `1` is any positive integer greater than the last

Add the new service to the `package.json` workspaces list:

```json
  "workspaces": [
    "services/gateway",
+   "services/advisor",
    "packages/logger"
  ]
```

### Service Registration

The service must then be registered to the gateway in `services/gateway/src/index.ts`:

```typescript
// services/gateway/src/zodSchemas.ts
  export const envSchema = z.object({
    NODE_ENV: z.enum(NODE_ENV).default(DEFAULT_NODE_ENV),
    HOST: z.string().url().or(z.string().ip()).default(DEFAULT_HOST),
    GATEWAY_PORT: z.string().default(DEFAULT_API_PORT).transform(port => parseInt(port, 10)),
+   ADVISOR_PORT: z.string().default(DEFAULT_ADVISOR_PORT).transform(port => parseInt(port, 10)),
  });

// services/gateway/src/index.ts
  /* [...] */

+ const ADVISOR_VERSION = 1;
+ const ADVISOR_PORT = env.ADVISOR_PORT;

  const server = new Gateway();
+ server.registerService('/advisor', ADVISOR_PORT, ADVISOR_VERSION);
  server.start(HOST, PORT);
```
