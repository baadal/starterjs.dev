import path from 'path';
import express, { Express } from 'express';
import compression from 'compression';
import chalk from 'chalk';

// @ts-ignore
import cors from 'cors';

import { apiRoutes } from 'api/routes';
import { sendResponse } from 'starter/api/api-utils';
import { userAgentData } from 'starter/api/internal/user-agent';
import { initApiServer } from 'starter/ssr/server-utils';
import env from 'starter/const/env-values';
import logger from 'starter/utils/logger';

const PORT_API = env.portApi;
const isSharedServer = PORT_API === env.port;

const apiRouter = () => {
  const router = express.Router();
  const appTmp = express();
  apiRoutes(appTmp);

  appTmp._router.stack.forEach((r: any) => {
    if (r.route && r.route.path) {
      const route = r.route.stack[0];
      if (r.route.stack.length > 1) {
        logger.warn(`[WARN] Route stack length > 1 is not supported. [stack.length: ${r.route.stack.length}]`);
      }

      const origPath = r.route.path;
      const { handle, method } = route;

      let routePath;
      if (origPath.startsWith('/api/')) {
        routePath = origPath.substr(4);
      } else if (origPath === '/*') {
        routePath = origPath;
      } else {
        return; // ignore route
      }

      switch (method) {
        case 'get':
          router.get(routePath, handle);
          break;
        case 'post':
          router.post(routePath, handle);
          break;
        default:
          logger.warn(`[WARN] Unhandled route method: ${method}`);
      }
    }
  });

  return router;
};

export const apiServer = (sharedServer?: Express) => {
  const app = sharedServer || express();

  // hide powered by express
  app.disable('x-powered-by');

  app.use('/api/*', cors());
  app.use('/api/*', compression());

  // disallow caching of api requests
  app.use('/api/*', (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    return next();
  });

  app.set('json spaces', 2);

  app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), 'build/public/favicon.ico'));
  });

  app.get('/api/internal/user-agent', (req, res) => sendResponse(req, res, userAgentData(req)));

  if (isSharedServer) {
    const router = apiRouter();
    app.use('/api', router);

    console.log(`\nAPI running at port ${PORT_API} 🎉 ${chalk.bold('[shared port]')}\n`);
    initApiServer();
  } else {
    apiRoutes(app);

    app.listen(PORT_API, () => {
      console.log(`\nAPI running at port ${PORT_API} 🎉\n`);
      initApiServer();
    });
  }
};
