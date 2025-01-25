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
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../config/logger"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectionString = process.env.MongoDb_URI;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!connectionString) {
            throw new Error('MongoDB connection string is missing in environment variables.');
        }
        yield mongoose_1.default.connect(connectionString);
        logger_1.default.info('Successfully connected to MongoDB');
    }
    catch (error) {
        logger_1.default.error('Failed to connect to MongoDB', { error });
        process.exit(1);
    }
});
exports.connectDB = connectDB;
