import { Request, Response } from 'express'
import { UserController } from '../../src/controllers/user.controller'
import { UserService } from '../../src/services/user.service'
import { ErrorMessages, SuccessMessages, HTTP_STATUS, UserRoles } from '../../src/constants'
import { IUser } from '../../src/interfaces/user.interface'

jest.mock('../../src/services/user.service')

interface CustomRequest extends Request {
  user?: {
    userId: string
    role: string
  }
}
interface MockUser extends Omit<IUser, 'password'> {
  password?: string
}

describe('UserController', () => {
  let userController: UserController
  let userService: jest.Mocked<UserService>
  let req: Partial<CustomRequest>
  let res: Partial<Response>

  beforeEach(() => {
    userService = new UserService() as jest.Mocked<UserService>
    userController = new UserController()
    userController['userService'] = userService

    req = {
      user: { userId: '123', role: 'user' },
      body: {},
      params: {},
      query: {}
    }

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('registerUser', () => {
    it('should register a user successfully', async () => {
      const user: IUser = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'Password123!',
        role: UserRoles.USER
      }
      req.body = user
      userService.createUser.mockResolvedValue(user)

      await userController.registerUser(req as Request, res as Response, jest.fn())

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED)
      expect(res.json).toHaveBeenCalledWith({
        message: SuccessMessages.USER_CREATED,
        data: { userId: user._id }
      })
    })
  })

  describe('loginUser', () => {
    it('should login a user successfully', async () => {
      const loginResponse = { userId: '123', token: 'token' }
      req.body = { email: 'john.doe@example.com', password: 'Password123!' }
      userService.login.mockResolvedValue(loginResponse)

      await userController.loginUser(req as Request, res as Response, jest.fn())

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK)
      expect(res.json).toHaveBeenCalledWith({
        message: SuccessMessages.LOGIN_SUCCESSFUL,
        data: loginResponse
      })
    })
  })

  describe('getUser', () => {
    it('should retrieve a user successfully', async () => {
      const user: MockUser = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: undefined, // Ensure password isn't sent back
        role: UserRoles.USER
      }
      userService.getUserById.mockResolvedValue(user as IUser)

      await userController.getUser(req as Request, res as Response, jest.fn())

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK)
      expect(res.json).toHaveBeenCalledWith({
        message: SuccessMessages.USER_RETRIEVED,
        data: user
      })
    })

    it('should handle unauthenticated user', async () => {
      req.user = undefined

      await userController.getUser(req as Request, res as Response, jest.fn())

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.UNAUTHORIZED)
      expect(res.json).toHaveBeenCalledWith({
        message: ErrorMessages.UNAUTHENTICATED_USER
      })
    })
  })

  describe('updateUser', () => {
    it('should update a user successfully', async () => {
      const user: IUser = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'Password123!',
        role: UserRoles.USER
      }
      req.params = { id: '123' }
      req.body = user
      userService.updateUser.mockResolvedValue(user)

      await userController.updateUser(req as Request, res as Response, jest.fn())

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK)
      expect(res.json).toHaveBeenCalledWith({
        message: SuccessMessages.USER_UPDATED,
        data: { ...user, password: 'Password123!' } // Ensure password isn't sent back
      })
    })

    it('should handle unauthenticated user', async () => {
      req.user = undefined

      await userController.updateUser(req as Request, res as Response, jest.fn())

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.UNAUTHORIZED)
      expect(res.json).toHaveBeenCalledWith({
        message: ErrorMessages.UNAUTHENTICATED_USER
      })
    })
  })

  describe('deleteUser', () => {
    it('should delete a user successfully', async () => {
      req.params = { id: '123' }
      req.user = { userId: '123', role: UserRoles.ADMIN }
      userService.deleteUser.mockResolvedValue()

      await userController.deleteUser(req as Request, res as Response, jest.fn())

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.NO_CONTENT)
      expect(res.json).toHaveBeenCalledWith({
        message: SuccessMessages.USER_DELETED,
        data: null
      })
    })

    it('should handle unauthenticated user', async () => {
      req.user = undefined

      await userController.deleteUser(req as Request, res as Response, jest.fn())

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.UNAUTHORIZED)
      expect(res.json).toHaveBeenCalledWith({
        message: ErrorMessages.UNAUTHENTICATED_USER
      })
    })
  })
})
