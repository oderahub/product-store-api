import express, { Request, Response } from 'express'
import { connectDB } from './config/db'
import logger from './config/logger'
import dotenv from 'dotenv'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import rateLimit from 'express-rate-limit'
import cors from 'cors'
import authRoute from './routes/auth.route'
import productRoute from './routes/product.route'
import userRoute from './routes/user.route'
import { errorHandler } from './middlewares/error.middleware'
import { cleanEnv, str, port } from 'envalid'
import 'express-async-errors'

dotenv.config()

// Validate environment variables
const env = cleanEnv(process.env, {
  PORT: port({ default: 3000 }),
  MONGO_URI: str(),
  JWT_SECRET: str()
})

const app = express()

// Middleware
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100 // Limit each IP to 100 requests per windowMs
})
app.use('/api/', apiLimiter)

// Logging middleware
app.use((req: Request, res: Response, next) => {
  logger.info(`${req.method} ${req.url}`)
  next()
})

// Routes
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/products', productRoute)
app.use('/api/v1/users', userRoute)

// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to the Store API!',
    routes: {
      auth: '/api/v1/auth',
      products: '/api/v1/products',
      users: '/api/v1/users'
    }
  })
})

// Error handling middleware
app.use(errorHandler)

// Start server
const start = async () => {
  try {
    await connectDB()
    const server = app.listen(env.PORT, () => {
      logger.info(`App is running on ${env.PORT}...`)
    })

    // Graceful shutdown
    process.on('SIGTERM', () => {
      logger.info('SIGTERM received. Shutting down gracefully...')
      server.close(() => {
        logger.info('Server closed.')
        process.exit(0)
      })
    })

    process.on('SIGINT', () => {
      logger.info('SIGINT received. Shutting down gracefully...')
      server.close(() => {
        logger.info('Server closed.')
        process.exit(0)
      })
    })
  } catch (error) {
    logger.error('Failed to connect to Database')
    process.exit(1)
  }
}

start()
