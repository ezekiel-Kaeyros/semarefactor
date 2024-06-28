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
exports.serviceBookingRepository = void 0;
const service_booking_schema_1 = __importDefault(require("../../core/database/schemas/service-booking.schema"));
class ServiceBookingRepository {
    // Méthode pour créer un nouveau service de booking
    create(name, price, duration, category_id, company_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    name: name,
                    price: price,
                    duration: duration,
                    category_id: category_id,
                    company_id: company_id
                };
                const service = new service_booking_schema_1.default(data);
                return yield service.save();
            }
            catch (error) {
                console.error(`Erreur lors de la création d'un nouveau service de booking:`, error);
                throw error;
            }
        });
    }
    // Méthode pour modify un service de booking
    update(serviceId, serviceData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const service = yield service_booking_schema_1.default.findByIdAndUpdate(serviceId, serviceData, { new: true }).exec();
                return service;
            }
            catch (error) {
                console.error(`Erreur lors de la mise a jour du service de booking:`, error);
                throw error;
            }
        });
    }
    // Méthode pour ressortir les service de booking d'une company
    findByCompany(company_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const service = yield service_booking_schema_1.default.find({ company_id: company_id });
                return service;
            }
            catch (error) {
                console.error(`Erreur lors de la recuperation des services de booking:`, error);
                throw error;
            }
        });
    }
}
exports.serviceBookingRepository = new ServiceBookingRepository();
