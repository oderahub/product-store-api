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
const cors_1 = __importDefault(require("cors"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const error_middleware_1 = require("./middlewares/error.middleware");
const envalid_1 = require("envalid");
require("express-async-errors");
dotenv_1.default.config();
// Validate environment variables
const env = (0, envalid_1.cleanEnv)(process.env, {
    PORT: (0, envalid_1.port)({ default: 3000 }),
    MONGO_URI: (0, envalid_1.str)(),
    JWT_SECRET: (0, envalid_1.str)()
});
const app = (0, express_1.default)();
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Rate limiting
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limit each IP to 100 requests per windowMs
});
app.use('/api/', apiLimiter);
// Logging middleware
app.use((req, res, next) => {
    logger_1.default.info(`${req.method} ${req.url}`);
    next();
});
// Routes
app.use('/api/v1/auth', auth_route_1.default);
app.use('/api/v1/products', product_route_1.default);
app.use('/api/v1/users', user_route_1.default);
// Error handling middleware
app.use(error_middleware_1.errorHandler);
// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Store API!');
});
// Start server
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connectDB)();
        const server = app.listen(env.PORT, () => {
            logger_1.default.info(`App is running on ${env.PORT}...`);
        });
        // Graceful shutdown
        process.on('SIGTERM', () => {
            logger_1.default.info('SIGTERM received. Shutting down gracefully...');
            server.close(() => {
                logger_1.default.info('Server closed.');
                process.exit(0);
            });
        });
        process.on('SIGINT', () => {
            logger_1.default.info('SIGINT received. Shutting down gracefully...');
            server.close(() => {
                logger_1.default.info('Server closed.');
                process.exit(0);
            });
        });
    }
    catch (error) {
        logger_1.default.error('Failed to connect to Database');
        process.exit(1);
    }
});
start(); // Call the start function
