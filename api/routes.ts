import { Express } from 'express';

import { sendResponse, sendPageResponse } from 'starter/api/api-utils';
import { defaultInfo, defaultError } from './common/default-data';
import { homePageData } from './pages/home/home.api';
import { aboutPageData } from './pages/about/about.api';
import { docsPageData } from './pages/docs/docs.api';
import { notFoundPageData } from './pages/not-found/not-found.api';

export const apiRoutes = (app: Express) => {
  app.get('/api/pages/about', (req, res) => sendPageResponse(req, res, aboutPageData()));
  app.get('/api/pages/docs', (req, res) => sendPageResponse(req, res, docsPageData()));
  app.get('/api/pages/home', (req, res) => sendPageResponse(req, res, homePageData()));
  app.get('/api/pages/not-found', (req, res) => sendPageResponse(req, res, notFoundPageData()));

  app.get('/', (req, res) => sendResponse(req, res, defaultInfo));
  app.get('/*', (req, res) => {
    res.status(404);
    sendResponse(req, res, defaultError);
  });
};
