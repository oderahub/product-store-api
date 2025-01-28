import { Request, Response } from 'express'
import { ProductService } from '../services/product.service'
import { IProduct } from '../interfaces/product.interface'
import { BaseController } from './base.controller'
import { ErrorMessages, SuccessMessages, HTTP_STATUS } from '../constants'

export class ProductController extends BaseController<IProduct> {
  private productService: ProductService

  constructor() {
    super()
    this.productService = new ProductService()
  }

  public createProduct = this.asyncWrapperHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId

    if (!userId) {
      return this.handleError(
        res,
        new Error(ErrorMessages.UNAUTHENTICATED_USER),
        HTTP_STATUS.UNAUTHORIZED
      )
    }
    try {
      const product = await this.productService.createProduct(req.body, userId)
      this.handleResponse(res, SuccessMessages.PRODUCT_CREATED, product, HTTP_STATUS.CREATED)
    } catch (error: any) {
      this.handleError(res, error)
    }
  })

  public getProducts = this.asyncWrapperHandler(async (req: Request, res: Response) => {
    try {
      const { products, total } = await this.productService.getProducts(req.query)
      if (products.length === 0) {
        return this.handleResponse(
          res,
          'No products found',
          { products: [], total: 0 },
          HTTP_STATUS.NOT_FOUND
        )
      }
      this.handleResponse<{ products: IProduct[]; total: number }>(
        res,
        SuccessMessages.PRODUCTS_RETRIEVED,
        { products, total }
      )
    } catch (error: any) {
      if (error.message === 'Invalid page number' || error.message === 'Invalid limit') {
        this.handleError(res, error, HTTP_STATUS.BAD_REQUEST)
      } else {
        this.handleError(res, error)
      }
    }
  })

  public getProductById = this.asyncWrapperHandler(async (req: Request, res: Response) => {
    try {
      const product = await this.productService.getProductById(req.params.id)
      if (!product) {
        return this.handleError(
          res,
          new Error(ErrorMessages.PRODUCT_NOT_FOUND),
          HTTP_STATUS.NOT_FOUND
        )
      }
      this.handleResponse(res, SuccessMessages.PRODUCTS_RETRIEVED, product)
    } catch (error: any) {
      this.handleError(res, error)
    }
  })

  public updateProduct = this.asyncWrapperHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId
    const userRole = req.user?.role

    if (!userId || !userRole) {
      return this.handleError(
        res,
        new Error(ErrorMessages.UNAUTHENTICATED_USER),
        HTTP_STATUS.UNAUTHORIZED
      )
    }
    try {
      const product = await this.productService.updateProduct(
        req.params.id,
        req.body,
        userId,
        userRole
      )
      if (!product) {
        return this.handleError(
          res,
          new Error(ErrorMessages.PRODUCT_NOT_FOUND),
          HTTP_STATUS.NOT_FOUND
        )
      }
      this.handleResponse(res, SuccessMessages.PRODUCT_UPDATED, product)
    } catch (error: any) {
      if (error.message === ErrorMessages.NOT_PRODUCT_OWNER) {
        this.handleError(res, error, HTTP_STATUS.FORBIDDEN)
      } else {
        this.handleError(res, error)
      }
    }
  })

  public deleteProduct = this.asyncWrapperHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId
    const userRole = req.user?.role

    if (!userId || !userRole) {
      return this.handleError(
        res,
        new Error(ErrorMessages.UNAUTHENTICATED_USER),
        HTTP_STATUS.UNAUTHORIZED
      )
    }
    try {
      await this.productService.deleteProduct(req.params.id, userId, userRole)
      this.handleResponse(res, SuccessMessages.PRODUCT_DELETED, HTTP_STATUS.NO_CONTENT)
    } catch (error: any) {
      if (error.message === ErrorMessages.NOT_PRODUCT_OWNER) {
        this.handleError(res, error, HTTP_STATUS.FORBIDDEN)
      } else {
        this.handleError(res, error)
      }
    }
  })
}
