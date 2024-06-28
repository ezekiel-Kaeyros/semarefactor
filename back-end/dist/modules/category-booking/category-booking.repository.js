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
exports.categoryBookingRepository = void 0;
const category_booking_schema_1 = __importDefault(require("../../core/database/schemas/category-booking.schema"));
class CategoryBookingRepository {
    find(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield category_booking_schema_1.default.find({ slug: slug });
            }
            catch (error) {
                console.error(`Erreur lors de la création d'une nouvelle category de booking:`, error);
                throw error;
            }
        });
    }
    // Méthode pour créer une nouvelle category de booking
    create(name, slug, company_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    name: name,
                    slug: slug,
                    company_id: company_id
                };
                const category = new category_booking_schema_1.default(data);
                return yield category.save();
            }
            catch (error) {
                console.error(`Erreur lors de la création d'une nouvelle category de booking:`, error);
                throw error;
            }
        });
    }
    // Méthode pour modify une category de booking
    update(categoryId, categoryData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield category_booking_schema_1.default.findByIdAndUpdate(categoryId, categoryData, { new: true }).exec();
                return category;
            }
            catch (error) {
                console.error(`Erreur lors de la mise a jour de la category de booking:`, error);
                throw error;
            }
        });
    }
    // Méthode pour modify une category de booking
    findByCompany(company_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield category_booking_schema_1.default.find({ company_id: company_id });
                return category;
            }
            catch (error) {
                console.error(`Erreur lors de la mise a jour de la category de booking:`, error);
                throw error;
            }
        });
    }
}
exports.categoryBookingRepository = new CategoryBookingRepository();
