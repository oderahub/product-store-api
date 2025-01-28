import { Request, Response } from 'express'
import { UserService } from '../services/user.service'
import { IUser, LoginResponse } from '../interfaces/user.interface'
import { BaseController } from './base.controller'
import { ErrorMessages, SuccessMessages, HTTP_STATUS, UserRoles } from '../constants'
import { checkRole } from '../middlewares/auth.middleware'

export class UserController extends BaseController<IUser> {
  private userService: UserService

  constructor() {
    super()
    this.userService = new UserService()
  }

  public registerUser = this.asyncWrapperHandler(async (req: Request, res: Response) => {
    try {
      const user = await this.userService.createUser(req.body)
      this.handleResponse(
        res,
        SuccessMessages.USER_CREATED,
        { userId: user._id },
        HTTP_STATUS.CREATED
      )
    } catch (error: any) {
      this.handleError(res, error)
    }
  })

  public loginUser = this.asyncWrapperHandler(async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body
      const { userId, token } = await this.userService.login(email, password)
      this.handleResponse(res, SuccessMessages.LOGIN_SUCCESSFUL, { userId, token })
    } catch (error: any) {
      this.handleError(res, error)
    }
  })

  public getUser = this.asyncWrapperHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId

    if (!userId) {
      return this.handleError(
        res,
        new Error(ErrorMessages.UNAUTHENTICATED_USER),
        HTTP_STATUS.UNAUTHORIZED
      )
    }
    try {
      const user = await this.userService.getUserById(userId)
      if (!user) {
        return this.handleError(res, new Error(ErrorMessages.USER_NOT_FOUND), HTTP_STATUS.NOT_FOUND)
      }
      this.handleResponse(res, SuccessMessages.USER_CREATED, user)
    } catch (error: any) {
      this.handleError(res, error)
    }
  })

  public updateUser = this.asyncWrapperHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId
    const userRole = req.user?.role

    if (!userId || !userRole) {
      return this.handleError(
        res,
        new Error(ErrorMessages.UNAUTHENTICATED_USER),
        HTTP_STATUS.UNAUTHORIZED
      )
    }
    if (userId !== req.params.id && userRole !== UserRoles.ADMIN) {
      return this.handleError(res, new Error(ErrorMessages.NOT_AUTHORIZED), HTTP_STATUS.FORBIDDEN)
    }
    try {
      const user = await this.userService.updateUser(req.params.id, req.body)
      if (!user) {
        return this.handleError(res, new Error(ErrorMessages.USER_NOT_FOUND), HTTP_STATUS.NOT_FOUND)
      }
      this.handleResponse(res, SuccessMessages.USER_UPDATED, user)
    } catch (error: any) {
      this.handleError(res, error)
    }
  })

  public deleteUser = this.asyncWrapperHandler(async (req: Request, res: Response) => {
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
      checkRole(UserRoles.ADMIN)(req, res, async () => {
        await this.userService.deleteUser(req.params.id)
        this.handleResponse(res, SuccessMessages.USER_DELETED, null, HTTP_STATUS.NO_CONTENT)
      })
    } catch (error: any) {
      this.handleError(res, error)
    }
  })
}
