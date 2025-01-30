"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const base_controller_1 = require("./base.controller");
const constants_1 = require("../constants");
class UserController extends base_controller_1.BaseController {
    constructor() {
        super();
        this.registerUser = this.asyncWrapperHandler((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.createUser(req.body);
                this.handleResponse(res, constants_1.SuccessMessages.USER_CREATED, { userId: user._id }, constants_1.HTTP_STATUS.CREATED);
            }
            catch (error) {
                this.handleError(res, error);
            }
        }));
        this.loginUser = this.asyncWrapperHandler((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const { userId, token } = yield this.userService.login(email, password);
                this.handleResponse(res, constants_1.SuccessMessages.LOGIN_SUCCESSFUL, { userId, token });
            }
            catch (error) {
                this.handleError(res, error);
            }
        }));
        this.getUser = this.asyncWrapperHandler((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
            if (!userId) {
                return this.handleError(res, new Error(constants_1.ErrorMessages.UNAUTHENTICATED_USER), constants_1.HTTP_STATUS.UNAUTHORIZED);
            }
            try {
                const user = yield this.userService.getUserById(userId);
                if (!user) {
                    return this.handleError(res, new Error(constants_1.ErrorMessages.USER_NOT_FOUND), constants_1.HTTP_STATUS.NOT_FOUND);
                }
                this.handleResponse(res, constants_1.SuccessMessages.USER_RETRIEVED, user);
            }
            catch (error) {
                this.handleError(res, error);
            }
        }));
        this.updateUser = this.asyncWrapperHandler((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
            const userRole = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
            if (!userId || !userRole) {
                return this.handleError(res, new Error(constants_1.ErrorMessages.UNAUTHENTICATED_USER), constants_1.HTTP_STATUS.UNAUTHORIZED);
            }
            if (userId !== req.params.id && userRole !== constants_1.UserRoles.ADMIN) {
                return this.handleError(res, new Error(constants_1.ErrorMessages.NOT_AUTHORIZED), constants_1.HTTP_STATUS.FORBIDDEN);
            }
            try {
                const user = yield this.userService.updateUser(req.params.id, req.body);
                if (!user) {
                    return this.handleError(res, new Error(constants_1.ErrorMessages.USER_NOT_FOUND), constants_1.HTTP_STATUS.NOT_FOUND);
                }
                this.handleResponse(res, constants_1.SuccessMessages.USER_UPDATED, user);
            }
            catch (error) {
                this.handleError(res, error);
            }
        }));
        this.deleteUser = this.asyncWrapperHandler((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
            const userRole = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
            if (!userId || !userRole) {
                return this.handleError(res, new Error(constants_1.ErrorMessages.UNAUTHENTICATED_USER), constants_1.HTTP_STATUS.UNAUTHORIZED);
            }
            try {
                yield this.userService.deleteUser(req.params.id);
                this.handleResponse(res, constants_1.SuccessMessages.USER_DELETED, null, constants_1.HTTP_STATUS.NO_CONTENT);
            }
            catch (error) {
                if (error.message === constants_1.ErrorMessages.USER_NOT_FOUND) {
                    this.handleError(res, error, constants_1.HTTP_STATUS.NOT_FOUND);
                }
                else {
                    this.handleError(res, error);
                }
            }
        }));
        this.userService = new user_service_1.UserService();
    }
}
exports.UserController = UserController;
