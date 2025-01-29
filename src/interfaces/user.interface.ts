import { Types } from 'mongoose'
import { UserRoles } from '../constants'

export interface IUser {
  firstName: string
  lastName: string
  password: string
  role?: UserRoles
  products?: string[]
  _id?: Types.ObjectId
  userId?: string
  email: string
}

export interface IUserService {
  createUser(user: IUser): Promise<IUser>
  getUserById(id: string): Promise<IUser | null>
  updateUser(id: string, user: Partial<IUser>): Promise<IUser | null>
  deleteUser(id: string): Promise<void>
  login(username: string, password: string): Promise<LoginResponse>
}

export interface LoginResponse {
  userId: string
  token: string
}
