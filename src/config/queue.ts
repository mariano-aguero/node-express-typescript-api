import BeeQueue from 'bee-queue'

import { QUEUE_NAME, REDIS_DB_HOST, REDIS_DB_PORT, REDIS_DB_PASSWORD } from './constants'

let options: BeeQueue.QueueSettings = {
  isWorker: true,
  sendEvents: false,
  redis: {
    host: REDIS_DB_HOST,
    port: REDIS_DB_PORT
  }
}

if (REDIS_DB_PASSWORD) {
  options.redis = {
    ...options.redis,
    password: REDIS_DB_PASSWORD
  }
}

export const queue = new BeeQueue(QUEUE_NAME, options)