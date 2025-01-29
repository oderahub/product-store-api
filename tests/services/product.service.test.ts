import { Request, Response } from 'express'
import { SuccessMessages } from '../../src/constants'
import { ProductController } from '../../src/controllers/product.controller'
import { ProductService } from '../../src/services/product.service'
import { IProduct } from '../../src/interfaces/product.interface'

jest.mock('../../src/services/product.service')

// Define a custom interface that includes the user property
interface CustomRequest extends Request {
  user?: {
    userId: string
    role: string
  }
}

describe('ProductController', () => {
  let controller: ProductController
  let mockReq: Partial<CustomRequest>
  let mockRes: Partial<Response>

  beforeEach(() => {
    controller = new ProductController()
    mockReq = {}
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('createProduct', () => {
    it('should create a product if user is authenticated', async () => {
      mockReq.user = { userId: '123', role: 'user' }
      mockReq.body = { name: 'Test Product', price: 100 }
      ;(ProductService.prototype.createProduct as jest.Mock).mockResolvedValue({} as IProduct)

      await controller.createProduct(mockReq as Request, mockRes as Response, jest.fn())

      expect(mockRes.status).toHaveBeenCalledWith(201)
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Product created successfully',
        data: {}
      })
    })

    it('should return unauthorized if no user id', async () => {
      await controller.createProduct(mockReq as Request, mockRes as Response, jest.fn())

      expect(mockRes.status).toHaveBeenCalledWith(401)
      // expect(mockRes.json).toHaveBeenCalledWith({ message: 'User is not authenticated' })
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'You must be logged in to perform this operation'
      })
    })
  })

  describe('getProducts', () => {
    it('should fetch products', async () => {
      mockReq.query = {}
      ;(ProductService.prototype.getProducts as jest.Mock).mockResolvedValue({
        products: [],
        total: 0
      })

      await controller.getProducts(mockReq as Request, mockRes as Response, jest.fn())

      expect(mockRes.status).toHaveBeenCalledWith(404)
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'No products found',
        data: { products: [], total: 0 }
      })
    })
  })

  describe('getProductById', () => {
    it('should return product by ID', async () => {
      mockReq.params = { id: '123' }
      ;(ProductService.prototype.getProductById as jest.Mock).mockResolvedValue({
        id: '123',
        name: 'Test Product'
      })

      await controller.getProductById(mockReq as Request, mockRes as Response, jest.fn())

      expect(mockRes.status).toHaveBeenCalledWith(200)
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Products retrieved successfully',
        data: { id: '123', name: 'Test Product' }
      })
    })
  })

  describe('updateProduct', () => {
    it('should update product if authorized', async () => {
      mockReq.user = { userId: '123', role: 'user' }
      mockReq.params = { id: '123' }
      mockReq.body = { name: 'Updated Product' }
      ;(ProductService.prototype.updateProduct as jest.Mock).mockResolvedValue({
        id: '123',
        name: 'Updated Product'
      })

      await controller.updateProduct(mockReq as Request, mockRes as Response, jest.fn())

      expect(mockRes.status).toHaveBeenCalledWith(200)
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Product updated successfully',
        data: { id: '123', name: 'Updated Product' }
      })
    })
  })

  it('should delete product if authorized', async () => {
    mockReq.user = { userId: '123', role: 'admin' }
    mockReq.params = { id: '123' }
    ;(ProductService.prototype.deleteProduct as jest.Mock).mockResolvedValue(undefined)

    await controller.deleteProduct(mockReq as Request, mockRes as Response, jest.fn())

    expect(mockRes.status).toHaveBeenCalledWith(204)
    expect(mockRes.json).not.toHaveBeenCalled()
    expect(mockRes.send).toHaveBeenCalled()
  })
})
