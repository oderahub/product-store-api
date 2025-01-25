"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
const userController = new user_controller_1.UserController();
router.get('/me', auth_middleware_1.authenticateToken, userController.getUser);
router.put('/:id', auth_middleware_1.authenticateToken, userController.updateUser);
router.delete('/:id', auth_middleware_1.authenticateToken, (0, auth_middleware_1.checkRole)(UserRoles.ADMIN), userController.deleteUser);
exports.default = router;
