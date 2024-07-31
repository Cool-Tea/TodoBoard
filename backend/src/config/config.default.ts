import { MidwayConfig } from '@midwayjs/core';
import { uploadWhiteList } from '@midwayjs/upload';
import { tmpdir } from 'os';
import { join } from 'path';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1721560563634_3765',
  koa: {
    port: 7001,
  },
  cors: {
    origin: '*'
  },
  upload: {
    mode: 'file',
    fileSize: '100mb',
    whitelist: uploadWhiteList.filter(ext => ext !== '.pdf'),
    tmpdir: join(tmpdir(), 'midway-upload-files'),
    cleanTimeout: 5 * 60 * 1000,
    base64: false,
    match: '/task/upload',
  },
} as MidwayConfig;
