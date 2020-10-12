import { of, forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

import HttpClient from 'starter/core/services/http-client';
import { findRoute } from 'starter/core/routes/routes-provider';
import env from 'starter/const/env-values';
import { GenericRequest } from 'starter/core/model/common.model';
import { InitialData } from 'starter/core/model/response.model';
import logger from 'starter/utils/logger';

const getSourceData = <T = any>(req: GenericRequest | null, res?: Response) => {
  const path = req?.path || '';
  const route = findRoute(path);

  if (res && route?.name === 'not-found') {
    res.locals.notFound = true;
  }

  if (!route) {
    logger.error(`[Unexpected error] route: ${route}`);
    return of(null);
  }
  if (!route.source) {
    logger.error(`Missing route source: ${route.source}`);
    return of(null);
  }

  let { source } = route;
  if (req?.params) {
    Object.entries<string>(req?.params).forEach(([key, value]) => {
      source = source.replace(`:${key}`, value) || '';
    });
  }

  if (source.includes(':')) {
    logger.warn('Final source URL must not include template variables/params.', source);
  }

  if (!env.apiBaseUrl) {
    logger.warn('Unable to construct full URL:', source);
  }

  if (env.apiBaseUrl && source) {
    return HttpClient.get<InitialData<T>>(`${env.apiBaseUrl}${source}?path=${req?.path}`);
  }
  return of(null);
};

export const getInitialData = <T = any>(req: GenericRequest | null, res?: Response): Observable<InitialData<T> | null> => {
  return forkJoin([getSourceData<T>(req, res)]).pipe(
    map(result => ({
      pageData: result[0]?.pageData ?? null,
      headerData: result[0]?.headerData ?? null,
      footerData: result[0]?.footerData ?? null,
    }))
  );
};
