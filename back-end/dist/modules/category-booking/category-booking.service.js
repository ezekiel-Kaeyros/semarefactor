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
exports.categoryBookingService = void 0;
const helper_method_1 = require("../../core/utiles/helper-method");
const category_booking_repository_1 = require("./category-booking.repository");
class CategoryBookingService {
    create(categoryData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let slug = helper_method_1.HelperMethod.stringToSlug(categoryData.name);
                let isDublicate = true, i = 1;
                console.log('slug : ', slug);
                do {
                    const slugExist = yield category_booking_repository_1.categoryBookingRepository.find(slug);
                    if (slugExist.length) {
                        slug += i;
                    }
                    else
                        isDublicate = false;
                    i++;
                } while (isDublicate);
                const categoryBooking = yield category_booking_repository_1.categoryBookingRepository.create(categoryData.name, slug, categoryData.company_id);
                return { status: 201, message: categoryBooking };
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
                const category = yield category_booking_repository_1.categoryBookingRepository.update(categoryId, categoryData);
                return { status: 200, message: category };
            }
            catch (error) {
                console.error(`Erreur lors de la mise a jour de la category de booking:`, error);
                throw error;
            }
        });
    }
    // Méthode pour recuperer les category de booking d'une company
    findByCompany(company_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield category_booking_repository_1.categoryBookingRepository.findByCompany(company_id);
                return { status: 200, message: category };
            }
            catch (error) {
                console.error(`Erreur lors de la mise a jour de la category de booking:`, error);
                throw error;
            }
        });
    }
}
exports.categoryBookingService = new CategoryBookingService();
