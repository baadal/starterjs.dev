import env from 'starter/const/env-values';
import { apiServer } from './api-server';

const PORT_API = env.portApi;
const isSharedServer = PORT_API === env.port;

if (!isSharedServer) apiServer();
