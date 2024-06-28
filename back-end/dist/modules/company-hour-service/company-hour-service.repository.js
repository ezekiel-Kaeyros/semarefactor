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
exports.companyHourServiceRepository = void 0;
const company_hour_service_schema_1 = __importDefault(require("../../core/database/schemas/company-hour-service.schema"));
class CompanyHourServiceRepository {
    findByDayOfWeek(day, company_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield company_hour_service_schema_1.default.findOne({ day: day, company_id: company_id });
            }
            catch (error) {
                console.error('Erreur lors de recuperer l\'heure du service de la company:', error);
                throw error;
            }
        });
    }
    findOne(day, company_id, hour_service_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield company_hour_service_schema_1.default.findOne({ day: day, company_id: company_id, _id: { $ne: hour_service_id } });
            }
            catch (error) {
                console.error('Erreur lors de recuperer l\'heure du service de la company:', error);
                throw error;
            }
        });
    }
    create(day, openingTime, closeTime, company_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const companyhourservice = new company_hour_service_schema_1.default({
                    day: day,
                    openingTime: openingTime,
                    closeTime: closeTime,
                    company_id: company_id
                });
                const companyHourService = yield companyhourservice.save();
                return companyHourService;
            }
            catch (error) {
                console.error('Erreur lors de recuperer l\'heure du service de la company:', error);
                throw error;
            }
        });
    }
    update(day, openingTime, closeTime, hour_service_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const companyHourService = yield company_hour_service_schema_1.default.findByIdAndUpdate(hour_service_id, {
                    day: day,
                    openingTime: openingTime,
                    closeTime: closeTime,
                }, { new: true }).exec();
                return companyHourService;
            }
            catch (error) {
                console.error('Erreur lors de recuperer l\'heure du service de la company:', error);
                throw error;
            }
        });
    }
    // Méthode pour ressortir les booking d'une company
    findByCompany(company_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const companyHourService = yield company_hour_service_schema_1.default.find({ company_id: company_id });
                return companyHourService;
            }
            catch (error) {
                console.error(`Erreur lors de la mise a jour de la category de booking:`, error);
                throw error;
            }
        });
    }
}
exports.companyHourServiceRepository = new CompanyHourServiceRepository();
