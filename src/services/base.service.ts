import { Model, Types } from 'mongoose'
import { ErrorMessages } from '../constants'

export abstract class BaseService<T extends { _id: Types.ObjectId | string }, U extends Model<T>> {
  protected constructor(protected model: U) {}

  protected async findById(id: string | Types.ObjectId): Promise<T | null> {
    return await this.model.findById(id).exec()
  }

  protected async validateExistence(item: T | null, message: ErrorMessages): Promise<T> {
    if (!item) throw new Error(message)
    return item
  }
}
