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
exports.ProductService = void 0;
const product_model_1 = require("../models/product.model");
const product_validator_1 = require("../validators/product.validator");
const base_service_1 = require("./base.service");
const constants_1 = require("../constants");
const helper_1 = require("../utiles/helper");
const pagination_1 = require("../utiles/pagination");
class ProductService extends base_service_1.BaseService {
    constructor() {
        super(product_model_1.Product);
    }
    createProduct(product, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.model.findOne({ name: product.name, category: product.category })) {
                throw new Error(constants_1.ErrorMessages.PRODUCT_ALREADY_EXISTS);
            }
            (0, helper_1.validateSchema)(product, product_validator_1.createProductSchema, 'createProduct');
            const newProduct = new this.model(Object.assign(Object.assign({}, product), { owner: userId }));
            return yield newProduct.save();
        });
    }
    getProducts() {
        return __awaiter(this, arguments, void 0, function* (query = {}) {
            const { results, total } = yield (0, pagination_1.paginateAndFilter)(this.model, query, 'owner');
            return { products: results, total };
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findById(id).populate('owner', 'username role').lean().exec();
        });
    }
    updateProduct(id, product, userId, userRole) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingProduct = yield this.findById(id);
            yield this.validateExistence(existingProduct, constants_1.ErrorMessages.PRODUCT_NOT_FOUND);
            (0, helper_1.checkOwnership)(existingProduct.owner.toString(), userId, userRole, constants_1.ErrorMessages.NOT_PRODUCT_OWNER);
            (0, helper_1.validateSchema)(product, product_validator_1.updateProductSchema, 'updateProduct');
            return yield this.model
                .findByIdAndUpdate(id, product, {
                new: true,
                fields: { name: 1, price: 1, description: 1, category: 1, owner: 1 }
            })
                .lean()
                .exec();
        });
    }
    deleteProduct(id, userId, userRole) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingProduct = yield this.findById(id);
            yield this.validateExistence(existingProduct, constants_1.ErrorMessages.PRODUCT_NOT_FOUND);
            (0, helper_1.checkOwnership)(existingProduct.owner.toString(), userId, userRole, constants_1.ErrorMessages.NOT_PRODUCT_OWNER);
            yield this.model.findByIdAndDelete(id).exec();
        });
    }
}
exports.ProductService = ProductService;
