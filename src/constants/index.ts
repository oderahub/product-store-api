export enum ErrorMessages {
  UNAUTHENTICATED_USER = 'You must be logged in to perform this operation',
  INVALID_TOKEN = 'Invalid token supplied.',
  NOT_AUTHORIZED = 'You are not authorized to perform this operation.',
  USER_ALREADY_EXISTS = 'User already exists.',
  USER_NOT_FOUND = 'User not found.',
  INCORRECT_LOGIN_CREDENTIALS = 'Incorrect login credentials.',
  PRODUCT_NOT_FOUND = 'Product not found.',
  NOT_PRODUCT_OWNER = 'You do not own this product.',
  PRODUCT_ALREADY_EXISTS = 'Product already exists.',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  UNAUTHORIZED_ACTION = 'Unauthorized action',
  DATABASE_ERROR = 'Database error occurred',
  DUPLICATE_KEY = 'Duplicate key error'
}

export enum SuccessMessages {
  USER_CREATED = 'User created successfully',
  USER_UPDATED = 'User updated successfully',
  USER_DELETED = 'User deleted successfully',
  USER_RETRIEVED = 'User retrieved successfully',
  LOGIN_SUCCESSFUL = 'Login successful.',
  PRODUCT_CREATED = 'Product created successfully',
  PRODUCT_UPDATED = 'Product updated successfully',
  PRODUCT_DELETED = 'Product deleted successfully',
  PRODUCTS_RETRIEVED = 'Products retrieved successfully'
}

export enum UserRoles {
  USER = 'user',
  ADMIN = 'admin'
}

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
}

export const JWT_EXPIRATION_TIME = '1h'
