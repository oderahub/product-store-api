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
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const logger_1 = __importDefault(require("./config/logger"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const _product_route_1 = __importDefault(require("./routes/ product.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const error_middleware_1 = require("./middlewares/error.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
// Middleware for parsing JSON
app.use(body_parser_1.default.json());
// Rate limiting
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limit each IP to 100 requests per windowMs
});
app.use('/api/', apiLimiter);
// Routes
app.use('/api/v1/auth', auth_route_1.default);
app.use('/api/v1/products', _product_route_1.default);
app.use('/api/v1/users', user_route_1.default);
// Error handling middleware
app.use(error_middleware_1.errorHandler);
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send('Welcome to the Store API!');
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connectDB)();
        logger_1.default.info(`app is running on ${port}...`);
    }
    catch (error) {
        logger_1.default.error('Failed to connect to Database');
    }
}));
