"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_EXPIRATION_TIME = exports.HTTP_STATUS = exports.UserRoles = exports.SuccessMessages = exports.ErrorMessages = void 0;
var ErrorMessages;
(function (ErrorMessages) {
    ErrorMessages["UNAUTHENTICATED_USER"] = "You must be logged in to perform this operation";
    ErrorMessages["INVALID_TOKEN"] = "Invalid token supplied.";
    ErrorMessages["NOT_AUTHORIZED"] = "You are not authorized to perform this operation.";
    ErrorMessages["USER_ALREADY_EXISTS"] = "User already exists.";
    ErrorMessages["USER_NOT_FOUND"] = "User not found.";
    ErrorMessages["INCORRECT_LOGIN_CREDENTIALS"] = "Incorrect login credentials.";
    ErrorMessages["PRODUCT_NOT_FOUND"] = "Product not found.";
    ErrorMessages["NOT_PRODUCT_OWNER"] = "You do not own this product.";
    ErrorMessages["PRODUCT_ALREADY_EXISTS"] = "Product already exists.";
    ErrorMessages["INTERNAL_SERVER_ERROR"] = "INTERNAL_SERVER_ERROR";
    ErrorMessages["UNAUTHORIZED_ACTION"] = "Unauthorized action";
    ErrorMessages["DATABASE_ERROR"] = "Database error occurred";
    ErrorMessages["DUPLICATE_KEY"] = "Duplicate key error";
})(ErrorMessages || (exports.ErrorMessages = ErrorMessages = {}));
var SuccessMessages;
(function (SuccessMessages) {
    SuccessMessages["USER_CREATED"] = "User created successfully";
    SuccessMessages["USER_UPDATED"] = "User updated successfully";
    SuccessMessages["USER_DELETED"] = "User deleted successfully";
    SuccessMessages["USER_RETRIEVED"] = "User retrieved successfully";
    SuccessMessages["LOGIN_SUCCESSFUL"] = "Login successful.";
    SuccessMessages["PRODUCT_CREATED"] = "Product created successfully";
    SuccessMessages["PRODUCT_UPDATED"] = "Product updated successfully";
    SuccessMessages["PRODUCT_DELETED"] = "Product deleted successfully";
    SuccessMessages["PRODUCTS_RETRIEVED"] = "Products retrieved successfully";
})(SuccessMessages || (exports.SuccessMessages = SuccessMessages = {}));
var UserRoles;
(function (UserRoles) {
    UserRoles["USER"] = "user";
    UserRoles["ADMIN"] = "admin";
})(UserRoles || (exports.UserRoles = UserRoles = {}));
exports.HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500
};
exports.JWT_EXPIRATION_TIME = '1h';
