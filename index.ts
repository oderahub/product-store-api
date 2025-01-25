import express, { Request, Response } from 'express'
import { connectDB } from './src/db'
import logger from './config/logger'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

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
