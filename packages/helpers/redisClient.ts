import { createClient } from 'redis';
import logger from './logger';

const redisClient = createClient();
redisClient.connect();
redisClient.on('connect', () => logger.info('Redis Connected!'));
redisClient.on('error', (err) => logger.error('Redis Client Error', err));

export default redisClient;
