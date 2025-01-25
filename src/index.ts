import express, { Request, Response } from 'express'
import { connectDB } from './config/db'
import logger from './config/logger'
import dotenv from 'dotenv'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import rateLimit from 'express-rate-limit'
import authRoute from './routes/auth.route'
import productRoute from './routes/ product.route'
import userRoute from './routes/user.route'
import { errorHandler } from './middlewares/error.middleware'

dotenv.config()

const app = express()

app.use(helmet())

// Middleware for parsing JSON
app.use(bodyParser.json())

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per windowMs
})

app.use('/api/', apiLimiter)

// Routes
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/products', productRoute)
app.use('/api/v1/users', userRoute)

// Error handling middleware
app.use(errorHandler)
const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Store API!')
})

app.listen(port, async () => {
  try {
    await connectDB()
    logger.info(`app is running on ${port}...`)
  } catch (error) {
    logger.error('Failed to connect to Database')
  }
})
