import express from 'express'
import { UserController } from '../controllers/user.controller'

const router = express.Router()
const userController = new UserController()

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)

export default router
