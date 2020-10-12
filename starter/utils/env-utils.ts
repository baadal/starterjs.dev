import path from 'path';

import { existsFile } from '../lib/file-io';

export const envFile = (file: string) => {
  const file1 = file;
  const file2 = `env/${file}`;
  const file3 = `starter/env/${file}`;

  let filename = file3;
  if (existsFile(path.resolve(process.cwd(), file1), true)) {
    filename = file1;
  } else if (existsFile(path.resolve(process.cwd(), file2), true)) {
    filename = file2;
  }

  return filename;
};

export const commonFile = (file: string) => {
  const file1 = `web/common/${file}`;
  const file2 = `starter/web/common/${file}`;

  let filename = file2;
  if (existsFile(path.resolve(process.cwd(), file1), true)) {
    filename = file1;
  }

  return filename;
};
