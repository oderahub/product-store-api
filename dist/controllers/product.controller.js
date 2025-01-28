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
exports.ProductController = void 0;
const product_service_1 = require("../services/product.service");
const base_controller_1 = require("./base.controller");
const constants_1 = require("../constants");
class ProductController extends base_controller_1.BaseController {
    constructor() {
        super();
        this.createProduct = this.asyncWrapperHandler((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
            if (!userId) {
                return this.handleError(res, new Error(constants_1.ErrorMessages.UNAUTHENTICATED_USER), constants_1.HTTP_STATUS.UNAUTHORIZED);
            }
            try {
                const product = yield this.productService.createProduct(req.body, userId);
                this.handleResponse(res, constants_1.SuccessMessages.PRODUCT_CREATED, product, constants_1.HTTP_STATUS.CREATED);
            }
            catch (error) {
                this.handleError(res, error);
            }
        }));
        this.getProducts = this.asyncWrapperHandler((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { products, total } = yield this.productService.getProducts(req.query);
                if (products.length === 0) {
                    return this.handleResponse(res, 'No products found', { products: [], total: 0 }, constants_1.HTTP_STATUS.NOT_FOUND);
                }
                this.handleResponse(res, constants_1.SuccessMessages.PRODUCTS_RETRIEVED, { products, total });
            }
            catch (error) {
                if (error.message === 'Invalid page number' || error.message === 'Invalid limit') {
                    this.handleError(res, error, constants_1.HTTP_STATUS.BAD_REQUEST);
                }
                else {
                    this.handleError(res, error);
                }
            }
        }));
        this.getProductById = this.asyncWrapperHandler((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.productService.getProductById(req.params.id);
                if (!product) {
                    return this.handleError(res, new Error(constants_1.ErrorMessages.PRODUCT_NOT_FOUND), constants_1.HTTP_STATUS.NOT_FOUND);
                }
                this.handleResponse(res, constants_1.SuccessMessages.PRODUCTS_RETRIEVED, product);
            }
            catch (error) {
                this.handleError(res, error);
            }
        }));
        this.updateProduct = this.asyncWrapperHandler((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
            const userRole = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
            if (!userId || !userRole) {
                return this.handleError(res, new Error(constants_1.ErrorMessages.UNAUTHENTICATED_USER), constants_1.HTTP_STATUS.UNAUTHORIZED);
            }
            try {
                const product = yield this.productService.updateProduct(req.params.id, req.body, userId, userRole);
                if (!product) {
                    return this.handleError(res, new Error(constants_1.ErrorMessages.PRODUCT_NOT_FOUND), constants_1.HTTP_STATUS.NOT_FOUND);
                }
                this.handleResponse(res, constants_1.SuccessMessages.PRODUCT_UPDATED, product);
            }
            catch (error) {
                if (error.message === constants_1.ErrorMessages.NOT_PRODUCT_OWNER) {
                    this.handleError(res, error, constants_1.HTTP_STATUS.FORBIDDEN);
                }
                else {
                    this.handleError(res, error);
                }
            }
        }));
        this.deleteProduct = this.asyncWrapperHandler((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
            const userRole = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
            if (!userId || !userRole) {
                return this.handleError(res, new Error(constants_1.ErrorMessages.UNAUTHENTICATED_USER), constants_1.HTTP_STATUS.UNAUTHORIZED);
            }
            try {
                yield this.productService.deleteProduct(req.params.id, userId, userRole);
                this.handleResponse(res, constants_1.SuccessMessages.PRODUCT_DELETED, constants_1.HTTP_STATUS.NO_CONTENT);
            }
            catch (error) {
                if (error.message === constants_1.ErrorMessages.NOT_PRODUCT_OWNER) {
                    this.handleError(res, error, constants_1.HTTP_STATUS.FORBIDDEN);
                }
                else {
                    this.handleError(res, error);
                }
            }
        }));
        this.productService = new product_service_1.ProductService();
    }
}
exports.ProductController = ProductController;
