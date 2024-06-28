import { Types } from "mongoose";
import Booking from "../../core/database/schemas/booking.schema";
import { BookingDoc, BookingModel } from "../../core/modeles/booking.model";


class BookingRepository{

    async create(bookinData: BookingModel): Promise<BookingDoc>{
        try {
            const booking = new Booking(bookinData);
            return await booking.save()
        } catch (error) {
            console.error(`Erreur lors de la creation du booking :`, error);
            throw error;
        }
    }

    async update(bookingId: Types.ObjectId, bookingData: BookingModel): Promise<BookingDoc | null>{
        try {
            return await Booking.findByIdAndUpdate(bookingId,bookingData);
        } catch (error) {
            console.error(`Erreur lors de la mise a jour du booking :`, error);
            throw error;
        }
    }


    async findBookingByCompany(companyId: Types.ObjectId, date: string): Promise<BookingDoc[] | null>{
        try {
                const dataFind = {
                    company_id: companyId
                }
                const dataFind2 = {
                    company_id: companyId,
                    startAt: date
                }

            
            return await Booking.find(date? dataFind2 : dataFind);
        } catch (error) {
            console.error(`Erreur lors de la mise a jour du booking :`, error);
            throw error;
        }
    }
}

export const bookingRepository = new BookingRepository();
