import { Request, Response } from 'express';
import { Observable } from 'rxjs';

import { serverRender } from 'starter/ssr/server';
import { getBuildHash } from 'starter/utils/env';
import { InitialData, StarterInfo } from 'starter/core/model/response.model';
import { checkESModulesSupport } from './utils';
import { getUserAgentInfo } from './server-utils';
import { template } from './template';

const sendServerResponse = (response: string, res: Response, req: Request, contentType = 'text/html') => {
  if (res.locals.notFound) {
    res.status(404);
  }

  res.header('Content-Type', contentType);

  // disallow caching of html pages
  if (contentType === 'text/html') {
    // Browser back/forward navigations retrieve stuff from the cache without revalidation.
    // Bug: https://bugs.chromium.org/p/chromium/issues/detail?id=516846
    // res.setHeader('Cache-Control', 'no-cache');

    // Ref: https://dev.to/jamesthomson/spas-have-your-cache-and-eat-it-too-iel
    // Ref: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#preventing_caching
    res.setHeader('Cache-Control', 'no-store, max-age=0');
  }

  res.send(response);
};

const serverResponse = (req: Request, res: Response, initialData: InitialData | null) => {
  const starterInfo: StarterInfo = {
    version: process.env.npm_package_version || '',
    build_hash: getBuildHash(),
    build_time: process.env.BUILD_TIME || '',
    timestamp: new Date().toISOString(),
    path: req.path,
    query: req.query || '',
  };

  const userAgent = req.headers['user-agent'] || '';
  const userAgentInfo = getUserAgentInfo(userAgent);
  const esmSupported = checkESModulesSupport(userAgentInfo);

  const { content, scriptElems, styleElems, linkElems } = serverRender(req.url, initialData, esmSupported);
  const response = template(content, scriptElems, styleElems, linkElems, initialData, starterInfo);
  sendServerResponse(response, res, req);
};

export const sendResponse = (req: Request, res: Response, initialData$: Observable<InitialData | null>) => {
  initialData$.subscribe(initialData => {
    serverResponse(req, res, initialData);
  });
};
