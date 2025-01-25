import mongoose, { Document, Model, Types } from 'mongoose'
import { IProduct } from '../interfaces/product.interface'

export interface IProductDocument extends IProduct, Document {
  _id: Types.ObjectId
}

const productSchema = new mongoose.Schema<IProductDocument>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  category: { type: String, required: true, index: true },
  createdAt: { type: Date, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

// Create indexes for query efficiency
productSchema.index({ name: 'text', description: 'text' })
productSchema.index({ price: 1 })
productSchema.index({ createdAt: 1 })

export const Product: Model<IProductDocument> = mongoose.model<IProductDocument>(
  'Product',
  productSchema
)
