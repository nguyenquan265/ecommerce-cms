import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import ApiError from './utils/ApiError'
import errorHandler from './middlewares/error.middleware'
import router from './routes'

const app = express()

const allowedOrigins = [process.env.CLIENT_URL, process.env.CLIENT_URL2]

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req: Request, res: Response) => {
  res.status(200).send({ message: 'Server is running' })
})
app.use('/api/v1', router)
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(404, `Can't find ${req.originalUrl} on this server!`))
})

app.use(errorHandler)

export default app
