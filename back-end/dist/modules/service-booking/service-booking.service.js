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
exports.serviceBookingService = void 0;
const service_booking_repository_1 = require("./service-booking.repository");
class ServiceBookingService {
    create(serviceData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serviceBooking = yield service_booking_repository_1.serviceBookingRepository.create(serviceData.name, serviceData.price, serviceData.duration, serviceData.category_id, serviceData.company_id);
                return { status: 201, message: serviceBooking };
            }
            catch (error) {
                console.error(`Erreur lors de la création d'un nouveau service de booking:`, error);
                throw error;
            }
        });
    }
    // Méthode pour modify le service de booking
    update(serviceId, serviceData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const service = yield service_booking_repository_1.serviceBookingRepository.update(serviceId, serviceData);
                return { status: 200, message: service };
            }
            catch (error) {
                console.error(`Erreur lors de la mise a jour du service de booking:`, error);
                throw error;
            }
        });
    }
    // Méthode pour recuperer les services de booking d'une company
    findByCompany(company_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield service_booking_repository_1.serviceBookingRepository.findByCompany(company_id);
                return { status: 200, message: category };
            }
            catch (error) {
                console.error(`Erreur lors de la recuperation des services de booking d'une company:`, error);
                throw error;
            }
        });
    }
}
exports.serviceBookingService = new ServiceBookingService();
