import { Types } from "mongoose";
import { serviceBookingRepository } from "./service-booking.repository";
import { ServiceBookingDoc, ServiceBookingModel } from "../../core/modeles/service-booking.model";

class ServiceBookingService{

    async create(serviceData: ServiceBookingModel): Promise<{status: number, message: ServiceBookingDoc | null}> {
        try {
            const serviceBooking =  await serviceBookingRepository.create(
                serviceData.name,
                serviceData.price,
                serviceData.duration,
                serviceData.category_id,
                serviceData.company_id
            )
            return { status: 201, message: serviceBooking}
        } catch (error) {
            console.error(`Erreur lors de la création d'un nouveau service de booking:`, error);
            throw error;
        }
    }

    // Méthode pour modify le service de booking
    async update(serviceId: Types.ObjectId, serviceData: ServiceBookingModel): Promise<{status: number, message: ServiceBookingDoc | null}> {
        try {
            const service = await serviceBookingRepository.update(serviceId, serviceData);
            return { status: 200, message: service}
        } catch (error) {
            console.error(`Erreur lors de la mise a jour du service de booking:`, error);
            throw error;
        }
    }

    // Méthode pour recuperer les services de booking d'une company
    async findByCompany(company_id: Types.ObjectId): Promise<{status: number, message: ServiceBookingDoc[] | null}> {
        try {
            const category = await serviceBookingRepository.findByCompany(company_id);
            return { status: 200, message: category}
        } catch (error) {
            console.error(`Erreur lors de la recuperation des services de booking d'une company:`, error);
            throw error;
        }
    }
}

export const serviceBookingService = new ServiceBookingService();