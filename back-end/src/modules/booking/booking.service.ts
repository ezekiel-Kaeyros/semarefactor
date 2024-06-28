import { Types } from "mongoose";
import { BookingDoc, BookingModel } from "../../core/modeles/booking.model";
import { bookingRepository } from "./booking.repository";
import { HelperMethod } from "../../core/utiles/helper-method";
import CompanyHourService from "../../core/database/schemas/company-hour-service.schema";
import CompanyCreneau from "../../core/database/schemas/company-creneau.schema";
import { conversationRepository } from "../conversation/conversation.repository";
import ServiceBooking from "../../core/database/schemas/service-booking.schema";


class BookingService{

    async create(bookingData: BookingModel): Promise<{status: number, message: string| BookingDoc | null}>{
        try {      
            
            // Convertir les dates de début et de fin en objets Date
            const startDate = new Date(bookingData.startAt);
            const now = new Date();

            // Vérifier que la date de début n'est pas inférieure à la date actuelle
            if (startDate < now) {
                return {status: 400, message: 'La date de début ne peut pas être inférieure à la date actuelle.'};
            }

            const existConversation = await conversationRepository.getById(bookingData.conversation_id)

            if(!existConversation){
                return {status: 400, message: 'Conversation inexistante.'};
            }

            const credential_id = existConversation.get('credential_id');
            // const existCompanyCreneau = await CompanyCreneau.findOne({company_id: credential_id})
            console.log('enter await fetch service booking ');
            
            const existService = await ServiceBooking.find({_id: {$in: bookingData.service_booking_id}})

            console.log('end await fetch service booking ');

            // Duree par defaut s'il ne l'a pas fait depuis le dashboard
            const duration = existService.reduce((sum, service) => sum + Number(service.get('duration')), 0);
            const totalPrice = existService.reduce((sum, service) => sum + Number(service.get('price')), 0)

            // if(existCompanyCreneau){
            //     duration = existCompanyCreneau.get('duration')
            // }

            const dayOfWeek = HelperMethod.getDayOfWeek(startDate.toString())
            const existCompanyHour = await CompanyHourService.findOne({day: dayOfWeek, company_id: credential_id})
            if(!existCompanyHour){
                return { status: 400, message: `Cette company ne travaille pas ce jour` }
            }

            const openingTime = existCompanyHour.get('openingTime')
            const closeTime = existCompanyHour.get('closeTime')
            
            let isPlage = HelperMethod.estDansPlageHoraire(startDate, openingTime, closeTime)            

            if(!isPlage){
                return { status: 400, message: `le creneau que vous avez selectionner n'est dans la plage d'horaire` }
            }

            const endDate = HelperMethod.ajouterMinutes(startDate, duration);
            console.log('end Date : ', endDate);
            

            isPlage = HelperMethod.estDansPlageHoraire(endDate, openingTime, closeTime)
            console.log('end date : ', endDate.getHours(),' : ', endDate.getMinutes());
            console.log('is plage : ', isPlage);
            
            if(!isPlage){
                return { status: 400, message: `le creneau que vous avez selectionner va exceder la plage d'horaire de la company` }
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
            }

            const booking = await bookingRepository.create(dataBookingDb)
            return{ status: 201, message: booking}            
            
        } catch (error) {
            console.error(`Erreur lors de la création d'une nouvelle category de booking:`, error);
            throw error;
        }
    }

    async update(bookingId: Types.ObjectId, bookingData: BookingModel): Promise<{status: number, message: string| BookingDoc | null}>{
        try {      
            
            // Convertir les dates de début et de fin en objets Date
            const startDate = new Date(bookingData.startAt);
            // const endDate = new Date(bookingData.endAt);
            const now = new Date();

            // Vérifier que la date de début n'est pas inférieure à la date actuelle
            if (startDate < now) {
                return {status: 400, message: 'La date de début ne peut pas être inférieure à la date actuelle.'};
            }

            const existConversation = await conversationRepository.getById(bookingData.conversation_id)

            if(!existConversation){
                return {status: 400, message: 'Conversation inexistante.'};
            }

            const credential_id = existConversation.get('credential_id');
            // const existCompanyCreneau = await CompanyCreneau.findOne({company_id: credential_id})

            const existService = await ServiceBooking.find({_id: {$ne: bookingData.service_booking_id}})

            // Duree par defaut s'il ne l'a pas fait depuis le dashboard
            const duration = existService.reduce((sum, service) => sum + Number(service.get('duration')), 0);
            const totalPrice = existService.reduce((sum, service) => sum + Number(service.get('price')), 0)
            // console.log('duration : ', duration);
            // console.log('tootal price : ', totalPrice);            

            // Duree par defaut s'il ne l'a pas fait depuis le dashboard
            // let duration = 60

            // if(existCompanyCreneau){
            //     duration = existCompanyCreneau.get('duration')
            // }

            const dayOfWeek = HelperMethod.getDayOfWeek(startDate.toString())
            const existCompanyHour = await CompanyHourService.findOne({day: dayOfWeek, company_id: credential_id})
            if(!existCompanyHour){
                return { status: 400, message: `Cette company ne travaille pas ce jour` }
            }

            const openingTime = existCompanyHour.get('openingTime')
            const closeTime = existCompanyHour.get('closeTime')
            let isPlage = HelperMethod.estDansPlageHoraire(startDate, openingTime, closeTime)

            if(!isPlage){
                return { status: 400, message: `le creneau que vous avez selectionner n'est dans la plage d'horaire` }
            }

            const endDate = HelperMethod.ajouterMinutes(startDate, duration);

            isPlage = HelperMethod.estDansPlageHoraire(endDate, openingTime, closeTime)

            if(!isPlage){
                return { status: 400, message: `le creneau que vous avez selectionner va exceder la plage d'horaire de la company` }
            }

            const dataBookingDb = {
                name: bookingData.name,
                total_price: bookingData.total_price ?? totalPrice,
                status: bookingData.status,
                description: bookingData.description,
                startAt: startDate,
                endAt: endDate,
                service_booking_id: bookingData.service_booking_id,
                conversation_id: bookingData.conversation_id
            }

            const booking = await bookingRepository.update(bookingId, dataBookingDb)
            return{ status: 201, message: booking}
            
            
        } catch (error) {
            console.error(`Erreur lors de la création d'une nouvelle category de booking:`, error);
            throw error;
        }
    }

    async bookingCompany(companyId: Types.ObjectId, date: string): Promise<{status: number, message: string| BookingDoc[] | null}>{
        try {
            const booking = await bookingRepository.findBookingByCompany(companyId, date)
            return{ status: 201, message: booking}             
        } catch (error) {
            console.error(`Erreur lors de la création d'une nouvelle category de booking:`, error);
            throw error;
        }
    }
    
}

export const bookingService = new BookingService();