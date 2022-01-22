import * as dotenv from 'dotenv'
import express, { Application, ErrorRequestHandler } from 'express'
import cors from 'cors'
import Helmet from 'helmet'
dotenv.config({ path: __dirname + '/../.env' })

import morgan from './middlewares/morgan'
import router from './routes'

const app: Application = express()
const port = process.env.PORT || 8000 // default port to listen

app.use(Helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan)

// Enable cors
app.use(cors())

// Mount routes here
app.use('/', router)

// Handling errors
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send({ error: 'Something went wrong!' })
}
app.use(errorHandler)

app.listen(port, () => {
  console.log(`The application is listening on port ${port}!`)
})

export default app