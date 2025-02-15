import mongoose, { Document, Model, Types } from 'mongoose'
import { IUser } from '../interfaces/user.interface'
import { UserRoles } from '../constants'
import bcrypt from 'bcryptjs'

export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId
  comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema = new mongoose.Schema<IUserDocument>({
  email: { type: String, required: true, unique: true, index: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(UserRoles), default: UserRoles.USER },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error: any) {
    next(error)
  }
})

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password)
}

export const User: Model<IUserDocument> = mongoose.model<IUserDocument>('User', userSchema)
