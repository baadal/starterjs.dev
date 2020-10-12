import { GenericRequest } from 'starter/core/model/common.model';

export const getPageName = (req: GenericRequest) => {
  const path = `${req.baseUrl}${req.path}`;
  const prefix = '/api/pages/';
  if (path.startsWith(prefix)) {
    return path.substr(prefix.length);
  }
  return null;
};
