import { Types } from "mongoose";
import CategoryBooking from "../../core/database/schemas/category-booking.schema";
import { ServiceBookingDoc, ServiceBookingModel } from "../../core/modeles/service-booking.model";
import ServiceBooking from "../../core/database/schemas/service-booking.schema";


class ServiceBookingRepository{


    // Méthode pour créer un nouveau service de booking
    async create(name: string, price: number, duration: number, category_id: Types.ObjectId, company_id: Types.ObjectId): Promise<ServiceBookingDoc | null> {
        try {

            const data = {
                name: name,
                price: price,
                duration: duration,
                category_id: category_id,
                company_id: company_id
            }

            const service = new ServiceBooking(data);
            return await service.save();
        } catch (error) {
            console.error(`Erreur lors de la création d'un nouveau service de booking:`, error);
            throw error;
        }
    }

    // Méthode pour modify un service de booking
    async update(serviceId: Types.ObjectId, serviceData: ServiceBookingModel): Promise<ServiceBookingDoc | null> {
        try {
            const service = await ServiceBooking.findByIdAndUpdate(serviceId, serviceData, {new: true}).exec();
            return service;
        } catch (error) {
            console.error(`Erreur lors de la mise a jour du service de booking:`, error);
            throw error;
        }
    }

    // Méthode pour ressortir les service de booking d'une company
    async findByCompany(company_id: Types.ObjectId): Promise<ServiceBookingDoc[] | null> {
        try {
            const service = await ServiceBooking.find({company_id: company_id});
            return service;
        } catch (error) {
            console.error(`Erreur lors de la recuperation des services de booking:`, error);
            throw error;
        }
    }
}

export const serviceBookingRepository = new ServiceBookingRepository();
