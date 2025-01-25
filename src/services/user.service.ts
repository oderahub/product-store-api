import { Model } from 'mongoose'
import { IUser, IUserService } from '../interfaces/user.interface'
import { IUserDocument, User } from '../models/user.model'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { BaseService } from './base.service'
import { ErrorMessages, UserRoles } from '../constants'
import { createUserSchema, loginUserSchema } from '../validators/user.validator'
import { validateSchema } from '../utiles/helper'
import { Product } from '../models/product.model'

export class UserService
  extends BaseService<IUserDocument, Model<IUserDocument>>
  implements IUserService
{
  constructor() {
    super(User)
  }

  async createUser(user: IUser): Promise<IUser> {
    validateSchema(user, createUserSchema, 'createUser')

    if (await this.model.findOne({ email: user.email })) {
      throw new Error(ErrorMessages.USER_ALREADY_EXISTS)
    }

    const hashedPassword = await bcrypt.hash(user.password, 10)
    const newUser = new this.model({ ...user, password: hashedPassword })
    await newUser.save()

    if (user.role === UserRoles.ADMIN) {
      await this.model.updateMany(
        { _id: { $ne: newUser._id }, role: UserRoles.ADMIN },
        { $set: { role: UserRoles.USER } }
      )
    }

    return newUser.toObject({ versionKey: false })
  }

  async getUserById(id: string): Promise<IUser | null> {
    const user = await this.findById(id)
    return user ? { ...user.toObject(), password: undefined } : null
  }

  async updateUser(id: string, user: Partial<IUser>): Promise<IUser | null> {
    const existingUser = await this.validateExistence(
      await this.findById(id),
      ErrorMessages.USER_NOT_FOUND
    )

    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10)
    }

    if (user.role === UserRoles.ADMIN && existingUser.role !== UserRoles.ADMIN) {
      await this.model.updateMany(
        { _id: { $ne: id }, role: UserRoles.ADMIN },
        { $set: { role: UserRoles.USER } }
      )
    }

    return await this.model
      .findByIdAndUpdate(id, user, { new: true, fields: { username: 1, role: 1 } })
      .lean()
      .exec()
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.validateExistence(
      await this.model.findByIdAndDelete(id).exec(),
      ErrorMessages.USER_NOT_FOUND
    )
    if (user.role !== UserRoles.ADMIN) {
      await Product.deleteMany({ owner: id })
    }
  }

  async login(username: string, password: string): Promise<{ userId: string; token: string }> {
    validateSchema({ username, password }, loginUserSchema, 'login')

    const user = await this.model.findOne({ username })
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error(ErrorMessages.INCORRECT_LOGIN_CREDENTIALS)
    }

    const token = jwt.sign(
      { userId: user._id.toString(), role: user.role }, // Corrected type assertion for _id
      process.env.TOKEN_SECRET as string
    )
    return { userId: user._id.toString(), token }
  }

  private productModel = Product
}
