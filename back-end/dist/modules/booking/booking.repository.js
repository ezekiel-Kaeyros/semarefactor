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
exports.bookingRepository = void 0;
const booking_schema_1 = __importDefault(require("../../core/database/schemas/booking.schema"));
class BookingRepository {
    create(bookinData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const booking = new booking_schema_1.default(bookinData);
                return yield booking.save();
            }
            catch (error) {
                console.error(`Erreur lors de la creation du booking :`, error);
                throw error;
            }
        });
    }
    update(bookingId, bookingData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield booking_schema_1.default.findByIdAndUpdate(bookingId, bookingData);
            }
            catch (error) {
                console.error(`Erreur lors de la mise a jour du booking :`, error);
                throw error;
            }
        });
    }
    findBookingByCompany(companyId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataFind = {
                    company_id: companyId
                };
                const dataFind2 = {
                    company_id: companyId,
                    startAt: date
                };
                return yield booking_schema_1.default.find(date ? dataFind2 : dataFind);
            }
            catch (error) {
                console.error(`Erreur lors de la mise a jour du booking :`, error);
                throw error;
            }
        });
    }
}
exports.bookingRepository = new BookingRepository();
