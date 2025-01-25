import { Model } from 'mongoose'
import { IProduct, IProductService } from '../interfaces/product.interface'
import { IProductDocument, Product } from '../models/product.model'
import { createProductSchema, updateProductSchema } from '../validators/product.validator'
import { BaseService } from './base.service'
import { ErrorMessages } from '../constants'
import { validateSchema, checkOwnership } from '../utiles/helper'
import { Types } from 'mongoose'

export class ProductService
  extends BaseService<IProductDocument, Model<IProductDocument>>
  implements IProductService
{
  constructor() {
    super(Product)
  }

  async createProduct(product: IProduct, userId: string): Promise<IProduct> {
    if (await this.model.findOne({ name: product.name, category: product.category })) {
      throw new Error(ErrorMessages.PRODUCT_ALREADY_EXISTS)
    }

    validateSchema(product, createProductSchema, 'createProduct')

    const newProduct = new this.model({ ...product, owner: userId })
    return await newProduct.save()
  }

  async getProducts(query: any = {}): Promise<IProduct[]> {
    return await this.model.find(query).populate('owner', 'username role').lean().exec()
  }

  async getProductById(id: string): Promise<IProduct | null> {
    return await this.model.findById(id).populate('owner', 'username role').lean().exec()
  }

  async updateProduct(
    id: string | Types.ObjectId,
    product: Partial<IProduct>,
    userId: string,
    userRole: string
  ): Promise<IProduct | null> {
    const existingProduct = await this.findById(id)
    await this.validateExistence(existingProduct, ErrorMessages.PRODUCT_NOT_FOUND)

    checkOwnership(
      existingProduct!.owner.toString(),
      userId,
      userRole,
      ErrorMessages.NOT_PRODUCT_OWNER
    )

    validateSchema(product, updateProductSchema, 'updateProduct')

    return await this.model
      .findByIdAndUpdate(id, product, {
        new: true,
        fields: { name: 1, price: 1, description: 1, category: 1, owner: 1 }
      })
      .lean()
      .exec()
  }

  async deleteProduct(
    id: string | Types.ObjectId,
    userId: string,
    userRole: string
  ): Promise<void> {
    const existingProduct = await this.findById(id)
    await this.validateExistence(existingProduct, ErrorMessages.PRODUCT_NOT_FOUND)

    checkOwnership(
      existingProduct!.owner.toString(),
      userId,
      userRole,
      ErrorMessages.NOT_PRODUCT_OWNER
    )

    await this.model.findByIdAndDelete(id).exec()
  }
}
