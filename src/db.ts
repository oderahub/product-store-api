import mongoose from 'mongoose'
import logger from '../config/logger'
import dotenv from 'dotenv'

dotenv.config()

const connectionString = process.env.MongoDb_URI

export const connectDB = async (): Promise<void> => {
  try {
    if (!connectionString) {
      throw new Error('MongoDB connection string is missing in environment variables.')
    }

    await mongoose.connect(connectionString)

    logger.info('Successfully connected to MongoDB')
  } catch (error) {
    logger.error('Failed to connect to MongoDB', { error })
    process.exit(1)
  }
}
