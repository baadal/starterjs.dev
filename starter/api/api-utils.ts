import { Request, Response } from 'express';

import { getHeaderData } from 'api/common/header-data';
import { getFooterData } from 'api/common/footer-data';
import { ServerResponse } from 'starter/core/model/response.model';

// @ts-ignore
import starterConfig from '../../starter.config';

const isPromise = (p: any) => !!p && typeof p.then === 'function';

const promisify = (p: any): Promise<any> => {
  if (!isPromise(p)) {
    return Promise.resolve(p);
  }
  return p;
};

export const sendResponse = async (req: Request, res: Response, data_: any) => {
  const data = await promisify(data_);
  const response: ServerResponse = { status: 'ok', data };
  res.type('json');
  return res.send(response);
};

export const sendPageResponse = async (req: Request, res: Response, pageData_: any) => {
  const instanceRegion = process.env.INSTANCE_REGION;
  const instanceRegionName = process.env.INSTANCE_REGION_NAME;

  const pageData = await promisify(pageData_);

  const { siteTitle } = starterConfig;
  pageData.seo = { siteTitle, ...pageData?.seo };

  const headerData = getHeaderData(req);
  const footerData = getFooterData(req);
  let response: ServerResponse = { status: 'ok', data: { pageData, headerData, footerData } };
  if (instanceRegion) {
    response = { ...response, region: `${instanceRegion}, ${instanceRegionName}` };
  }

  res.type('json');
  return res.send(response);
};
