import mongoose from 'mongoose'
import logger from './logger'
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI

export const connectDB = async (): Promise<void> => {
  try {
    if (!MONGO_URI) {
      throw new Error('MongoDB connection string is missing in environment variables.')
    }

    await mongoose.connect(MONGO_URI)
    logger.info('Successfully connected to MongoDB')
  } catch (error) {
    logger.error('Failed to connect to MongoDB', { error })
    process.exit(1)
  }
}
