import { checkProd, checkServer } from 'starter/utils/env';
import { EnvValues } from 'starter/core/model/common.model';
import { DEFAULT_PORT, DEFAULT_PORT_API } from './values';

const values: EnvValues = {
  port: process.env.PORT || DEFAULT_PORT,
  portApi: process.env.PORT_API || DEFAULT_PORT_API,
  apiBaseUrl: process.env.API_BASE_URL || '',
  apiBasePublicUrl: process.env.API_BASE_URL || '',
  assetsBaseUrl: process.env.ASSETS_BASE_URL || '',
};

const isProd = checkProd();
const isServer = checkServer();

if (!isServer && values.port === values.portApi) {
  values.apiBaseUrl = window.location.origin;
}

if (!values.apiBaseUrl) {
  if (typeof window !== 'undefined' && window.location.origin.includes(values.port)) {
    values.apiBaseUrl = window.location.origin.replace(values.port, values.portApi);
  } else {
    values.apiBaseUrl = `http://localhost:${values.portApi}`;
  }
}
values.apiBasePublicUrl = values.apiBaseUrl;

if (isProd && isServer) {
  values.apiBaseUrl = `http://localhost:${values.portApi}`;
}

export default values;
