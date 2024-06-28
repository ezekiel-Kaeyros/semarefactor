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
exports.bookingService = void 0;
const booking_repository_1 = require("./booking.repository");
const helper_method_1 = require("../../core/utiles/helper-method");
const company_hour_service_schema_1 = __importDefault(require("../../core/database/schemas/company-hour-service.schema"));
const conversation_repository_1 = require("../conversation/conversation.repository");
const service_booking_schema_1 = __importDefault(require("../../core/database/schemas/service-booking.schema"));
class BookingService {
    create(bookingData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Convertir les dates de début et de fin en objets Date
                const startDate = new Date(bookingData.startAt);
                const now = new Date();
                // Vérifier que la date de début n'est pas inférieure à la date actuelle
                if (startDate < now) {
                    return { status: 400, message: 'La date de début ne peut pas être inférieure à la date actuelle.' };
                }
                const existConversation = yield conversation_repository_1.conversationRepository.getById(bookingData.conversation_id);
                if (!existConversation) {
                    return { status: 400, message: 'Conversation inexistante.' };
                }
                const credential_id = existConversation.get('credential_id');
                // const existCompanyCreneau = await CompanyCreneau.findOne({company_id: credential_id})
                console.log('enter await fetch service booking ');
                const existService = yield service_booking_schema_1.default.find({ _id: { $in: bookingData.service_booking_id } });
                console.log('end await fetch service booking ');
                // Duree par defaut s'il ne l'a pas fait depuis le dashboard
                const duration = existService.reduce((sum, service) => sum + Number(service.get('duration')), 0);
                const totalPrice = existService.reduce((sum, service) => sum + Number(service.get('price')), 0);
                // if(existCompanyCreneau){
                //     duration = existCompanyCreneau.get('duration')
                // }
                const dayOfWeek = helper_method_1.HelperMethod.getDayOfWeek(startDate.toString());
                const existCompanyHour = yield company_hour_service_schema_1.default.findOne({ day: dayOfWeek, company_id: credential_id });
                if (!existCompanyHour) {
                    return { status: 400, message: `Cette company ne travaille pas ce jour` };
                }
                const openingTime = existCompanyHour.get('openingTime');
                const closeTime = existCompanyHour.get('closeTime');
                let isPlage = helper_method_1.HelperMethod.estDansPlageHoraire(startDate, openingTime, closeTime);
                if (!isPlage) {
                    return { status: 400, message: `le creneau que vous avez selectionner n'est dans la plage d'horaire` };
                }
                const endDate = helper_method_1.HelperMethod.ajouterMinutes(startDate, duration);
                console.log('end Date : ', endDate);
                isPlage = helper_method_1.HelperMethod.estDansPlageHoraire(endDate, openingTime, closeTime);
                console.log('end date : ', endDate.getHours(), ' : ', endDate.getMinutes());
                console.log('is plage : ', isPlage);
                if (!isPlage) {
                    return { status: 400, message: `le creneau que vous avez selectionner va exceder la plage d'horaire de la company` };
                }
                const dataBookingDb = {
                    name: bookingData.name,
                    total_price: totalPrice,
                    status: bookingData.status,
                    description: bookingData.description,
                    startAt: startDate,
                    endAt: endDate,
                    service_booking_id: bookingData.service_booking_id,
                    conversation_id: bookingData.conversation_id
                };
                const booking = yield booking_repository_1.bookingRepository.create(dataBookingDb);
                return { status: 201, message: booking };
            }
            catch (error) {
                console.error(`Erreur lors de la création d'une nouvelle category de booking:`, error);
                throw error;
            }
        });
    }
    update(bookingId, bookingData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                // Convertir les dates de début et de fin en objets Date
                const startDate = new Date(bookingData.startAt);
                // const endDate = new Date(bookingData.endAt);
                const now = new Date();
                // Vérifier que la date de début n'est pas inférieure à la date actuelle
                if (startDate < now) {
                    return { status: 400, message: 'La date de début ne peut pas être inférieure à la date actuelle.' };
                }
                const existConversation = yield conversation_repository_1.conversationRepository.getById(bookingData.conversation_id);
                if (!existConversation) {
                    return { status: 400, message: 'Conversation inexistante.' };
                }
                const credential_id = existConversation.get('credential_id');
                // const existCompanyCreneau = await CompanyCreneau.findOne({company_id: credential_id})
                const existService = yield service_booking_schema_1.default.find({ _id: { $ne: bookingData.service_booking_id } });
                // Duree par defaut s'il ne l'a pas fait depuis le dashboard
                const duration = existService.reduce((sum, service) => sum + Number(service.get('duration')), 0);
                const totalPrice = existService.reduce((sum, service) => sum + Number(service.get('price')), 0);
                // console.log('duration : ', duration);
                // console.log('tootal price : ', totalPrice);            
                // Duree par defaut s'il ne l'a pas fait depuis le dashboard
                // let duration = 60
                // if(existCompanyCreneau){
                //     duration = existCompanyCreneau.get('duration')
                // }
                const dayOfWeek = helper_method_1.HelperMethod.getDayOfWeek(startDate.toString());
                const existCompanyHour = yield company_hour_service_schema_1.default.findOne({ day: dayOfWeek, company_id: credential_id });
                if (!existCompanyHour) {
                    return { status: 400, message: `Cette company ne travaille pas ce jour` };
                }
                const openingTime = existCompanyHour.get('openingTime');
                const closeTime = existCompanyHour.get('closeTime');
                let isPlage = helper_method_1.HelperMethod.estDansPlageHoraire(startDate, openingTime, closeTime);
                if (!isPlage) {
                    return { status: 400, message: `le creneau que vous avez selectionner n'est dans la plage d'horaire` };
                }
                const endDate = helper_method_1.HelperMethod.ajouterMinutes(startDate, duration);
                isPlage = helper_method_1.HelperMethod.estDansPlageHoraire(endDate, openingTime, closeTime);
                if (!isPlage) {
                    return { status: 400, message: `le creneau que vous avez selectionner va exceder la plage d'horaire de la company` };
                }
                const dataBookingDb = {
                    name: bookingData.name,
                    total_price: (_a = bookingData.total_price) !== null && _a !== void 0 ? _a : totalPrice,
                    status: bookingData.status,
                    description: bookingData.description,
                    startAt: startDate,
                    endAt: endDate,
                    service_booking_id: bookingData.service_booking_id,
                    conversation_id: bookingData.conversation_id
                };
                const booking = yield booking_repository_1.bookingRepository.update(bookingId, dataBookingDb);
                return { status: 201, message: booking };
            }
            catch (error) {
                console.error(`Erreur lors de la création d'une nouvelle category de booking:`, error);
                throw error;
            }
        });
    }
    bookingCompany(companyId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const booking = yield booking_repository_1.bookingRepository.findBookingByCompany(companyId, date);
                return { status: 201, message: booking };
            }
            catch (error) {
                console.error(`Erreur lors de la création d'une nouvelle category de booking:`, error);
                throw error;
            }
        });
    }
}
exports.bookingService = new BookingService();
