export const NODE_ENV = process.env.NODE_ENV || 'development'
export const PORT = process.env.PORT || 8000
export const SOCKET_PORT = process.env.SOCKET_PORT || 3001
export const QUEUE_NAME = process.env.QUEUE_NAME || 'QUEUE'
export const REDIS_DB_HOST = process.env.DB_HOST || ''
export const REDIS_DB_PORT = process.env.DB_PORT || ''
export const REDIS_DB_PASSWORD = process.env.DB_PASS || ''
export const SOCKET_ALLOWED_ORIGINS =
  (process.env.SOCKET_ALLOWED_ORIGINS + '').split(',') || 'http://localhost:3000'
