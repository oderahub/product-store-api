"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
const productController = new product_controller_1.ProductController();
router.post('/create', auth_middleware_1.authenticateToken, productController.createProduct);
router.get('/', auth_middleware_1.authenticateToken, productController.getProducts);
router.get('/:id', auth_middleware_1.authenticateToken, productController.getProductById);
router.put('/:id', auth_middleware_1.authenticateToken, productController.updateProduct);
router.delete('/:id', auth_middleware_1.authenticateToken, productController.deleteProduct);
exports.default = router;
