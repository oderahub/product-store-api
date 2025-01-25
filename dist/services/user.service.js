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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const base_service_1 = require("./base.service");
const constants_1 = require("../constants");
const user_validator_1 = require("../validators/user.validator");
const helper_1 = require("../utiles/helper");
const product_model_1 = require("../models/product.model");
class UserService extends base_service_1.BaseService {
    constructor() {
        super(user_model_1.User);
        this.productModel = product_model_1.Product;
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, helper_1.validateSchema)(user, user_validator_1.createUserSchema, 'createUser');
            if (yield this.model.findOne({ username: user.username })) {
                throw new Error(constants_1.ErrorMessages.USER_ALREADY_EXISTS);
            }
            const hashedPassword = yield bcryptjs_1.default.hash(user.password, 10);
            const newUser = new this.model(Object.assign(Object.assign({}, user), { password: hashedPassword }));
            yield newUser.save();
            if (user.role === constants_1.UserRoles.ADMIN) {
                yield this.model.updateMany({ _id: { $ne: newUser._id }, role: constants_1.UserRoles.ADMIN }, { $set: { role: constants_1.UserRoles.USER } });
            }
            return newUser.toObject({ versionKey: false });
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findById(id);
            return user ? Object.assign(Object.assign({}, user.toObject()), { password: undefined }) : null;
        });
    }
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.validateExistence(yield this.findById(id), constants_1.ErrorMessages.USER_NOT_FOUND);
            if (user.password) {
                user.password = yield bcryptjs_1.default.hash(user.password, 10);
            }
            if (user.role === constants_1.UserRoles.ADMIN && existingUser.role !== constants_1.UserRoles.ADMIN) {
                yield this.model.updateMany({ _id: { $ne: id }, role: constants_1.UserRoles.ADMIN }, { $set: { role: constants_1.UserRoles.USER } });
            }
            return yield this.model
                .findByIdAndUpdate(id, user, { new: true, fields: { username: 1, role: 1 } })
                .lean()
                .exec();
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.validateExistence(yield this.model.findByIdAndDelete(id).exec(), constants_1.ErrorMessages.USER_NOT_FOUND);
            if (user.role !== constants_1.UserRoles.ADMIN) {
                yield product_model_1.Product.deleteMany({ owner: id });
            }
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, helper_1.validateSchema)({ username, password }, user_validator_1.loginUserSchema, 'login');
            const user = yield this.model.findOne({ username });
            if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
                throw new Error(constants_1.ErrorMessages.INCORRECT_LOGIN_CREDENTIALS);
            }
            const token = jsonwebtoken_1.default.sign({ userId: user._id.toString(), role: user.role }, // Corrected type assertion for _id
            process.env.TOKEN_SECRET);
            return { userId: user._id.toString(), token };
        });
    }
}
exports.UserService = UserService;
