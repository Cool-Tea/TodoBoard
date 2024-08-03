import { MidwayConfig } from '@midwayjs/core';
import { tmpdir } from 'os';
import { join } from 'path';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1721560563634_3765',
  koa: {
    port: 7001,
  },
  cors: {
    origin: '*',
    exposeHeaders: [
      'Content-Disposition',
    ],
  },
  upload: {
    mode: 'file',
    fileSize: '10mb',
    whitelist: [
      '.pdf',
      '.jpg',
      '.jpeg',
      '.png',
      '.gif',
      '.bmp',
      '.wbmp',
      '.webp',
      '.tif',
      '.psd',
      '.svg',
      '.js',
      '.jsx',
      '.json',
      '.css',
      '.less',
      '.html',
      '.htm',
      '.xml',
      '.pdf',
      '.zip',
      '.gz',
      '.tgz',
      '.gzip',
      '.mp3',
      '.mp4',
      '.avi',
      '.txt',
    ],
    tmpdir: join(tmpdir(), 'midway-upload-files'),
    cleanTimeout: 5 * 60 * 1000,
    base64: false,
    match: '/task/upload',
  },
} as MidwayConfig;
