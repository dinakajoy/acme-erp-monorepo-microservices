import session from 'express-session';
import { createClient } from 'redis';
import ConnectRedisSessions from 'connect-redis';
import logger from './logger';

const RedisStore = ConnectRedisSessions(session);
const redisClient = createClient();

const sessionStore = new RedisStore({ client: redisClient });

sessionStore.on('error', (error) => {
  logger.info(error);
});

export default sessionStore;
