import express from 'express'
import { UserController } from '../controllers/user.controller'
import { authenticateToken, checkRole } from '../middlewares/auth.middleware'
import { UserRoles } from '../constants'

const router = express.Router()
const userController = new UserController()

router.get('/me', authenticateToken, userController.getUser)
router.put('/:id', authenticateToken, userController.updateUser)
router.delete('/:id', authenticateToken, checkRole(UserRoles.ADMIN), userController.deleteUser)

export default router
