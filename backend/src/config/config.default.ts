import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1721560563634_3765',
  koa: {
    port: 7001,
  },
  cors: {
    origin: '*'
  },
} as MidwayConfig;
