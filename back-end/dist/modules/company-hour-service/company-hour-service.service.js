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
exports.companyHourServiceService = void 0;
const helper_method_1 = require("../../core/utiles/helper-method");
const company_hour_service_repository_1 = require("./company-hour-service.repository");
class CompanyHourServiceService {
    create(day, openingTime, closeTime, company_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const openingTimeInMinutes = helper_method_1.HelperMethod.timeStringToMinutes(openingTime);
                const closeTimeInMinutes = helper_method_1.HelperMethod.timeStringToMinutes(closeTime);
                if (openingTimeInMinutes > closeTimeInMinutes) {
                    return { status: 403, message: `L'heure de debut ne doit pas etre superieur a l'heure de fin` };
                }
                else if (openingTimeInMinutes == closeTimeInMinutes) {
                    return { status: 403, message: `L'heure de debut ne doit pas etre egale a l'heure de fin` };
                }
                const existCompanyHourService = yield company_hour_service_repository_1.companyHourServiceRepository.findByDayOfWeek(day, company_id);
                if (existCompanyHourService) {
                    return { status: 403, message: `ce jour a ete deja ete enregistrer dans la base de donnee pour cette company` };
                }
                const companyHourService = yield company_hour_service_repository_1.companyHourServiceRepository.create(day, openingTime, closeTime, company_id);
                return { status: 200, message: companyHourService };
            }
            catch (error) {
                console.error('Erreur lors de la creation l\'heure du service de la company:', error);
                throw error;
            }
        });
    }
    update(hour_service_id, day, openingTime, closeTime, company_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const openingTimeInMinutes = helper_method_1.HelperMethod.timeStringToMinutes(openingTime);
                const closeTimeInMinutes = helper_method_1.HelperMethod.timeStringToMinutes(closeTime);
                if (openingTimeInMinutes > closeTimeInMinutes) {
                    return { status: 403, message: `L'heure de debut ne doit pas etre superieur a l'heure de fin` };
                }
                else if (openingTimeInMinutes == closeTimeInMinutes) {
                    return { status: 403, message: `L'heure de debut ne doit pas etre egale a l'heure de fin` };
                }
                const existCompanyHourService = yield company_hour_service_repository_1.companyHourServiceRepository.findOne(day, company_id, hour_service_id);
                if (existCompanyHourService) {
                    return { status: 403, message: `Ce jour a ete deja ete enregistrer dans la base de donnee pour cette company` };
                }
                const companyHourService = yield company_hour_service_repository_1.companyHourServiceRepository.update(day, openingTime, closeTime, hour_service_id);
                return { status: 200, message: companyHourService };
            }
            catch (error) {
                console.error('Erreur lors de la creation l\'heure du service de la company:', error);
                throw error;
            }
        });
    }
    // Méthode pour recuperer les horaires de booking d'une company
    findByCompany(company_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const companyHourService = yield company_hour_service_repository_1.companyHourServiceRepository.findByCompany(company_id);
                return { status: 200, message: companyHourService };
            }
            catch (error) {
                console.error(`Erreur lors de la mise a jour de la category de booking:`, error);
                throw error;
            }
        });
    }
}
exports.companyHourServiceService = new CompanyHourServiceService();
