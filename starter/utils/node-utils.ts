import logger from 'starter/utils/logger';

// npm i -D tsconfig-paths
// ts-node -r tsconfig-paths/register ./starter/api/server.ts

const existsModule = (path: string) => {
  let exists = true;
  try {
    require.resolve(path);
  } catch (e) {
    exists = false;
  }
  return exists;
};

export const commonModule = (file: string) => {
  const file1 = `api/common/${file}`;
  const file2 = `starter/api/common/${file}`;

  let module;
  try {
    if (existsModule(file1)) {
      module = require(file1); // eslint-disable-line
    } else {
      module = require(file2); // eslint-disable-line
    }
  } catch (e) {
    logger.error(e);
    module = null;
  }

  return module;
};
