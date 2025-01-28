// import { Types } from 'mongoose'

// export interface IProduct {
//   name: string
//   price: number
//   description?: string
//   category: string
//   createdAt?: Date
//   owner: Types.ObjectId | string
// }

// export interface IProductService {
//   createProduct(product: IProduct, userId: string): Promise<IProduct>
//   getProducts(query: any): Promise<IProduct[]>
//   getProductById(id: string): Promise<IProduct | null>
//   updateProduct(
//     id: string | Types.ObjectId,
//     product: Partial<IProduct>,
//     userId: string,
//     userRole: string
//   ): Promise<IProduct | null>
//   deleteProduct(id: string | Types.ObjectId, userId: string, userRole: string): Promise<void>
// }

import { Types } from 'mongoose'

export interface IProduct {
  name: string
  price: number
  description?: string
  category: string
  createdAt?: Date
  owner: Types.ObjectId | string
}

export interface IProductService {
  createProduct(product: IProduct, userId: string): Promise<IProduct>
  getProducts(query: any): Promise<{ products: IProduct[]; total: number }>
  getProductById(id: string): Promise<IProduct | null>
  updateProduct(
    id: string | Types.ObjectId,
    product: Partial<IProduct>,
    userId: string,
    userRole: string
  ): Promise<IProduct | null>
  deleteProduct(id: string | Types.ObjectId, userId: string, userRole: string): Promise<void>
}
