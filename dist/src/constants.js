"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_STATUS = exports.SuccessMessages = exports.ErrorMessages = void 0;
var ErrorMessages;
(function (ErrorMessages) {
    // User registration and login
    ErrorMessages["USER_ALREADY_EXISTS"] = "Email already in use by another user.";
    ErrorMessages["USER_NOT_FOUND"] = "User does not exist. Kindly create a new account.";
    ErrorMessages["INCORRECT_LOGIN_CREDENTIALS"] = "Incorrect login details.";
    ErrorMessages["FIRSTNAME_MIN_LEGNTH_ERROR"] = "Firstname cannot be less than 3 characters.";
    ErrorMessages["FIRSTNAME_MAX_LEGNTH_ERROR"] = "Firstname cannot exceed 100 characters.";
    ErrorMessages["LASTNAME_MIN_LEGNTH_ERROR"] = "Lastname cannot be less than 3 characters.";
    ErrorMessages["LASTNAME_MAX_LEGNTH_ERROR"] = "Lastname cannot exceed 100 characters.";
    ErrorMessages["INVALID_EMAIL_SUPPLIED"] = "Invalid email supplied";
    ErrorMessages["PASSWORD_MIN_LEGNTH_ERROR"] = "Password cannot be less than 8 characters.";
    ErrorMessages["PASSWORD_STRENGTH_ERROR"] = "Password must contain at least one lowercase, one uppercase, one number and one special character";
    ErrorMessages["PASSWORDS_DO_NOT_MATCH"] = "Passwords do not match";
    // Products
    ErrorMessages["PRODUCT_ALREADY_EXISTS"] = "Product already added.";
    ErrorMessages["PRODUCT_NOT_FOUND"] = "Product not found.";
    ErrorMessages["PRODUCT_NAME_MIN_LEGNTH_ERROR"] = "Product name cannot be less than 8 characters";
    ErrorMessages["PRODUCT_NAME_MAX_LEGNTH_ERROR"] = "Product name cannot be more than 100 characters";
    ErrorMessages["PRODUCT_PRICE_VALIDITY"] = "Product price must be a number";
    ErrorMessages["PRODUCT_DESCRIPTION_MIN_LEGNTH_ERROR"] = "Product description cannot be less than 100 characters";
    // Requests
    ErrorMessages["UNAUTHENTICATED_USER"] = "You must be logged in to perform this operation";
    ErrorMessages["INVALID_TOKEN"] = "Invalid token supplied.";
    ErrorMessages["UNAUTHORIZED_ACCESS"] = "You are unauthorized to perform this operation. Kindly login.";
})(ErrorMessages || (exports.ErrorMessages = ErrorMessages = {}));
var SuccessMessages;
(function (SuccessMessages) {
    SuccessMessages["REGISTRATION_SUCCESSFUL"] = "Registration successful. You can login now";
    SuccessMessages["LOGIN_SUCCESSFUL"] = "Login successful.";
    SuccessMessages["PRODUCTS_RETRIEVED"] = "Products successfully retrieved";
    SuccessMessages["PRODUCT_CREATED"] = "Product successfully created";
    SuccessMessages["PRODUCT_UPDATED"] = "Product successfully updated";
    SuccessMessages["PRODUCT_RETRIEVED"] = "Product successfully retrieved";
    SuccessMessages["PRODUCT_DELETED"] = "Product successfully deleted";
    SuccessMessages["WELCOME"] = "Welcome to Product Store API";
})(SuccessMessages || (exports.SuccessMessages = SuccessMessages = {}));
exports.HTTP_STATUS = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};
