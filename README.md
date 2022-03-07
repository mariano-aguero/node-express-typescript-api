# API-Boilerplate

How to make it work:
- Execute yarn install
- Install redis on you computer, check the port to be used in the next step
- Create and .env file with the following information for a development stage
```
NODE_ENV=development
PORT=4000
SOCKET_PORT=3001
QUEUE_NAME='QUEUE'
REDIS_DB_HOST='127.0.0.1'
REDIS_DB_PORT='6379'
REDIS_DB_PASSWORD=''
SOCKET_ALLOWED_ORIGINS='http://localhost:4000,http://localhost:3000'
```
- Execute in one terminal the API with this command:
```
yarn start
```
- Execute in another terminal the worker:
```
yarn worker
```