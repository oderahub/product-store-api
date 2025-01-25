export enum ErrorMessages {
  // User registration and login
  USER_ALREADY_EXISTS = 'Email already in use by another user.',
  USER_NOT_FOUND = 'User does not exist. Kindly create a new account.',
  INCORRECT_LOGIN_CREDENTIALS = 'Incorrect login details.',

  FIRSTNAME_MIN_LEGNTH_ERROR = 'Firstname cannot be less than 3 characters.',
  FIRSTNAME_MAX_LEGNTH_ERROR = 'Firstname cannot exceed 100 characters.',

  LASTNAME_MIN_LEGNTH_ERROR = 'Lastname cannot be less than 3 characters.',
  LASTNAME_MAX_LEGNTH_ERROR = 'Lastname cannot exceed 100 characters.',

  INVALID_EMAIL_SUPPLIED = 'Invalid email supplied',

  PASSWORD_MIN_LEGNTH_ERROR = 'Password cannot be less than 8 characters.',
  PASSWORD_STRENGTH_ERROR = 'Password must contain at least one lowercase, one uppercase, one number and one special character',
  PASSWORDS_DO_NOT_MATCH = 'Passwords do not match',

  // Products
  PRODUCT_ALREADY_EXISTS = 'Product already added.',
  PRODUCT_NOT_FOUND = 'Product not found.',

  PRODUCT_NAME_MIN_LEGNTH_ERROR = 'Product name cannot be less than 8 characters',
  PRODUCT_NAME_MAX_LEGNTH_ERROR = 'Product name cannot be more than 100 characters',
  PRODUCT_PRICE_VALIDITY = 'Product price must be a number',
  PRODUCT_DESCRIPTION_MIN_LEGNTH_ERROR = 'Product description cannot be less than 100 characters',

  // Requests
  UNAUTHENTICATED_USER = 'You must be logged in to perform this operation',
  INVALID_TOKEN = 'Invalid token supplied.',
  UNAUTHORIZED_ACCESS = 'You are unauthorized to perform this operation. Kindly login.'
}

export enum SuccessMessages {
  REGISTRATION_SUCCESSFUL = 'Registration successful. You can login now',
  LOGIN_SUCCESSFUL = 'Login successful.',
  PRODUCTS_RETRIEVED = 'Products successfully retrieved',
  PRODUCT_CREATED = 'Product successfully created',
  PRODUCT_UPDATED = 'Product successfully updated',
  PRODUCT_RETRIEVED = 'Product successfully retrieved',
  PRODUCT_DELETED = 'Product successfully deleted',
  WELCOME = 'Welcome to Product Store API'
}

export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
}
