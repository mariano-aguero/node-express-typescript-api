import * as dotenv from 'dotenv'
import Express from 'express'
import Http from 'http'
import { Server, Socket } from 'socket.io'
import BeeQueue from 'bee-queue'

dotenv.config({ path: __dirname + '/../.env' })

import { queue } from './config/queue'
import { SOCKET_ALLOWED_ORIGINS, SOCKET_PORT } from './config/constants'

const app = Express()

// Create http server
const httpServer = new Http.Server(app)

const io = new Server(httpServer, {
  transports: ['websocket'],
  cors: {
    origin: SOCKET_ALLOWED_ORIGINS
  }
})

// Socket events
io.on('connect', (socket: Socket) => {
  console.log('User connected', socket.id)

  socket.on('login', ({ address }) => {
    console.log(`User ${socket.id} connected to the room ${address}`)
    socket.join(address)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id)
  })
})

// Queue events
queue.on('error', (err) => {
  console.log(`A queue error happened: ${err.message}`)
})
queue.on('failed', (job, err) => {
  console.log(`Job ${job.id} failed with error ${err.message}`)
  console.log(err)
})

queue.on('ready', () => {
  queue.process((job: BeeQueue.Job<any>, done: BeeQueue.DoneCallback<any>) => {
    if (!job.data) {
      return done(new Error('No data specified.'))
    }
    const timeElapsed = Date.now()
    const today = new Date(timeElapsed)

    console.log(`Processing job: ${job.id} - ${JSON.stringify(job.data)} - ${today.toUTCString()}`)

    // Step1: Process the job
    // TODO: Do something here
    const data = {
      dummy: 'test'
    }

    // Step2: Emit the message
    const address = '0x' // TODO change the room
    const emitted = io.to(address).emit('Done', data)

    console.log(`Socket message emitted "${emitted}"`)

    setTimeout(() => {
      done(null, undefined)
    }, 10)
  })
})

// Expose the socket
httpServer.listen(SOCKET_PORT, () => {
  console.log(`The application is listening on port ${SOCKET_PORT}!`)
})

export { httpServer, io }
