"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    category: { type: String, required: true, index: true },
    createdAt: { type: Date, default: Date.now },
    owner: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true }
});
// Create indexes for query efficiency
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ price: 1 });
productSchema.index({ createdAt: 1 });
exports.Product = mongoose_1.default.model('Product', productSchema);
