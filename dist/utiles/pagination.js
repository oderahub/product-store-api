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
exports.paginateAndFilter = void 0;
const paginateAndFilter = (model, queryParams, populateFields) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10, search, category } = queryParams;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    if (isNaN(pageNumber) || pageNumber < 1) {
        throw new Error('Invalid page number');
    }
    if (isNaN(limitNumber) || limitNumber < 1) {
        throw new Error('Invalid limit');
    }
    const skip = (pageNumber - 1) * limitNumber;
    const filter = {};
    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
        ];
    }
    if (category) {
        filter.category = category;
    }
    try {
        const query = model.find(filter).skip(skip).limit(limitNumber);
        if (populateFields) {
            query.populate({
                path: populateFields,
                select: '-password -__v' // Exclude password and version key from the result
            });
        }
        const results = (yield query.lean().exec());
        const total = yield model.countDocuments(filter);
        return { results, total };
    }
    catch (error) {
        throw new Error('An error occurred while fetching data');
    }
});
exports.paginateAndFilter = paginateAndFilter;
