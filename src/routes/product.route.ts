import express from 'express'
import { ProductController } from '../controllers/product.controller'
import { authenticateToken } from '../middlewares/auth.middleware'

const router = express.Router()
const productController = new ProductController()

router.post('/create', authenticateToken, productController.createProduct)
router.get('/', authenticateToken, productController.getProducts)
router.get('/:id', authenticateToken, productController.getProductById)
router.put('/:id', authenticateToken, productController.updateProduct)
router.delete('/:id', authenticateToken, productController.deleteProduct)

export default router
