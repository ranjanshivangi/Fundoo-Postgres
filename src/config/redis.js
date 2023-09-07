import {createClient} from 'redis';
import logger from './logger';

export const client = createClient();

const redis = async () => {
  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect();
  //client.get
  
  logger.info(`connection successful for redis database -${client.isReady}`);
};
export default redis;
