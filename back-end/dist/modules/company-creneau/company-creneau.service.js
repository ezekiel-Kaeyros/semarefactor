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
exports.companyCreneauService = void 0;
const company_creneau_schema_1 = __importDefault(require("../../core/database/schemas/company-creneau.schema"));
const helper_method_1 = require("../../core/utiles/helper-method");
const company_hour_service_schema_1 = __importDefault(require("../../core/database/schemas/company-hour-service.schema"));
class CompanyCreneauService {
    create(CompanyCreneauData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existCompanyCreneau = yield company_creneau_schema_1.default.findOne({ company_id: CompanyCreneauData.company_id });
                if (existCompanyCreneau) {
                    return { status: 400, message: `Il existe deja un creneau pour cette company` };
                }
                const companyCreneau = new company_creneau_schema_1.default({
                    duration: CompanyCreneauData.duration,
                    company_id: CompanyCreneauData.company_id
                });
                const companyCreneauService = yield companyCreneau.save();
                return { status: 201, message: companyCreneauService };
            }
            catch (error) {
                console.error('Erreur lors de la creation du creneau de la company:', error);
                throw error;
            }
        });
    }
    getAvailalable(date_1, companyId_1) {
        return __awaiter(this, arguments, void 0, function* (date, companyId, typeFormat = 1) {
            try {
                //on verifie si une date est renseigner
                if (!date) {
                    return { status: 400, message: "Veuillez renseigner la date!" };
                }
                //on verifie si la date est valide
                if (!helper_method_1.HelperMethod.isValidDate(date)) {
                    return { status: 400, message: "Veuillez renseigner une date valide" };
                }
                const dateInput = new Date(date);
                dateInput.setHours(0, 0, 0, 0);
                let dateNow = new Date();
                dateNow.setHours(0, 0, 0, 0);
                const existCompanyCreneau = yield company_creneau_schema_1.default.findOne({ company_id: companyId });
                //duree par defaut s'il ne l'a pas fait depuis le dashboard
                let duration = 60;
                if (existCompanyCreneau) {
                    duration = existCompanyCreneau.get('duration');
                }
                const dayOfWeek = helper_method_1.HelperMethod.getDayOfWeek(date);
                const existCompanyHour = yield company_hour_service_schema_1.default.findOne({ day: dayOfWeek, company_id: companyId });
                if (!existCompanyHour) {
                    return { status: 200, message: [] };
                }
                let openingTime = existCompanyHour.get('openingTime');
                const closeTime = existCompanyHour.get('closeTime');
                console.log('Time 1 : ', dateInput.getTime());
                console.log('Time 2 : ', dateNow.getTime());
                console.log(dateNow.getTime() == dateInput.getTime());
                if (dateInput.getTime() == dateNow.getTime()) {
                    let [debutHeure, debutMinute] = openingTime.split(':').map(Number);
                    const newDate = new Date();
                    if (newDate.getHours() >= debutHeure) {
                        openingTime = `${newDate.getHours() + 1}:00`;
                    }
                }
                //on recupere la liste des creneaux en fonction de la date du jour
                let availableSlots = helper_method_1.HelperMethod.genererPlagesHoraires(date, openingTime, closeTime, duration, typeFormat);
                return { status: 200, message: availableSlots };
            }
            catch (error) {
                console.error('Erreur lors de la creation du creneau de la company:', error);
                throw error;
            }
        });
    }
    getPeriodeDays(companyId_1) {
        return __awaiter(this, arguments, void 0, function* (companyId, nb_days = 7) {
            try {
                const existCompanyHour = yield company_hour_service_schema_1.default.find({ company_id: companyId });
                if (existCompanyHour.length == 0) {
                    return { status: 400, message: `Cette company n'a pas de jour de travail` };
                }
                const days = existCompanyHour.map(item => item.get('day'));
                console.log(days);
                const periodDays = helper_method_1.HelperMethod.genererPlageDeDates(new Date().toString(), nb_days, days);
                return { status: 200, message: periodDays };
            }
            catch (error) {
                console.error('Erreur lors de la creation du creneau de la company:', error);
                throw error;
            }
        });
    }
}
exports.companyCreneauService = new CompanyCreneauService();
